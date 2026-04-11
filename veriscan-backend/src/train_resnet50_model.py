"""
VeriScan AI — Advanced Model Training Script (ResNet-50)
ResNet-50 Backbone + Advanced Augmentation + LR Scheduling + Deep Fine-Tuning
Dataset: counterfeit-nike-shoes-detection (~3,860 images)
Output:  veriscan-backend/models/veriscan_resnet50_model.h5
"""

import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import (
    EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
)
from sklearn.utils.class_weight import compute_class_weight

print(f"TensorFlow: {tf.__version__}")
print(f"GPUs: {tf.config.list_physical_devices('GPU')}")

# ---------------------------
# CONFIGURATION
# ---------------------------
IMAGE_SIZE   = (224, 224)
BATCH_SIZE   = 32
EPOCHS_HEAD  = 25     # Phase 1: train classifier head
EPOCHS_FINE  = 15     # Phase 2: fine-tune base layers

BASE_DIR     = r"D:\VeriScan Ai\veriscan-backend"
DATASET_DIR  = r"D:\VeriScan Ai\data\nike_dataset"
TRAIN_DIR    = os.path.join(DATASET_DIR, "train")
VALID_DIR    = os.path.join(DATASET_DIR, "valid")
TEST_DIR     = os.path.join(DATASET_DIR, "test")
MODELS_DIR   = os.path.join(BASE_DIR, "models")
os.makedirs(MODELS_DIR, exist_ok=True)
OUTPUT_MODEL = os.path.join(MODELS_DIR, "veriscan_resnet50_model.h5")
CHECKPOINT   = os.path.join(MODELS_DIR, "veriscan_resnet50_best.h5")

# ---------------------------
# DATA GENERATORS
# Note: ResNet50 expects means-centered BGR images, NOT simply rescaled 1./255 RGB.
# We pass `preprocessing_function=preprocess_input`.
# ---------------------------
train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    # Geometric
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    vertical_flip=False,
    zoom_range=0.25,
    shear_range=0.15,
    # Color / photometric
    brightness_range=[0.7, 1.3],
    channel_shift_range=30.0,
    fill_mode='nearest'
)

val_datagen  = ImageDataGenerator(preprocessing_function=preprocess_input)
test_datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

train_gen = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=True
)

valid_gen = val_datagen.flow_from_directory(
    VALID_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

test_gen = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

print(f"\nClass indices: {train_gen.class_indices}")
print(f"Train: {train_gen.samples} | Valid: {valid_gen.samples} | Test: {test_gen.samples}")

# ---------------------------
# CLASS WEIGHTS (handle imbalance)
# ---------------------------
classes = train_gen.classes
if len(np.unique(classes)) > 1:
    cw = compute_class_weight('balanced', classes=np.unique(classes), y=classes)
    class_weights = dict(enumerate(cw))
    print(f"Class weights: {class_weights}")
else:
    class_weights = None
    print("Warning: Only 1 class found in training data.")

# ---------------------------
# BUILD MODEL — ResNet50 + Custom Head
# ---------------------------
base = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)
base.trainable = False

inputs = tf.keras.Input(shape=(224, 224, 3))
x = base(inputs, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dense(512, activation='relu')(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.4)(x)
x = layers.Dense(128, activation='relu')(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(2, activation='softmax')(x)

model = tf.keras.Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

# ---------------------------
# PHASE 1 — Train Head Only
# ---------------------------
print("\n" + "="*60)
print("PHASE 1: Training classifier head (base frozen)")
print("="*60)

callbacks_phase1 = [
    EarlyStopping(
        monitor='val_accuracy',
        patience=6,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        CHECKPOINT,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.3,
        patience=3,
        min_lr=1e-7,
        verbose=1
    )
]

history1 = model.fit(
    train_gen,
    epochs=EPOCHS_HEAD,
    validation_data=valid_gen,
    class_weight=class_weights,
    callbacks=callbacks_phase1,
    verbose=1
)

# ---------------------------
# PHASE 2 — Fine-Tune Deeper Layers
# ---------------------------
print("\n" + "="*60)
print("PHASE 2: Fine-tuning — unfreezing last 50 base layers")
print("="*60)

base.trainable = True
# Freeze all but the last 50 layers
for layer in base.layers[:-50]:
    layer.trainable = False

trainable_count = sum(1 for l in base.layers if l.trainable)
print(f"Trainable base layers: {trainable_count} / {len(base.layers)}")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=5e-6),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

callbacks_phase2 = [
    EarlyStopping(
        monitor='val_accuracy',
        patience=5,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        CHECKPOINT,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.3,
        patience=2,
        min_lr=1e-8,
        verbose=1
    )
]

history2 = model.fit(
    train_gen,
    epochs=EPOCHS_FINE,
    validation_data=valid_gen,
    class_weight=class_weights,
    callbacks=callbacks_phase2,
    verbose=1
)

# ---------------------------
# EVALUATE
# ---------------------------
print("\n" + "="*60)
print("EVALUATION on Test Set")
print("="*60)

test_loss, test_acc = model.evaluate(test_gen, verbose=1)
print(f"\n✅ Test Accuracy: {test_acc * 100:.2f}%")
print(f"   Test Loss:     {test_loss:.4f}")

# ---------------------------
# SAVE FINAL MODEL
# ---------------------------
model.save(OUTPUT_MODEL)
print(f"\n💾 Model saved to: {OUTPUT_MODEL}")

# ---------------------------
# TRAINING SUMMARY
# ---------------------------
best_val_acc_p1 = max(history1.history['val_accuracy'])
best_val_acc_p2 = max(history2.history['val_accuracy']) if EPOCHS_FINE > 0 else best_val_acc_p1
print("\n📊 Training Summary:")
print(f"   Phase 1 best val accuracy: {best_val_acc_p1*100:.2f}%")
print(f"   Phase 2 best val accuracy: {best_val_acc_p2*100:.2f}%")
print(f"   Final test accuracy:        {test_acc*100:.2f}%")
print(f"\n🔥 Training Complete! Model → {OUTPUT_MODEL}")

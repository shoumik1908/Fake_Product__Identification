import tensorflow as tf
import numpy as np

print('TensorFlow version:', tf.__version__)

MODEL_PATH = '../models/veriscan_resnet50_model.h5'
print(f'Loading model from {MODEL_PATH}...')

model = tf.keras.models.load_model(MODEL_PATH)

print('Model loaded successfully.')
print(model.summary())

# Test 1: Zeros
print('\n--- Test 1: Zeros ---')
img_zeros = np.zeros((1, 224, 224, 3), dtype=np.float32)
pred_zeros = model.predict(img_zeros, verbose=0)
print('Prediction:', pred_zeros)

# Test 2: Ones
print('\n--- Test 2: Ones ---')
img_ones = np.ones((1, 224, 224, 3), dtype=np.float32)
pred_ones = model.predict(img_ones, verbose=0)
print('Prediction:', pred_ones)

# Test 3: Random
print('\n--- Test 3: Random ---')
img_rand = np.random.rand(1, 224, 224, 3).astype(np.float32) * 255
pred_rand = model.predict(img_rand, verbose=0)
print('Prediction:', pred_rand)

from tensorflow.keras.applications.resnet50 import preprocess_input

# Test 4: Zeros with Preprocess
print('\n--- Test 4: Zeros + Preprocess ---')
img_zeros_pre = preprocess_input(np.zeros((1, 224, 224, 3), dtype=np.float32))
pred_zeros_pre = model.predict(img_zeros_pre, verbose=0)
print('Prediction:', pred_zeros_pre)

# Test 5: Random with Preprocess
print('\n--- Test 5: Random + Preprocess ---')
img_rand_pre = preprocess_input(np.random.rand(1, 224, 224, 3).astype(np.float32) * 255)
pred_rand_pre = model.predict(img_rand_pre, verbose=0)
print('Prediction:', pred_rand_pre)

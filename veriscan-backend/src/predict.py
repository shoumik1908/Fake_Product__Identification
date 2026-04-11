import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input as mobilenet_prep, decode_predictions

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Default to the locally trained path from train_resnet50_model.py
MODEL_PATH = os.path.join(BASE_DIR, "models", "veriscan_resnet50_model.h5")

model = load_model(MODEL_PATH)

ood_model = MobileNetV2(weights='imagenet')

class_names = ["authentic", "counterfeit"]

def is_shoe(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = mobilenet_prep(x)
    preds = ood_model.predict(x, verbose=0)
    top_preds = decode_predictions(preds, top=5)[0]
    shoe_kw = ['shoe', 'sneaker', 'sandal', 'boot', 'footwear', 'loafer', 'clog']
    for _, class_name, _ in top_preds:
        if any(k in class_name.lower().replace("_", " ") for k in shoe_kw):
            return True
    return False

def predict_image(img_path):
    if not is_shoe(img_path):
        raise ValueError("Invalid image: The AI did not detect a recognized shoe or footwear in this photo.")
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    predictions = model.predict(img_array)[0]

    print("Raw output:", predictions)  # ADD THIS

    confidence = float(np.max(predictions))
    label = class_names[int(np.argmax(predictions))]

    return label, confidence


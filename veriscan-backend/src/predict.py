import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

MODEL_PATH = "veriscan_balanced_model.h5"

model = load_model(MODEL_PATH)

class_names = ["authentic", "counterfeit"]


def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]

    print("Raw output:", predictions)  # ADD THIS

    confidence = float(np.max(predictions))
    label = class_names[int(np.argmax(predictions))]

    return label, confidence


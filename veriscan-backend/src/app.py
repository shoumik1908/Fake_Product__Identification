from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse
import shutil
import os
import tensorflow as tf
import numpy as np
from PIL import Image

from blockchain_connect import store_ai_result

app = FastAPI()

MODEL_PATH = "models/veriscan_final_model.h5"
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

model = tf.keras.models.load_model(MODEL_PATH)
class_names = ["authentic", "counterfeit"]

@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html>
    <head><title>VeriScan AI</title></head>
    <body>
        <h2>VeriScan AI – Fake Product Detection</h2>
        <form action="/predict" method="post" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <br><br>
            <button type="submit">Verify Product</button>
        </form>
    </body>
    </html>
    """

@app.post("/predict", response_class=HTMLResponse)
async def predict(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    img = Image.open(file_path).resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    confidence = float(np.max(prediction))
    label = class_names[np.argmax(prediction)]

    tx_hash = store_ai_result(
        product_id=file.filename,
        ai_result=(label == "authentic"),
        confidence=confidence
    )

    return f"""
    <h3>Prediction Result</h3>
    <p><b>Result:</b> {label}</p>
    <p><b>Confidence:</b> {confidence*100:.2f}%</p>
    <p><b>Blockchain TX:</b><br>
    <a href="https://mumbai.polygonscan.com/tx/{tx_hash}" target="_blank">
    {tx_hash}
    </a></p>
    <br>
    <a href="/">Verify another product</a>
    """

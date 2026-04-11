from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.resnet50 import preprocess_input

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "models/veriscan_resnet50_model.h5"
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

model = tf.keras.models.load_model(MODEL_PATH)
class_names = ["authentic", "counterfeit"]

@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html>
    <head><title>VeriScan AI backend running</title></head>
    <body><h2>Backend is live! Go to frontend UI to test.</h2></body>
    </html>
    """

@app.post("/verify", response_class=JSONResponse)
async def verify(
    product_id: str = Form(...),
    product_name: str = Form(None),
    product_brand: str = Form(None),
    image: UploadFile = File(None)
):
    if not image:
        return JSONResponse(status_code=400, content={"error": "Image is required for AI verification."})

    file_path = os.path.join(UPLOAD_DIR, image.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    img = Image.open(file_path).convert('RGB').resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    prediction = model.predict(img_array)
    confidence = float(np.max(prediction))
    label = class_names[np.argmax(prediction)]

    return {
        "prediction": label.capitalize(),
        "confidence": confidence,
        "product_id": product_id
    }

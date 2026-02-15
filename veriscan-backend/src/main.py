from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from src.predict import predict_image
from src.blockchain_connect import store_ai_result

app = FastAPI(title="VeriScan AI")

# Allow browser access (important for evaluation)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "✅ VeriScan AI is running",
        "status": "OK"
    }


@app.post("/verify")
async def verify_product(
    product_id: str = Form(...),
    image: UploadFile = File(...)
):
    image_path = os.path.join(UPLOAD_DIR, image.filename)

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # 🔮 AI Prediction
    label, confidence = predict_image(image_path)

    is_authentic = True if label.lower() == "authentic" else False

    # ⛓ Store result on blockchain
    tx_hash = store_ai_result(product_id, is_authentic, confidence)

    return {
        "product_id": product_id,
        "prediction": label,
        "confidence": confidence,
        "blockchain_tx": tx_hash
    }



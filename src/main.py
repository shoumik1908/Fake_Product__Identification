from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from src.predict import predict_image

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

    from fastapi.responses import JSONResponse
    # 🔮 AI Prediction
    try:
        label, confidence = predict_image(image_path)
    except ValueError as e:
        return JSONResponse(status_code=400, content={"detail": str(e)})

    return {
        "product_id": product_id,
        "prediction": label,
        "confidence": confidence
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

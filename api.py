
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "house_price_model.pkl"

if not MODEL_PATH.exists():
    # Also support a model saved directly beside api.py
    MODEL_PATH = ROOT / "house_price_model.pkl"

if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model not found: {MODEL_PATH}")

model = joblib.load(MODEL_PATH)
FEATURES = list(model.feature_names_in_)

app = FastAPI(title="EstateIQ House Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HouseInput(BaseModel):
    area: float = Field(gt=0)
    location: str = Field(min_length=1)
    bedrooms: int = Field(ge=1, le=20)

    resale: int = Field(default=1, ge=0, le=1)
    amenities: dict[str, int] = Field(default_factory=dict)


@app.get("/")
def home():
    return {
        "message": "EstateIQ API is running",
        "features": FEATURES,
    }


@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": True}


@app.post("/predict")
def predict_house(data: HouseInput):
    values = {
        "Area": data.area,
        "Location": data.location,
        "No. of Bedrooms": data.bedrooms,
        "Resale": data.resale,
    }

    for feature in FEATURES:
        if feature not in values:
            values[feature] = data.amenities.get(feature, 0)

    missing = [name for name in FEATURES if name not in values]
    if missing:
        raise HTTPException(status_code=500, detail=f"Missing features: {missing}")

    house = pd.DataFrame(
        [[values[name] for name in FEATURES]],
        columns=FEATURES,
    )

    try:
        price = float(model.predict(house)[0])
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc

    return {
        "predicted_price": round(price, 2),
        "currency": "INR",
        "note": "Practice estimate only; not a real market valuation.",
    }

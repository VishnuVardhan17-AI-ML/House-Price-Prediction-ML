# 🏡 House Price Prediction ML

An end-to-end Machine Learning project that predicts estimated house prices using property details and a trained Scikit-learn model.

##  Features

- House price prediction using Machine Learning
- Data inspection and cleaning scripts
- Data preprocessing and model training pipeline
- FastAPI backend for prediction requests
- React-based EstateIQ frontend
- Indian Rupee (INR) price display

# Tech Stack

- **Language:** Python, JavaScript
- **Machine Learning:** Scikit-learn, Pandas, NumPy
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, Vite
- **Data Processing:** Pandas

 Project Structure

```text
House-Price-Prediction-ML/
├── api.py
├── main.py
├── clean_data.py
├── inspect_data.py
├── inspect_prices.py
├── train_model.py
├── test_prediction.py
├── data/
│   └── cleaned_house_prices.csv
├── models/
│   └── house_price_model.pkl
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## ⚙️ Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/VishnuVardhan17-AI-ML/House-Price-Prediction-ML.git
cd House-Price-Prediction-ML
```

### 2. Set up the Python backend

Create and activate a virtual environment, then install the required dependencies.

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies listed in your project's `requirements.txt`, if available. If it is not present, create one with the packages required by `api.py` and `main.py` before running the backend.

Start the API:

```bash
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

API documentation:

http://127.0.0.1:8000/docs

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually http://localhost:5173.

## 🔍 How It Works

1. Enter the property area, number of bedrooms, location, and property type.
2. The React frontend sends the details to the FastAPI backend.
3. The backend preprocesses the input and passes it to the saved ML pipeline.
4. The model returns an estimated property price in INR.

## Model Evaluation

The current model is an experimental baseline. Its validation results indicate that prediction accuracy needs improvement, so its outputs should not be treated as verified market valuations.

##  Disclaimer

This project is intended for educational and demonstration purposes only. Predicted prices may differ significantly from actual real-estate market values.

##  Author

**G. Vishnu Vardhan**

GitHub: [VishnuVardhan17-AI-ML](https://github.com/VishnuVardhan17-AI-ML)

##  Repository

[House Price Prediction ML](https://github.com/VishnuVardhan17-AI-ML/House-Price-Prediction-ML)
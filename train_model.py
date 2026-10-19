from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer, TransformedTargetRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Load cleaned dataset
df = pd.read_csv("data/cleaned_house_prices.csv")

# Separate features and target
X = df.drop(columns=["Price"])
y = df["Price"]

# Identify column types
categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()
numeric_cols = X.select_dtypes(exclude=["object"]).columns.tolist()

# Preprocessing
preprocessor = ColumnTransformer(
    [
        (
            "numeric",
            Pipeline(
                [
                    ("imputer", SimpleImputer(strategy="median")),
                    ("scaler", StandardScaler()),
                ]
            ),
            numeric_cols,
        ),
        (
            "categorical",
            Pipeline(
                [
                    ("imputer", SimpleImputer(strategy="most_frequent")),
                    ("encoder", OneHotEncoder(handle_unknown="ignore")),
                ]
            ),
            categorical_cols,
        ),
    ]
)

# Build model (Fixed: Added closing bracket for Pipeline steps)
model = Pipeline(
    [
        ("preprocessor", preprocessor),
        (
            "regressor",
            TransformedTargetRegressor(
                regressor=LinearRegression(),
                func=np.log1p,
                inverse_func=np.expm1,
            ),
        ),
    ]
)

# Train and evaluate (Fixed: Indentation and logic pulled out of pipeline definition)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("Model training completed!")
print(f"Training rows: {len(X_train)}")
print(f"Testing rows: {len(X_test)}")
print(f"Mean Absolute Error: ₹{mae:,.2f}")
print(f"R² Score: {r2:.4f}")

# 5-fold cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring="r2")
print("5-Fold R² Scores:", cv_scores.round(4))
print(f"Average 5-Fold R²: {cv_scores.mean():.4f}")

# Save complete pipeline
Path("models").mkdir(exist_ok=True)
joblib.dump(model, "models/house_price_model.pkl")
print("Saved model: models/house_price_model.pkl")

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# 1. Load the dataset
data = pd.read_csv("data/house_prices.csv")

print("HOUSE PRICE PREDICTION")
print("-" * 30)
print("\nDataset Preview:")
print(data.head())

print("\nDataset Shape:", data.shape)
print("\nMissing Values:")
print(data.isnull().sum())

# 2. Separate input features and target
X = data.drop("price", axis=1)
y = data["price"]

# 3. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Train the Machine Learning model
model = LinearRegression()
model.fit(X_train, y_train)

# 5. Evaluate the model
predictions = model.predict(X_test)

print("\nModel Evaluation")
print("-" * 30)
print("Mean Absolute Error:", round(mean_absolute_error(y_test, predictions), 2))
print("R2 Score:", round(r2_score(y_test, predictions), 3))

# 6. Predict price for a sample house
sample_house = pd.DataFrame([{
    "area_sqft": 1400,
    "bedrooms": 3,
    "bathrooms": 2,
    "age_years": 5,
    "location_score": 8
}])

predicted_price = model.predict(sample_house)[0]

print("\nSample House Details:")
print(sample_house.to_string(index=False))
print(f"\nPredicted House Price: {predicted_price:,.2f}")
print("\nNote: This is a practice model trained on a small sample dataset.")

import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression

data = pd.read_csv("data/house_prices.csv")
X = data.drop("price", axis=1)
y = data["price"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "house_price_model.pkl")
print("Model saved successfully: house_price_model.pkl")

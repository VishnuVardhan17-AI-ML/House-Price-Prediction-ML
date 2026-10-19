import joblib
import pandas as pd

model = joblib.load("house_price_model.pkl")

print("\n🏠 HOUSE PRICE PREDICTOR")
print("-" * 30)

area = float(input("Enter house area (sqft): "))
bedrooms = int(input("Enter number of bedrooms: "))
bathrooms = int(input("Enter number of bathrooms: "))
age = int(input("Enter house age (years): "))
location = float(input("Enter location score (1-10): "))

if area <= 0 or bedrooms <= 0 or bathrooms <= 0:
    raise ValueError("Area, bedrooms and bathrooms must be positive.")

if age < 0 or not 1 <= location <= 10:
    raise ValueError("Age must be non-negative and location score must be 1-10.")

house = pd.DataFrame([{
    "area_sqft": area,
    "bedrooms": bedrooms,
    "bathrooms": bathrooms,
    "age_years": age,
    "location_score": location
}])

price = model.predict(house)[0]

print("\nPredicted House Price: ₹{:,.2f}".format(price))
print("\nNote: Practice estimate only; not a real market valuation.")

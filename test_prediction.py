
import joblib
import pandas as pd

model = joblib.load("models/house_price_model.pkl")

# Example house details
house = pd.DataFrame([{
    "Area": 1200,
    "Location": "Kharghar",
    "No. of Bedrooms": 2,
    "Resale": 1,
    "MaintenanceStaff": 1,
    "Gymnasium": 1,
    "SwimmingPool": 0,
    "LandscapedGardens": 0,
    "JoggingTrack": 0,
    "RainWaterHarvesting": 0,
    "IndoorGames": 0,
    "ShoppingMall": 0,
    "Intercom": 0,
    "SportsFacility": 0,
    "ATM": 0,
    "ClubHouse": 0,
    "School": 0,
    "24X7Security": 1,
    "PowerBackup": 1,
    "CarParking": 1,
    "StaffQuarter": 0,
    "Cafeteria": 0,
    "MultipurposeRoom": 0,
    "Hospital": 0,
    "WashingMachine": 0,
    "Gasconnection": 0,
    "AC": 0,
    "Wifi": 0,
    "Children'splayarea": 0,
    "LiftAvailable": 1,
    "BED": 0,
    "VaastuCompliant": 0,
    "Microwave": 0,
    "GolfCourse": 0,
    "TV": 0,
    "DiningTable": 0,
    "Sofa": 0,
    "Wardrobe": 0,
    "Refrigerator": 0
}])

predicted_price = model.predict(house)[0]

print(f"Predicted house price: ₹{predicted_price:,.0f}")

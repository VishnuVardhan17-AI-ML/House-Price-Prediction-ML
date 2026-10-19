
from pathlib import Path
import pandas as pd

folder = Path("data/raw")
files = list(folder.glob("*.csv"))

if not files:
    raise FileNotFoundError("No CSV file found in data/raw")

df = pd.read_csv(files[0], low_memory=False)

# Remove duplicate rows
df = df.drop_duplicates()

# Keep rows with valid price and area
df["Price"] = pd.to_numeric(df["Price"], errors="coerce")
df["Area"] = pd.to_numeric(df["Area"], errors="coerce")

df = df.dropna(subset=["Price", "Area"])
df = df[(df["Price"] > 0) & (df["Area"] > 0)]

# Save cleaned dataset
output = Path("data/cleaned_house_prices.csv")
output.parent.mkdir(parents=True, exist_ok=True)
df.to_csv(output, index=False)

print("Cleaning completed!")
print("Cleaned dataset shape:", df.shape)
print("Saved to:", output)
print("\nFirst 5 rows:")
print(df[["Price", "Area", "Location", "No. of Bedrooms"]].head())

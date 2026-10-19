
import pandas as pd

df = pd.read_csv("data/cleaned_house_prices.csv")

print("Price statistics:")
print(df["Price"].describe())

print("\nTop 10 highest prices:")
print(df.nlargest(10, "Price")[["Price", "Area", "Location", "No. of Bedrooms"]])

print("\nNumber of unique locations:", df["Location"].nunique())

print("\nMost common locations:")
print(df["Location"].value_counts().head(10))

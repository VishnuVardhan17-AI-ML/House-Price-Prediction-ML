import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = pd.read_csv("data/house_prices.csv")

sns.set_theme()

plt.figure(figsize=(8, 5))
sns.scatterplot(data=data, x="area_sqft", y="price", hue="bedrooms", palette="viridis")
plt.title("House Area vs Price")
plt.xlabel("Area (sqft)")
plt.ylabel("Price (INR)")
plt.tight_layout()
plt.savefig("area_vs_price.png", dpi=150)
plt.show()

plt.figure(figsize=(8, 5))
sns.heatmap(data.corr(numeric_only=True), annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Feature Correlation Heatmap")
plt.tight_layout()
plt.savefig("correlation_heatmap.png", dpi=150)
plt.show()

print("Graphs saved: area_vs_price.png and correlation_heatmap.png")

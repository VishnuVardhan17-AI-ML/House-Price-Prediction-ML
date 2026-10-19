
from pathlib import Path
import pandas as pd

folder = Path("data/raw")
files = list(folder.glob("*.csv"))

if not files:
    print("No CSV files found in data/raw")
else:
    for file in files:
        df = pd.read_csv(file, low_memory=False)

        print("\nFile:", file.name)
        print("Dataset shape:", df.shape)

        print("\nColumn names:")
        print(df.columns.tolist())

        print("\nFirst 5 rows:")
        print(df.head().to_string())

        print("\nMissing values:")
        print(df.isnull().sum().to_string())

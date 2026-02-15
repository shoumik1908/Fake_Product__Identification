import os
import pandas as pd
import shutil

BASE_DIR = r"D:\VeriScan Ai"

for split in ["train", "valid", "test"]:
    print(f"\nProcessing {split} folder...")

    split_path = os.path.join(BASE_DIR, split)
    csv_path = os.path.join(split_path, "_classes.csv")

    df = pd.read_csv(csv_path)

    # Create class folders
    fake_dir = os.path.join(split_path, "counterfeit")
    real_dir = os.path.join(split_path, "authentic")

    os.makedirs(fake_dir, exist_ok=True)
    os.makedirs(real_dir, exist_ok=True)

    for index, row in df.iterrows():
        filename = row["filename"]

        fake_label = row["nike-fake-Jordan"]
        real_label = row["nike-original-jordan"]

        src = os.path.join(split_path, filename)

        if not os.path.exists(src):
            continue

        if fake_label == 1:
            dst = os.path.join(fake_dir, filename)
        elif real_label == 1:
            dst = os.path.join(real_dir, filename)
        else:
            continue

        shutil.move(src, dst)

    print(f"✅ {split} organized successfully!")

print("\n🔥 Dataset fully organized!")

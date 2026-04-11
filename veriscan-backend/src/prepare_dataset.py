"""
VeriScan AI — Dataset Preparation Script
Extracts the Roboflow counterfeit-nike-shoes-detection dataset and organizes it
into train/valid/test splits with authentic/counterfeit class folders.
"""

import os
import csv
import zipfile
import shutil
import random

# ---------------------------
# CONFIGURATION
# ---------------------------
BASE_DIR = r"D:\VeriScan Ai"
ZIP_PATH = os.path.join(BASE_DIR, "counterfeit-nike-shoes-detection.multiclass.zip")
EXTRACT_DIR = os.path.join(BASE_DIR, "nike_extracted_temp")
OUTPUT_DIR = os.path.join(BASE_DIR, "data", "nike_dataset")

# Class mapping: Roboflow 4-class → VeriScan 2-class
FAKE_CLASSES = ["nike fake air force", "nike fake jordan 1"]
REAL_CLASSES = ["nike original air force", "nike original jordan 1"]

# Split ratios
TRAIN_RATIO = 0.80
VALID_RATIO = 0.10
TEST_RATIO  = 0.10

SEED = 42

def main():
    random.seed(SEED)

    # ---------------------------
    # Step 1: Extract ZIP
    # ---------------------------
    print("📦 Extracting dataset ZIP...")
    if os.path.exists(EXTRACT_DIR):
        shutil.rmtree(EXTRACT_DIR)
    os.makedirs(EXTRACT_DIR, exist_ok=True)

    with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
        zf.extractall(EXTRACT_DIR)
    print(f"   Extracted to: {EXTRACT_DIR}")

    # ---------------------------
    # Step 2: Read _classes.csv
    # ---------------------------
    csv_path = os.path.join(EXTRACT_DIR, "train", "_classes.csv")
    print(f"\n📄 Reading class labels from: {csv_path}")

    authentic_files = []
    counterfeit_files = []

    with open(csv_path, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        print(f"   CSV Headers: {headers}")

        for row in reader:
            filename = row['filename']
            # Determine class by checking which column has '1'
            is_fake = False
            is_real = False
            for cls in FAKE_CLASSES:
                if cls in row and row[cls].strip() == '1':
                    is_fake = True
                    break
            for cls in REAL_CLASSES:
                if cls in row and row[cls].strip() == '1':
                    is_real = True
                    break

            if is_fake:
                counterfeit_files.append(filename)
            elif is_real:
                authentic_files.append(filename)
            else:
                print(f"   ⚠️ Skipping {filename} — no class label found")

    print(f"\n📊 Class Distribution (before split):")
    print(f"   Authentic:   {len(authentic_files)}")
    print(f"   Counterfeit: {len(counterfeit_files)}")
    print(f"   Total:       {len(authentic_files) + len(counterfeit_files)}")

    # ---------------------------
    # Step 3: Split & Organize
    # ---------------------------
    print(f"\n📂 Creating dataset at: {OUTPUT_DIR}")
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)

    for split in ['train', 'valid', 'test']:
        for cls in ['authentic', 'counterfeit']:
            os.makedirs(os.path.join(OUTPUT_DIR, split, cls), exist_ok=True)

    def split_and_copy(file_list, class_name):
        random.shuffle(file_list)
        n = len(file_list)
        n_train = int(n * TRAIN_RATIO)
        n_valid = int(n * VALID_RATIO)

        splits = {
            'train': file_list[:n_train],
            'valid': file_list[n_train:n_train + n_valid],
            'test':  file_list[n_train + n_valid:]
        }

        for split_name, files in splits.items():
            dest_dir = os.path.join(OUTPUT_DIR, split_name, class_name)
            copied = 0
            for fname in files:
                src = os.path.join(EXTRACT_DIR, "train", fname)
                if os.path.exists(src):
                    shutil.copy2(src, os.path.join(dest_dir, fname))
                    copied += 1
                else:
                    print(f"   ⚠️ Missing file: {src}")
            print(f"   {class_name}/{split_name}: {copied} images")

    print("\n🔀 Splitting authentic images...")
    split_and_copy(authentic_files, 'authentic')

    print("\n🔀 Splitting counterfeit images...")
    split_and_copy(counterfeit_files, 'counterfeit')

    # ---------------------------
    # Step 4: Verify & Cleanup
    # ---------------------------
    print("\n✅ Final dataset structure:")
    for split in ['train', 'valid', 'test']:
        for cls in ['authentic', 'counterfeit']:
            path = os.path.join(OUTPUT_DIR, split, cls)
            count = len([f for f in os.listdir(path) if f.endswith('.jpg')])
            print(f"   {split}/{cls}: {count}")

    # Cleanup temp extraction
    print(f"\n🧹 Cleaning up temp folder: {EXTRACT_DIR}")
    shutil.rmtree(EXTRACT_DIR)

    print("\n🎉 Dataset preparation complete!")
    print(f"   Dataset location: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

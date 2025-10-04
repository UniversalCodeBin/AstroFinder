import pandas as pd
import glob
import os

def load_and_combine_data(data_folder='../../data'):
    csv_files = glob.glob(os.path.join(data_folder, '*.csv'))
    df_list = []
    for f in csv_files:
        try:
            df = pd.read_csv(f)
            df_list.append(df)
        except Exception as e:
            print(f"Skipping file {f}: {e}")
    full_data = pd.concat(df_list, ignore_index=True)
    return full_data

def preprocess_data(df):
    # Example: drop rows with missing target, fill missing values, encode categorical
    df = df.dropna(subset=['disposition', 'Disposition', 'LABEL', 'label'], how='all')
    df = df.fillna(df.median(numeric_only=True))
    # You may need to adjust the target column name based on your files
    target_col = None
    for col in ['disposition', 'Disposition', 'LABEL', 'label']:
        if col in df.columns:
            target_col = col
            break
    if target_col is None:
        raise ValueError("No target column found!")
    X = df.drop(columns=[target_col])
    y = df[target_col]
    # Optionally: encode categorical variables here
    X = pd.get_dummies(X)
    return X, y

if __name__ == "__main__":
    df = load_and_combine_data()
    X, y = preprocess_data(df)
    print(X.head())
    print(y.value_counts())
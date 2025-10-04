import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import joblib
from sklearn.ensemble import RandomForestClassifier
from src.data_processing.preprocess import load_and_combine_data, preprocess_data

def train_and_save_model():
    df = load_and_combine_data()
    X, y = preprocess_data(df)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    joblib.dump((model, X.columns), 'rf_exoplanet_model.joblib')
    print("Model trained and saved as rf_exoplanet_model.joblib")

if __name__ == "__main__":
    train_and_save_model()
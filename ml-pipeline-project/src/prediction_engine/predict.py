import joblib
import pandas as pd

def predict_on_new_data(new_data_csv, model_path='rf_exoplanet_model.joblib'):
    model, feature_columns = joblib.load(model_path)
    new_data = pd.read_csv(new_data_csv)
    new_data = pd.get_dummies(new_data)
    # Align columns
    for col in feature_columns:
        if col not in new_data.columns:
            new_data[col] = 0
    new_data = new_data[feature_columns]
    preds = model.predict(new_data)
    probs = model.predict_proba(new_data)
    return preds, probs

if __name__ == "__main__":
    preds, probs = predict_on_new_data('../../data/tess_candidates.csv')
    print(preds)
    print(probs)
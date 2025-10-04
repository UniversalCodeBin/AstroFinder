import shap
import joblib
import pandas as pd
import numpy as np

def load_model(model_path):
    return joblib.load(model_path)

def compute_shap_values(model, X):
    explainer = shap.Explainer(model, X)
    shap_values = explainer(X)
    return shap_values

def visualize_shap_values(shap_values, feature_names):
    shap.summary_plot(shap_values, feature_names=feature_names)

def main(model_path, data_path):
    model = load_model(model_path)
    X = pd.read_csv(data_path)
    
    shap_values = compute_shap_values(model, X)
    visualize_shap_values(shap_values, X.columns)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Compute and visualize SHAP values for the trained model.')
    parser.add_argument('--model_path', type=str, required=True, help='Path to the trained model file.')
    parser.add_argument('--data_path', type=str, required=True, help='Path to the input data file for SHAP value computation.')
    
    args = parser.parse_args()
    main(args.model_path, args.data_path)
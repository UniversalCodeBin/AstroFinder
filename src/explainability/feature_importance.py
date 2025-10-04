from sklearn.inspection import permutation_importance
import numpy as np
import joblib

def load_model(model_path):
    return joblib.load(model_path)

def calculate_feature_importance(model, X, y):
    result = permutation_importance(model, X, y, n_repeats=30, random_state=42)
    feature_importance = result.importances_mean
    return feature_importance

def get_feature_importance(model_path, X, y):
    model = load_model(model_path)
    importance = calculate_feature_importance(model, X, y)
    return importance

def display_feature_importance(importance, feature_names):
    sorted_indices = np.argsort(importance)[::-1]
    for idx in sorted_indices:
        print(f"Feature: {feature_names[idx]}, Importance: {importance[idx]}")
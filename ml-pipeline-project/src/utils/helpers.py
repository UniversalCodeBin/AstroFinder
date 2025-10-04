def load_data(file_path):
    import pandas as pd
    return pd.read_csv(file_path)

def save_model(model, file_path):
    import joblib
    joblib.dump(model, file_path)

def load_model(file_path):
    import joblib
    return joblib.load(file_path)

def preprocess_input_data(data):
    # Implement any necessary preprocessing steps here
    return data

def calculate_metrics(y_true, y_pred):
    from sklearn.metrics import accuracy_score, f1_score
    accuracy = accuracy_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred, average='weighted')
    return accuracy, f1

def set_random_seed(seed):
    import numpy as np
    import random
    import tensorflow as tf

    np.random.seed(seed)
    random.seed(seed)
    tf.random.set_seed(seed)
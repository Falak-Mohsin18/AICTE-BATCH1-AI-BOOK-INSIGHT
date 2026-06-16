from sentence_transformers import SentenceTransformer
import numpy as np

model = None

def load_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

def get_embedding(text):
    model = load_model()
    return model.encode(text)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
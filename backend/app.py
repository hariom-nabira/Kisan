from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler,OneHotEncoder

app = Flask(__name__)
CORS(app)



fertilizer_df = pd.read_csv('./dataset/fertilizerpred.csv')

feature_cols = ['Temparature', 'Humidity', 'Moisture', 'Soil Type', 'Crop Type', 'Nitrogen', 'Potassium', 'Phosphorous']
target_col = 'Fertilizer Name'

X = fertilizer_df[feature_cols]
y = fertilizer_df[target_col]

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['Temparature', 'Humidity', 'Moisture', 'Nitrogen', 'Potassium', 'Phosphorous']),
        ('cat', OneHotEncoder(), ['Soil Type', 'Crop Type'])
    ]
)

fertilizer_model = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', RandomForestClassifier())])
fertilizer_model.fit(X, y)

@app.route('/fertilizer_predict', methods=['POST'])
def fertilizer_predict():
    data = request.json

    try:
        input_data = pd.DataFrame([data])

        # Predict fertilizer
        prediction = fertilizer_model.predict(input_data)[0]

        return jsonify({"fertilizer": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 400





df = pd.read_csv('./dataset/crop_recommendation.csv')
msp_df = pd.read_csv('./dataset/msp_2024.csv') 

schemes_df = pd.read_csv('./dataset/govschemeupdated.csv')
schemes_df.replace('N/A', np.nan, inplace=True)
schemes_df = schemes_df[
    (schemes_df['Implementation_End_Year'].str.lower() == 'ongoing') &
    (schemes_df['Farmer_Eligibility'].notna()) &
    (schemes_df['Target_Crops'].notna())
]

num_col = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
target_col = 'label'
X = df[num_col]
y = df[target_col]

preprocessor = ColumnTransformer(
    transformers=[('num', StandardScaler(), num_col)]
)
model = RandomForestClassifier()
pipe = Pipeline(steps=[('preprocessor', preprocessor), ('model', model)])
pipe.fit(X, y)

def get_msp_price(crop_name):
    """Get MSP price for a given crop if available"""
    try:
        msp_df.columns = msp_df.columns.str.strip().str.lower().str.replace(" ", "_")
        crop_name = crop_name.strip().lower()

        crop_data = msp_df[msp_df['crops'] == crop_name]
        if not crop_data.empty:
            return float(crop_data.iloc[0]['price'])
        return None
    except Exception as e:
        print(f"Error getting MSP for {crop_name}: {str(e)}")
        return None

def suggest_schemes(predicted_crop):
    schemes = schemes_df[schemes_df['Target_Crops'].str.contains(predicted_crop, case=False, na=False)]
    return schemes['Scheme_Name'].tolist()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = pd.DataFrame([data])
    predictions = pipe.predict_proba(input_data)[0]
    top_3_indices = predictions.argsort()[-3:][::-1]
    
    results = []
    for index in top_3_indices:
        crop = pipe.classes_[index]  # The predicted crop name
        msp = get_msp_price(crop)
        schemes = suggest_schemes(crop)
        
        result = {
            "crop": crop,
            # "probability": float(predictions[index]), 
            "msp": msp if msp is not None else "MSP not available",
            "schemes": schemes if schemes else ["No schemes available"]
        }
        results.append(result)
    
    return jsonify({"predictions": results})

if __name__ == '__main__':
    app.run(debug=True)

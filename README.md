# 🌾 Kisan - Empowering Indian Farmers with Technology

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-Flask-red.svg)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)](https://mongodb.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Scikit--learn-orange.svg)](https://scikit-learn.org/)

Kisan is a comprehensive agricultural technology platform designed to empower Indian farmers with data-driven insights, crop predictions, and access to government schemes. Our platform combines machine learning algorithms with real-time weather data to provide personalized recommendations for optimal agricultural success.

## 🚀 Features

### 🌱 **Crop Prediction**
- Advanced ML-based crop recommendation system
- Considers soil parameters (N, P, K), temperature, humidity, pH, and rainfall
- Provides top 3 crop suggestions with MSP (Minimum Support Price) information
- Real-time weather data integration for accurate predictions

### 🧪 **Fertilizer Recommendation**
- Personalized fertilizer suggestions based on soil conditions
- Considers temperature, humidity, moisture, soil type, and crop type
- Optimizes nutrient application for better yield

### 📊 **Crop Analytics & Visualization**
- Interactive data visualization for crop parameters
- Comparative analysis across different crops
- Statistical insights for informed decision-making

### 🏛️ **Government Schemes Integration**
- Access to current agricultural schemes and subsidies
- Scheme eligibility information
- Target crop-specific recommendations

### 📍 **Location-Based Insights**
- Suitable location recommendations for specific crops
- Weather data integration using geolocation
- Regional agricultural insights

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Chakra UI** - Component library
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Machine Learning
- **Python 3.x** - Programming language
- **Flask** - Web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Random Forest Classifier** - ML algorithm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd kisan
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Backend Setup
```bash
cd ../backend
npm install
```

### 4. Machine Learning Service Setup
```bash
cd ../ml
pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

### 1. Start MongoDB
```bash
mongod
```

### 2. Start the Backend Server
```bash
cd backend
npm run dev
```

### 3. Start the ML Service
```bash
cd ml
python app.py
```

### 4. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

## 📱 Usage

### For Farmers

1. **Register/Login**: Create an account using your Aadhar number
2. **Crop Prediction**: Enter soil parameters and get crop recommendations
3. **Fertilizer Recommendation**: Get personalized fertilizer suggestions
4. **Analytics**: View crop data visualizations and insights
5. **Government Schemes**: Access relevant agricultural schemes

### Key Features

- **Real-time Weather Integration**: Automatically fetch weather data using geolocation
- **MSP Information**: Get Minimum Support Price for recommended crops
- **Interactive Visualizations**: Explore crop data through charts and graphs
- **Mobile Responsive**: Access the platform from any device

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Crop Prediction
- `POST /predict` - Get crop recommendations
- `GET /api/crop-info/<crop_name>` - Get crop information

### Fertilizer Prediction
- `POST /fertilizer_predict` - Get fertilizer recommendations

## 📊 Datasets

The platform uses several datasets for accurate predictions:

- **Crop Recommendation Dataset**: Soil and climate parameters for various crops
- **Fertilizer Prediction Dataset**: Fertilizer recommendations based on conditions
- **MSP Dataset**: Minimum Support Prices for different crops
- **Government Schemes Dataset**: Current agricultural schemes and subsidies
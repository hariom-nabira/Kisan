import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

// Api.js
export const predictCrops = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in predictCrops:", error);
    throw error;
  }
};

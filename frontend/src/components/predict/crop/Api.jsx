// Api.js
export const predictCrops = async (data) => {
  try {
    const response = await fetch("https://mini-project-grp9-ml.onrender.com/predict", {
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

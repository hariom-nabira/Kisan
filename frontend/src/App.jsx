import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/footer/Footer";
import CropPredictor from "./components/predict/crop/CropPredictor";
import FertilizerPredictor from "./components/predict/fertilizer/FertilizerPredict";
import IdealCrop from "./components/predict/idealCrop/IdealCrop";

function App() {
  const [tokens, setTokens] = useState({
    accessToken: sessionStorage.getItem("accessToken") || null,
    refreshToken: sessionStorage.getItem("refreshToken") || null,
  });
  const isAuthenticated = !!tokens.accessToken;
  useEffect(() => {
    // If tokens change, update sessionStorage
    if (tokens.accessToken) {
      sessionStorage.setItem("accessToken", tokens.accessToken);
    } else {
      sessionStorage.removeItem("accessToken");
    }
    if (tokens.refreshToken) {
      sessionStorage.setItem("refreshToken", tokens.refreshToken);
    } else {
      sessionStorage.removeItem("refreshToken");
    }
  }, [tokens]);
  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setTokens={setTokens} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setTokens={setTokens} />} />
          <Route
            path="/"
            element={ <Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/predict/crop"
            element={
              isAuthenticated ? <CropPredictor /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/predict/fertilizer"
            element={
              isAuthenticated ? (
                <FertilizerPredictor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/predict/idealCrop"
            element={
              isAuthenticated ? (
                <IdealCrop />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
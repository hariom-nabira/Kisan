import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/header/Navbar"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Home from "./pages/Home"

function App() {
  const [tokens, setTokens] = useState({
    accessToken: sessionStorage.getItem('accessToken') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
  });
  const isAuthenticated = !!tokens.accessToken;
  useEffect(() => {
    // If tokens change, update sessionStorage
    if (tokens.accessToken) {
      sessionStorage.setItem('accessToken', tokens.accessToken);
    } else {
      sessionStorage.removeItem('accessToken');
    }
    if (tokens.refreshToken) {
      sessionStorage.setItem('refreshToken', tokens.refreshToken);
    } else {
      sessionStorage.removeItem('refreshToken');
    }
  }, [tokens]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setTokens={setTokens} />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

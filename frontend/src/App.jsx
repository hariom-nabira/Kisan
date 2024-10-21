import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/header/Navbar"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import PageNotFound from "./pages/PageNotFound"

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
      <Navbar isAuthenticated={isAuthenticated} setTokens={setTokens} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setTokens={setTokens} />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

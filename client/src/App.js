import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./middlewares/authMiddleware";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PdfViewerPage from "./pages/PdfViewerPage";


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pdf" element={<HomePage />} />
          <Route path="/pdf/:id" element={<PdfViewerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing Components
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPW from './pages/ForgotPW';
import Reset from './pages/Reset';



export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPW />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

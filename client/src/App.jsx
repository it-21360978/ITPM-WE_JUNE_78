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
import ProductAdd from './pages/ProductAdd';
import Plist from "./pages/productlist";
import ProductView from "./pages/productView";
import ProductEdit from './pages/ProductEdit';
import Pfilter from './pages/ProductFilter';



export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPW />} />
          <Route path="/reset/:token" element={<Reset />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/add" element={<ProductAdd />} />
          <Route path="/plist" exact element={<Plist/>} />
          <Route path="/pview" exact element={<ProductView/>} />         
          <Route path="/pedit/:id" exact element={<ProductEdit/>} />
          <Route path="/pfilter" exact element={<Pfilter/>}/>
  

        </Routes>
      </Router>
    </div>
  );
}

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing Components
//importing authentication management
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPW from './pages/ForgotPW';
import Reset from './pages/Reset';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/userDashboard';
import EditUser from './components/editUser';
import Home from './pages/home';
import Filter from './Filter';

// Importing product management
import ProductAdd from './pages/ProductAdd';
import Plist from "./pages/productlist";
import ProductView from "./pages/productView";
import ProductEdit from './pages/ProductEdit';




export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPW />} />
          <Route path="/reset/:token" element={<Reset />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard/:id" element={<EditUser />} />
          <Route path="/" element={<Home />} />

          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/add" element={<ProductAdd />} />
          <Route path="/plist" exact element={<Plist/>} />
          <Route path="/pview/:id" exact element={<ProductView/>} />         
          <Route path="/pedit/:id" exact element={<ProductEdit/>} />
          
          <Route path="/filter" exact element={<Filter/>}/>

  

        </Routes>
      </Router>
    </div>
  );
}

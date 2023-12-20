import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import RequireAuth from "./middlewares/Auth";
import Dashboard from "./components/pages/Dashboard";
import Statics from "./components/organisms/Statics";
import Apartments from "./components/organisms/Apartments";
import Payments from "./components/organisms/Payments";
import Invoices from "./components/organisms/Invoices";
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <Dashboard>
                <Routes>
                  <Route path="/" element={<Statics/>}/>
                  <Route path="/apartments" element={<Apartments/>}/>
                  <Route path="/payments" element={<Payments/>}/>
                  <Route path="/invoices" element={<Invoices/>}/>
                </Routes>
              </Dashboard>
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/admin"/>}/>
      </Routes>
    </Router>
  );
};

export default Routing;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

const initialProducts = [
  { id: "rpqQ...", name: "Mouse", quantity: 1, price: 500 },
  { id: "wX0D...", name: "LAPTOP", quantity: 6, price: 10000 }
];

const App = () => {
  const [user, setUser] = useState({ email: "admin@example.com" });
  const [products, setProducts] = useState(initialProducts);
  const [currency, setCurrency] = useState("₹"); // Default currency symbol

  const handleLogin = (email, password) => setUser({ email });
  const handleLogout = () => setUser(null);

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <Router>
      <div className="app-layout">
        <Sidebar onLogout={handleLogout} user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                products={products}
                setProducts={setProducts}
                currency={currency}
              />
            } />
            <Route path="/products" element={
              <ProductsPage
                products={products}
                setProducts={setProducts}
                currency={currency}
              />
            } />
            <Route path="/reports" element={
              <ReportsPage
                products={products}
              />
            } />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={
              <SettingsPage
                currency={currency}
                setCurrency={setCurrency}
              />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

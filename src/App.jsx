import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; // Import the Provider
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
// ... import other pages (Login, Products, etc.)
import Products from './pages/Products.jsx';
import BMICalculator from './pages/BMICalculator.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx';
import AIChat from './components/AIChat.jsx'; 
import Notification from './components/Notification.jsx'; // Import the new component
import './App.css'; 

function App() {
  return (
    <CartProvider> {/* --- NEW: Wrap with CartProvider --- */}
      <div className="flex flex-col min-h-screen">
        <Navbar /> 
        <main className="flex-grow pt-16 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        
        <AIChat />
        <Notification /> {/* --- NEW: Add the Notification component here --- */}
      </div>
    </CartProvider>
  );
}

export default App;
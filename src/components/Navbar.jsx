import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; // Import the hook

function Navbar() {
  const { cartTotal } = useCart(); // Get the total item count

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 shadow-md z-10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-indigo-200 transition">
          UFit 🏋️
        </Link>
        <div className="flex space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/bmi">BMI Calc</NavLink>
          <NavLink to="/login">Login</NavLink>
          <Link to="/cart" className="relative text-white hover:text-indigo-200 transition text-lg font-medium p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3 9h11l3-9H5zm3 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {/* Display cart total if > 0 */}
            {cartTotal > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartTotal}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Helper component (unchanged)
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-white hover:text-indigo-200 transition text-lg font-medium p-2"
  >
    {children}
  </Link>
);

export default Navbar;
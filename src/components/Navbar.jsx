import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; // ➕ CHANGE: Import useAuth hook

// Helper component for cleaner links (Unchanged)
const NavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick} // Pass onClick for mobile menu closure
    className="block text-white hover:text-indigo-200 transition text-lg font-medium p-2 lg:inline-block lg:ml-4"
  >
    {children}
  </Link>
);

function Navbar() {
  const { cartTotal } = useCart(); 
  const { isLoggedIn, user, logout } = useAuth(); // ➕ CHANGE: Get state and functions from AuthContext
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to handle logout and close the mobile menu if open
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 shadow-md z-10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-indigo-200 transition">
          UFit 🏋️
        </Link>

        {/* --- 1. Desktop Links (Visible on large screens) --- */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/bmi">BMI Calc</NavLink>
          
          {/* ⚠️ CRITICAL CHANGE: Conditional rendering based on login status */}
          {isLoggedIn ? (
            <>
              {/* Display username/welcome message */}
              <span className="text-white text-lg font-medium p-2">
                Hi, {user?.username || 'User'}
              </span>
              {/* Logout Button */}
              <button 
                onClick={logout} // Calls the logout function from AuthContext
                className="bg-red-500 text-white p-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // Display Login/Signup when logged out
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}

          {/* Cart Icon - Always visible */}
          <Link to="/cart" className="relative text-white hover:text-indigo-200 transition text-lg font-medium p-2 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3 9h11l3-9H5zm3 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartTotal > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartTotal}
              </span>
            )}
          </Link>
        </div>

        {/* --- 2. Mobile Menu Button (Visible on small screens) --- */}
        <div className="flex items-center lg:hidden">
            {/* Mobile Cart Icon - Shown here as well */}
            <Link to="/cart" className="relative text-white hover:text-indigo-200 transition text-lg font-medium p-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3 9h11l3-9H5zm3 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartTotal > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartTotal}
                  </span>
                )}
            </Link>

            <button 
              onClick={toggleMenu} 
              className="text-white hover:text-indigo-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger Icon (or X icon when open) */}
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                  />
                )}
              </svg>
            </button>
        </div>
      </div>

      {/* --- 3. Mobile Menu Panel --- */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden mt-2 bg-indigo-700 rounded-md shadow-lg`}>
        <div className="flex flex-col p-2">
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/products" onClick={toggleMenu}>Products</NavLink>
          <NavLink to="/bmi" onClick={toggleMenu}>BMI Calc</NavLink>
          
          {isLoggedIn ? (
            // Mobile Logged In View
            <>
                <span className="text-white text-lg font-medium p-2">
                    Hi, {user?.username || 'User'}
                </span>
                <button 
                    onClick={handleLogout} // Uses helper function to close menu
                    className="text-left bg-red-500 text-white p-2 rounded-lg font-semibold hover:bg-red-600 transition mt-2"
                >
                    Logout
                </button>
            </>
          ) : (
            // Mobile Logged Out View
            <>
              <NavLink to="/login" onClick={toggleMenu}>Login</NavLink>
              <NavLink to="/signup" onClick={toggleMenu}>Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
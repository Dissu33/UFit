import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ➕ CHANGE: Import useNavigate for redirection
import { useAuth } from '../context/AuthContext'; // ➕ CHANGE: Import useAuth for global state

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // ➕ ADDED: State for displaying API errors
  const [loading, setLoading] = useState(false); // ➕ ADDED: State for loading/disabling button

  const navigate = useNavigate();
  const { setUser } = useAuth(); // ➕ CHANGE: Get the function to update global user state

  const handleSubmit = async (e) => { // ⚠️ CHANGE: Made function async to handle fetch
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ⚠️ CHANGE: API call to the backend's login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // ⚠️ CHANGE: Handle errors like "Invalid Credentials"
        setError(data.message || 'Login failed. Please check your email and password.');
      } else {
        // 🚀 CRITICAL CHANGE: On success, store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        
        // Update global state via AuthContext
        setUser(data.user); 

        // Redirect to the home page
        navigate('/'); 
      }
    } catch (err) {
      // ⚠️ CHANGE: Catch network errors (e.g., backend server is down)
      setError('A network error occurred. Check if the server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back to UFit!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        </div>

        {/* ➕ ADDED: Display the error message */}
        {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
        )}

        <button 
          type="submit" 
          disabled={loading} // ⚠️ CHANGE: Disable button while loading
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? 'Logging In...' : 'Log In'} {/* ⚠️ CHANGE: Update text when loading */}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-black">
        Don't have an account? 
        <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-800 ml-1">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
export default Login;
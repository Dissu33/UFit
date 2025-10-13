import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ➕ CHANGE: Import useNavigate for redirection

function Signup() {
  const [username, setUsername] = useState(''); // ⚠️ CHANGE: Renamed 'name' to 'username' to match backend schema
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // ➕ ADDED: State for displaying API errors
  const [loading, setLoading] = useState(false); // ➕ ADDED: State for loading/disabling button

  const navigate = useNavigate(); // ➕ ADDED: Hook for redirection

  const handleSubmit = async (e) => { // ⚠️ CHANGE: Made function async to handle fetch
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ⚠️ CHANGE: API call to the backend's signup endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ⚠️ CRITICAL: Send username, email, and password to the server
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // ⚠️ CHANGE: Handle server-side errors (e.g., email or username already exists)
        setError(data.message || 'Registration failed. Please try again.');
      } else {
        // 🚀 SUCCESS: Redirect to login page after successful registration
        alert('Account created successfully! Please log in.');
        navigate('/login'); 
      }
    } catch (err) {
      // ⚠️ CHANGE: Catch network errors
      setError('A network error occurred. Check server connection.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Join UFit Today</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            type="text" 
            id="username" // ⚠️ CHANGE: Updated ID
            value={username} // ⚠️ CHANGE: Updated value to 'username' state
            onChange={(e) => setUsername(e.target.value)} // ⚠️ CHANGE: Updated setter
            placeholder="Choose a username"
            required 
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required 
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required 
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        </div>

        {/* ➕ ADDED: Display the error message */}
        {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
        )}

        <button 
          type="submit" 
          disabled={loading} // ⚠️ CHANGE: Disable button while loading
          className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Sign Up'} {/* ⚠️ CHANGE: Update text when loading */}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account? 
        <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-800 ml-1">
          Log In
        </Link>
      </p>
    </div>
  );
}
export default Signup;
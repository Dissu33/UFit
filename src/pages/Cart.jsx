import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; 

function Cart() {
  const { cartItems } = useCart(); 
  
  // Calculate the total dynamically
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Your UFit Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-800">
            Go to Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                
                {/* --- NEW: Product Image and Name Group --- */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                  <span className="font-semibold text-lg text-gray-800">{item.name}</span>
                </div>
                {/* --- END NEW --- */}

                <div className="flex items-center space-x-6">
                  {/* Display Qty and Price */}
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-bold text-indigo-600">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-300 flex justify-between items-center">
            <span className="text-2xl font-semibold text-gray-800">Subtotal:</span>
            <span className="text-3xl font-extrabold text-indigo-700">₹{subtotal}</span>
          </div>

          <button className="w-full mt-6 bg-green-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-200 shadow-lg">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
export default Cart;
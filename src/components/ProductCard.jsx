import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, decreaseQuantity, getProductQuantity } = useCart();
  
  // Get the current quantity of this product from the cart
  const quantity = getProductQuantity(product.id);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(product.id);
  };
  
  // Decide which state the button should be in
  const showControls = quantity > 0 && isHovered;
  const showInitialButton = quantity === 0 || !isHovered;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200"
      onMouseEnter={handleMouseEnter} // Track hover state
      onMouseLeave={handleMouseLeave} // Track hover state
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center h-10"> {/* Fixed height for smooth transition */}
          <span className="text-2xl font-extrabold text-indigo-600">₹{product.price}</span>
          
          {/* Conditional Rendering based on state */}
          <div className="relative w-32">
            
            {/* 1. Initial/Hover-out Button (Quantity 0 or not hovered) */}
            {(showInitialButton) && (
              <button 
                onClick={handleAddToCart}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition absolute top-0 left-0"
              >
                {quantity > 0 ? `${quantity} in Cart` : 'Add to Cart'}
              </button>
            )}

            {/* 2. Quantity Controls (Quantity > 0 AND hovered) */}
            {showControls && (
              <div className="w-full absolute top-0 left-0 flex items-center justify-between bg-indigo-500 rounded-lg overflow-hidden transition duration-300">
                <button 
                  onClick={handleDecreaseQuantity}
                  className="bg-indigo-600 text-white p-2 text-xl hover:bg-indigo-700 h-full w-1/3 rounded-none"
                >
                  -
                </button>
                <span className="text-white text-lg font-bold w-1/3 text-center">
                  {quantity}
                </span>
                <button 
                  onClick={handleAddToCart}
                  className="bg-indigo-600 text-white p-2 text-xl hover:bg-indigo-700 h-full w-1/3 rounded-none"
                >
                  +
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
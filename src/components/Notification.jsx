import React from 'react';
import { useCart } from '../context/CartContext.jsx';

function Notification() {
  const { showNotification, notificationMessage } = useCart();

  if (!showNotification) return null;

  return (
    <div 
      className="fixed bottom-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-2xl transition-opacity duration-300 z-50 animate-bounce"
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-semibold">{notificationMessage}</p>
      </div>
    </div>
  );
}

export default Notification;
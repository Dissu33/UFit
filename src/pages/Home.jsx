import React from 'react';
import { Link } from 'react-router-dom';
// Import a great image for featuring (e.g., the high-quality Collagen)
import collagenImage from '../assets/images/collagen.jpeg'; 

function Home() {
  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION - Clean, split-screen design */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white p-12 lg:p-16 rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100">
        
        {/* Left Side: Text and CTAs */}
        <div className="lg:w-1/2 text-center lg:text-left p-4 lg:pr-12">
          <p className="text-xl font-semibold text-indigo-600 mb-2 uppercase tracking-wider">
            Your Health, Our Mission
          </p>
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Fuel Your Body. <span className="text-green-500">Achieve Your Goals.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Discover UFit's range of premium superfoods and supplements designed to give you the clean, sustained energy you need.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02]">
              Shop UFit Products
            </Link>
            <Link to="/bmi" className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full text-lg font-bold hover:bg-yellow-600 transition duration-300 shadow-lg transform hover:scale-[1.02]">
              Calculate Your BMI
            </Link>
          </div>
        </div>

        {/* Right Side: Featured Product Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center p-4">
          <img 
            src={collagenImage} 
            alt="Featured UFit Product" 
            className="w-full max-w-sm h-auto object-contain rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500"
          />
        </div>
      </div>

***

      {/* 2. VALUE PROPOSITION SECTION - Features grid (Unchanged) */}
      <div className="py-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Why Choose UFit?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <FeatureCard 
            icon="💪" 
            title="Premium Quality" 
            description="We source the finest ingredients to ensure maximum potency and effectiveness for your health."
          />
          <FeatureCard 
            icon="🌱" 
            title="Natural & Clean" 
            description="Our products are free from artificial additives, fillers, and unnecessary preservatives. Just pure fuel."
          />
          <FeatureCard 
            icon="🚀" 
            title="Fast Results" 
            description="Combine our products with a balanced diet to see noticeable improvements in energy and fitness quickly."
          />

        </div>
      </div>
      
    </div>
  );
}

// Helper Component for the Feature Grid (Unchanged)
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
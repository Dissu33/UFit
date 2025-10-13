import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- Import motion
import collagenImage from '../assets/images/collagen.jpeg'; 

// Helper Component for the Feature Grid (must also use motion.div for animation)
const FeatureCard = ({ icon, title, description }) => (
  <motion.div // <-- Use motion.div here
    className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl"
    initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and invisible
    animate={{ opacity: 1, scale: 1 }}   // Animate to full size and visibility
    transition={{ duration: 0.4 }}
  >
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

function Home() {
  return (
    <motion.div // <-- Wrap the entire Home component content
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
      {/* 1. HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white p-12 lg:p-16 rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100">
        
        {/* Left Side: Text and CTAs */}
        <div className="lg:w-1/2 text-center lg:text-left p-4 lg:pr-12">
          {/* We can animate the image separately for more effect */}
          <motion.p 
            className="text-xl font-semibold text-indigo-600 mb-2 uppercase tracking-wider"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Your Health, Our Mission
          </motion.p>
          {/* ... (rest of the content) ... */}
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
        <motion.div // <-- Animate the image in with a twist
          className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center p-4"
          initial={{ x: 50, opacity: 0, rotate: 10 }}
          animate={{ x: 0, opacity: 1, rotate: 3 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={collagenImage} 
            alt="Featured UFit Product" 
            className="w-full max-w-sm h-auto object-contain rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500"
          />
        </motion.div>
      </div>

      {/* 2. VALUE PROPOSITION SECTION */}
      <div className="py-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Why Choose UFit?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Note: The stagger effect is often best managed using the container, but here we animate each card individually for simplicity. */}
          <FeatureCard icon="💪" title="Premium Quality" description="We source the finest ingredients to ensure maximum potency and effectiveness for your health." />
          <FeatureCard icon="🌱" title="Natural & Clean" description="Our products are free from artificial additives, fillers, and unnecessary preservatives. Just pure fuel." />
          <FeatureCard icon="🚀" title="Fast Results" description="Combine our products with a balanced diet to see noticeable improvements in energy and fitness quickly." />

        </div>
      </div>
      
    </motion.div>
  );
}

export default Home;
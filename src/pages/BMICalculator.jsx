import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for product links

// --- Function to determine BMI status, guidance, and product recommendation ---
const getBmiDetails = (bmiValue) => {
  if (bmiValue < 18.5) {
    return {
      status: 'Underweight',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-400',
      guidance: 'You might be underweight. Focus on nutrient-dense foods, increasing healthy calorie intake, and building muscle mass.',
      product: {
        name: 'UFit Classic Muesli & Chia Seeds',
        reason: 'Our Muesli provides complex carbohydrates and healthy fats, while Chia Seeds boost calorie density and Omega-3 intake for healthy weight gain.',
        link: '/products'
      }
    };
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    return {
      status: 'Normal Weight',
      color: 'bg-green-100 text-green-800 border-green-400',
      guidance: 'Great job! You are in the healthy weight range. Maintain a balanced diet and consistent exercise routine.',
      product: {
        name: 'UFit Multivitamins for Men/Women',
        reason: 'Multivitamins help ensure you fill any small nutritional gaps and support overall vitality and immune function for long-term health.',
        link: '/products'
      }
    };
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    return {
      status: 'Overweight',
      color: 'bg-orange-100 text-orange-800 border-orange-400',
      guidance: 'You are classified as overweight. A focus on protein, fiber, and calorie control is recommended to start a healthy weight loss journey.',
      product: {
        name: 'UFit Pumpkin Seeds & Fish Oil Omega-3',
        reason: 'Pumpkin Seeds offer high protein and fiber to keep you full, and Fish Oil supports metabolism and heart health during weight loss.',
        link: '/products'
      }
    };
  } else { // BMI > 30 (Obesity)
    return {
      status: 'Obesity',
      color: 'bg-red-100 text-red-800 border-red-400',
      guidance: 'Your BMI indicates obesity. We strongly recommend consulting a healthcare professional. Prioritize consistent, small dietary changes and moderate daily movement.',
      product: {
        name: 'UFit Collagen Peptides',
        reason: 'Collagen is low in calories, high in protein, and can help support joint health, which is vital when carrying extra weight.',
        link: '/products'
      }
    };
  }
};
// --------------------------------------------------------------------------

function BMICalculator() {
  const [height, setHeight] = useState(''); // in cm
  const [weight, setWeight] = useState(''); // in kg
  const [bmiResult, setBmiResult] = useState(null);
  const [error, setError] = useState('');

  const calculateBmi = (e) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      setError('');
      // BMI formula: weight (kg) / [height (m)]^2
      const heightInMeters = h / 100;
      const calculatedBmi = (w / (heightInMeters * heightInMeters)).toFixed(2);
      
      const details = getBmiDetails(parseFloat(calculatedBmi));
      
      setBmiResult({
          bmi: calculatedBmi,
          ...details,
      });

    } else {
      setBmiResult(null);
      setError('Please enter valid, positive values for both height and weight.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">UFit BMI Calculator</h2>
      
      <form onSubmit={calculateBmi} className="space-y-6">
        {/* Weight Input */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input 
            type="number" 
            id="weight" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="e.g., 70"
            required 
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Height Input */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input 
            type="number" 
            id="height" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="e.g., 175"
            required 
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md">
          Calculate BMI
        </button>
      </form>

      {/* --- BMI RESULT AND RECOMMENDATION SECTION --- */}
      {bmiResult && (
        <div className="mt-8">
            {/* BMI Score and Status */}
            <div className={`p-5 border rounded-lg ${bmiResult.color} text-center shadow-md`}>
                <h3 className="text-xl font-bold mb-1">Your BMI: <span className="text-3xl">{bmiResult.bmi}</span></h3>
                <p className="text-lg font-extrabold">Status: {bmiResult.status}</p>
            </div>

            {/* Guidance */}
            <div className="mt-4 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r-lg">
                <p className="text-sm font-medium text-gray-700">
                    <span className="font-bold text-indigo-600">Guidance: </span>
                    {bmiResult.guidance}
                </p>
            </div>

            {/* Product Recommendation */}
            <div className="mt-6 p-5 bg-white border border-indigo-200 rounded-lg shadow-inner">
                <h4 className="text-lg font-bold text-indigo-700 mb-2">UFit Recommendation:</h4>
                <p className="mb-3 text-gray-800">
                    Consider adding <span className="font-extrabold text-indigo-900">{bmiResult.product.name}</span> to your routine.
                </p>
                <p className="text-sm text-gray-600 italic">
                    <span className="font-semibold">Why:</span> {bmiResult.product.reason}
                </p>
                
                <Link to={bmiResult.product.link} className="inline-block mt-4 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 transition duration-200">
                    View Product
                </Link>
            </div>
        </div>
      )}

      {error && (
        <p className="mt-8 text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

export default BMICalculator;
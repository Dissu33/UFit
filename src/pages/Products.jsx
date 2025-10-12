import React from 'react';
import ProductCard from '../components/ProductCard.jsx';

// --- Import ALL images using the corrected path: '../assets/images/' ---
import chiaSeedsImage from '../assets/images/chia_seeds.jpeg';
import collagenImage from '../assets/images/collagen.jpeg';
import fishOilImage from '../assets/images/fish_oil.webp'; // Note: Used .webp as per your folder image
import muesliImage from '../assets/images/muesli.jpeg';
import multivitaminsImage from '../assets/images/multivitamins.webp';
import nutsAndFruitsMuesliImage from '../assets/images/nuts_and_fruits_muesli.jpeg';
import pumpkinSeedsImage from '../assets/images/pumpkin_seeds.webp';
import sunflowerSeedsImage from '../assets/images/sunflower_seeds.jpeg';


const dummyProducts = [
  { 
    id: 1, 
    name: 'UFit Nuts & Fruits Muesli', 
    price: 499, 
    description: 'A premium, high-fiber blend of whole grains, nuts, and exotic dried fruits for sustained energy.', 
    image: nutsAndFruitsMuesliImage 
  },
  { 
    id: 2, 
    name: 'UFit Classic Muesli', 
    price: 399, 
    description: 'The original healthy blend of oats, wheat flakes, and corn flakes. Perfect for a quick, nutritious breakfast.', 
    image: muesliImage 
  },
  { 
    id: 3, 
    name: 'UFit Collagen Peptides', 
    price: 1299, 
    description: 'Hydrolyzed bovine collagen for promoting healthy skin, hair, nails, and strong joint support.', 
    image: collagenImage 
  },
  { 
    id: 4, 
    name: 'UFit Fish Oil Omega-3', 
    price: 899, 
    description: 'High potency EPA/DHA capsules supporting heart health, brain function, and reduced inflammation.', 
    image: fishOilImage 
  },
  { 
    id: 5, 
    name: 'UFit Multivitamins for Men', 
    price: 649, 
    description: 'Essential vitamins and minerals formulated specifically to meet the daily nutritional needs of active men.', 
    image: multivitaminsImage 
  },
  { 
    id: 6, 
    name: 'UFit Pumpkin Seeds', 
    price: 199, 
    description: 'Nutrient-rich snack. Excellent source of magnesium and plant-based protein.', 
    image: pumpkinSeedsImage 
  },
  { 
    id: 7, 
    name: 'UFit Chia Seeds', 
    price: 149, 
    description: 'Superfood packed with Omega-3, fiber, and protein. Perfect for smoothies and puddings.', 
    image: chiaSeedsImage 
  },
  { 
    id: 8, 
    name: 'UFit Sunflower Seeds', 
    price: 249, 
    description: 'Crispy and delicious. Great source of Vitamin E and antioxidants.', 
    image: sunflowerSeedsImage 
  },
];

function Products() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl  font-extrabold text-white mb-8">Our UFit Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Key must be unique, using product.id */}
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

// Super simplified Recipe Card
const RecipeCard = ({ recipe, onLike, onDislike }: { 
  recipe: any; 
  onLike: () => void; 
  onDislike: () => void 
}) => {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'absolute'
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(e, { offset }) => {
        if (offset.x > 100) onLike();
        if (offset.x < -100) onDislike();
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Recipe Image */}
        <div style={{ height: '70%', overflow: 'hidden' }}>
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        {/* Recipe Info */}
        <div style={{ padding: '15px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
            {recipe.name}
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {recipe.cookTime} • {recipe.category}
          </p>
        </div>
        
        {/* Like/Dislike Buttons */}
        <div style={{ 
          position: 'absolute', 
          bottom: '15px', 
          left: '0', 
          right: '0', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px' 
        }}>
          <button 
            onClick={onDislike}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              color: '#ff4c4c',
              cursor: 'pointer'
            }}
          >
            <X size={30} />
          </button>
          <button 
            onClick={onLike}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              color: '#4cd964',
              cursor: 'pointer'
            }}
          >
            <Heart size={30} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Simple mobile nav button
const NavButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: active ? '#4cd964' : '#888',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px'
    }}
  >
    {icon}
    <span style={{ fontSize: '10px', marginTop: '4px' }}>{label}</span>
  </button>
);

// Minimal MobileAppPreview component
export default function MobileAppPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Extremely simplified sample data
  const recipes = [
    {
      id: 1,
      name: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80",
      cookTime: "15 mins",
      category: "Breakfast"
    },
    {
      id: 2,
      name: "Chicken Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=580&q=80",
      cookTime: "30 mins",
      category: "Dinner"
    },
    {
      id: 3,
      name: "Vegetable Stir Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=580&q=80",
      cookTime: "20 mins",
      category: "Lunch"
    }
  ];

  const handleLike = () => {
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDislike = () => {
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '375px',
      height: '667px',
      margin: '0 auto',
      border: '10px solid #222',
      borderRadius: '30px',
      overflow: 'hidden',
      position: 'relative',
      background: '#f5f5f5'
    }}>
      {/* Phone Status Bar */}
      <div style={{ 
        height: '30px', 
        background: '#222', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 15px',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <div>9:41</div>
        <div>100%</div>
      </div>
      
      {/* App Header */}
      <div style={{ 
        padding: '15px', 
        background: 'white', 
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '18px', color: '#4cd964' }}>WisePantryPal</h1>
      </div>
      
      {/* Content Area */}
      <div style={{ 
        height: 'calc(100% - 130px)', 
        position: 'relative',
        padding: '20px'
      }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <RecipeCard 
            recipe={recipes[currentIndex]} 
            onLike={handleLike} 
            onDislike={handleDislike}
          />
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div style={{ 
        height: '60px', 
        background: 'white', 
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <NavButton 
          icon={<Heart size={20} />} 
          label="Recipes" 
          active={true} 
          onClick={() => {}}
        />
        <NavButton 
          icon={<span style={{ fontSize: '20px' }}>🍽️</span>} 
          label="Pantry" 
          active={false} 
          onClick={() => {}}
        />
        <NavButton 
          icon={<span style={{ fontSize: '20px' }}>🛒</span>} 
          label="Shop" 
          active={false} 
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

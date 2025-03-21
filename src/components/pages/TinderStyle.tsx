import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

// Simplified Recipe Card that works independently
const RecipeCard = ({ recipe, onLike, onDislike }: { 
  recipe: any; 
  onLike: () => void; 
  onDislike: () => void 
}) => {
  return (
    <motion.div
      className="absolute w-full h-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(e, { offset }) => {
        if (offset.x > 100) onLike();
        if (offset.x < -100) onDislike();
      }}
      style={{
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Recipe Image */}
        <div style={{ height: '70%', overflow: 'hidden' }}>
          <img 
            src={recipe.image || "https://via.placeholder.com/400x300/f0f0f0/cccccc?text=Recipe"} 
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
          <p style={{ marginTop: '10px', fontSize: '0.95rem', color: '#333' }}>
            {recipe.description}
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

export default function TinderStyle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);

  // Sample recipes (with realistic data)
  const recipes = [
    {
      id: 1,
      name: "Avocado Toast with Eggs",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80",
      cookTime: "15 mins",
      category: "Breakfast",
      description: "A nutritious breakfast option that uses ingredients you already have in your pantry."
    },
    {
      id: 2,
      name: "Chicken Alfredo Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=580&q=80",
      cookTime: "30 mins",
      category: "Dinner",
      description: "A creamy and delicious pasta dish that's perfect for dinner."
    },
    {
      id: 3,
      name: "Vegetable Stir Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=580&q=80",
      cookTime: "20 mins",
      category: "Lunch",
      description: "A quick and healthy stir fry using vegetables from your pantry."
    }
  ];

  // Handler for liking a recipe
  const handleLike = () => {
    setLiked([...liked, recipes[currentIndex].id]);
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first recipe
    }
  };

  // Handler for disliking a recipe
  const handleDislike = () => {
    setDisliked([...disliked, recipes[currentIndex].id]);
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first recipe
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      background: '#f5f5f5'
    }}>
      <h1 style={{ 
        margin: '20px 0', 
        color: '#2a9d8f', 
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 'bold'
      }}>
        WisePantryPal Recipe Finder
      </h1>
      
      {/* Recipe Cards Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '350px',
        height: '500px',
        position: 'relative',
        margin: '0 auto'
      }}>
        <RecipeCard 
          recipe={recipes[currentIndex]} 
          onLike={handleLike} 
          onDislike={handleDislike}
        />
      </div>
      
      {/* Stats Display */}
      <div style={{ 
        marginTop: '30px', 
        display: 'flex', 
        gap: '20px',
        justifyContent: 'center'
      }}>
        <div style={{ 
          padding: '10px 20px', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontWeight: 'bold', color: '#4cd964' }}>
            Liked: {liked.length}
          </p>
        </div>
        <div style={{ 
          padding: '10px 20px', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontWeight: 'bold', color: '#ff4c4c' }}>
            Disliked: {disliked.length}
          </p>
        </div>
      </div>
    </div>
  );
}

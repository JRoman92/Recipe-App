import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.name} />
        <div className="recipe-card-category">{recipe.category}</div>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="recipe-card-meta-item">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="recipe-card-meta-item">
            <ChefHat size={16} />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

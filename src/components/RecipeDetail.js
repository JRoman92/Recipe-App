import React from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import '../styles/RecipeDetail.css';

const RecipeDetail = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-detail-overlay" onClick={onClose}>
      <div className="recipe-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="recipe-detail-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="recipe-detail-header">
          <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
          <div className="recipe-detail-header-content">
            <div className="recipe-detail-category">{recipe.category}</div>
            <h2 className="recipe-detail-title">{recipe.name}</h2>
            <p className="recipe-detail-description">{recipe.description}</p>
            <div className="recipe-detail-meta">
              <div className="recipe-detail-meta-item">
                <Clock size={20} />
                <div>
                  <div className="meta-label">Prep Time</div>
                  <div className="meta-value">{recipe.prepTime}</div>
                </div>
              </div>
              <div className="recipe-detail-meta-item">
                <Clock size={20} />
                <div>
                  <div className="meta-label">Cook Time</div>
                  <div className="meta-value">{recipe.cookTime}</div>
                </div>
              </div>
              <div className="recipe-detail-meta-item">
                <Users size={20} />
                <div>
                  <div className="meta-label">Servings</div>
                  <div className="meta-value">{recipe.servings}</div>
                </div>
              </div>
              <div className="recipe-detail-meta-item">
                <ChefHat size={20} />
                <div>
                  <div className="meta-label">Difficulty</div>
                  <div className="meta-value">{recipe.difficulty}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-detail-content">
          <div className="recipe-detail-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-detail-section">
            <h3>Instructions</h3>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

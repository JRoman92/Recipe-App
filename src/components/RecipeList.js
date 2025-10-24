import React from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try a different search or add a new recipe!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
};

export default RecipeList;

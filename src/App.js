import React, { useState, useMemo } from 'react';
import { Plus, ChefHat } from 'lucide-react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import { initialRecipes } from './data/recipes';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Search functionality - filters recipes by name, ingredients, or category
  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return recipes.filter(recipe => {
      // Search in recipe name
      if (recipe.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Search in category
      if (recipe.category.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Search in ingredients
      if (recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchLower)
      )) {
        return true;
      }
      
      // Search in description
      if (recipe.description.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      return false;
    });
  }, [recipes, searchTerm]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes(prev => [...prev, newRecipe]);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <ChefHat size={32} />
            <h1>Recipe App</h1>
          </div>
          <button className="add-recipe-button" onClick={() => setShowAddForm(true)}>
            <Plus size={20} />
            Add Recipe
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <h2>Discover Delicious Recipes</h2>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="results-count">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </div>
        </div>

        <RecipeList recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
      </main>

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />
      )}

      {showAddForm && (
        <AddRecipeForm onClose={handleCloseAddForm} onAddRecipe={handleAddRecipe} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import '../styles/AddRecipeForm.css';

const AddRecipeForm = ({ onClose, onAddRecipe }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: 'Easy',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '',
    description: '',
    ingredients: [''],
    instructions: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(item => item.trim() !== ''),
      instructions: formData.instructions.filter(item => item.trim() !== ''),
      servings: parseInt(formData.servings),
      id: Date.now() // Simple ID generation
    };

    // Validate required fields
    if (!cleanedData.name || !cleanedData.category || cleanedData.ingredients.length === 0 || cleanedData.instructions.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    onAddRecipe(cleanedData);
    onClose();
  };

  return (
    <div className="add-recipe-overlay" onClick={onClose}>
      <div className="add-recipe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-recipe-header">
          <h2>Add New Recipe</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-recipe-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Recipe Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Chocolate Cake"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Dessert"
                required
              />
            </div>

            <div className="form-group">
              <label>Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prep Time *</label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 15 mins"
                required
              />
            </div>

            <div className="form-group">
              <label>Cook Time *</label>
              <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                placeholder="e.g., 30 mins"
                required
              />
            </div>

            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="e.g., 4"
                min="1"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the recipe..."
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Ingredients *</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addArrayItem('ingredients')}
              >
                <Plus size={16} /> Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                  placeholder={`Ingredient ${index + 1}`}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeArrayItem(index, 'ingredients')}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Instructions *</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addArrayItem('instructions')}
              >
                <Plus size={16} /> Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="array-item">
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                  placeholder={`Step ${index + 1}`}
                  rows="2"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeArrayItem(index, 'instructions')}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;

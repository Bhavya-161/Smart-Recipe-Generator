
'use client';
import RecipeCard from './RecipeCard';
import { Recipe } from '../lib/types';

interface RecipeGridProps {
  recipes: Recipe[];
  onSave?: (recipe: Recipe) => void;
  onRemove?: (recipeId: string) => void;
  savedIds?: string[];
}

export default function RecipeGrid({ recipes, onSave, onRemove, savedIds = [] }: RecipeGridProps) {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSave={onSave}
          onRemove={onRemove}
          saved={savedIds.includes(recipe.id)}
        />
      ))}
    </div>
  );
}




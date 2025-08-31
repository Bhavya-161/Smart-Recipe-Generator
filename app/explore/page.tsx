'use client';
import { useRouter } from 'next/navigation';
import recipesData from '../../data/recipes.json';
import { Recipe } from '../../lib/types';

export default function ExplorePage() {
  const router = useRouter();
  const recipes: Recipe[] = recipesData as Recipe[];
  
  return (
    <div className="container">
      <h1>Explore Recipes</h1>
      <p>Browse all the recipes and click on any recipe to view full details.</p>

      <div className="grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>

            <div className="flex gap-4 mt-2">
              <button
                className="button"
                onClick={() => router.push(`/explore/${recipe.id}`)}
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

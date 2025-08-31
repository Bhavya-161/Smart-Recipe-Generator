'use client';
import { Recipe } from '../lib/types';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe & {
    missingIngredients?: string[];
    substitutions?: Record<string, string[]>;
  };
  onSave?: (recipe: Recipe) => void;
  onRemove?: (recipeId: string) => void;
  saved?: boolean;
}

export default function RecipeCard({ recipe, onSave, onRemove, saved }: RecipeCardProps) {
  const { title, description, image, ingredients, missingIngredients, substitutions, id } = recipe;

  // Detect if image is a blob (user-uploaded)
  const isBlob = image && typeof image === 'string' && image.startsWith('blob:');

  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      {/* Image handling */}
      {image && typeof image === 'string' && (
        isBlob ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title || 'Recipe Image'}
            style={{ maxWidth: '250px', borderRadius: '8px', marginTop: '10px' }}
          />
        ) : (
          <Image
            src={image}
            alt={title || 'Recipe Image'}
            width={250}
            height={200}
            style={{ borderRadius: '8px', marginTop: '10px' }}
          />
        )
      )}

      {/* Ingredients list */}
      {ingredients && ingredients.length > 0 && (
        <>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </>
      )}

      {/* Missing ingredients & substitutions */}
      {missingIngredients && missingIngredients.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Missing Ingredients & Substitutions:</h4>
          <ul>
            {missingIngredients.map((ing, idx) => (
              <li key={idx}>
                {ing}
                {substitutions && substitutions[ing] ? ` (Try: ${substitutions[ing].join(', ')})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save/Remove buttons */}
      {!saved && onSave && (
        <button className="button" onClick={() => onSave(recipe)} style={{ marginTop: '10px' }}>
          Save Recipe
        </button>
      )}

      {saved && onRemove && (
        <button className="button" onClick={() => onRemove(id)} style={{ marginTop: '10px' }}>
          Remove Recipe
        </button>
      )}
    </div>
  );
}



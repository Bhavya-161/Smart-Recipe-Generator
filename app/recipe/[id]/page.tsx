'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import recipesData from '../../../data/recipes.json';
import { Recipe } from '../../../lib/types';

export default function RecipeDetailPage() {
  const { id } = useParams() as { id: string };
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const found = (recipesData as Recipe[]).find(r => r.id === id) || null;
    setRecipe(found);

    const savedRecipes: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (savedRecipes.includes(id)) setSaved(true);
  }, [id]);

  const handleSave = () => {
    const savedRecipes: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (!savedRecipes.includes(id)) savedRecipes.push(id);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    setSaved(true);
  };

  if (!recipe) return <p className="container">Recipe not found.</p>;

  return (
    <div className="container">
      <h1>{recipe.title}</h1>

      {/* Display image */}
      {recipe.image && typeof recipe.image === 'string' && (
        <img
          src={`/images/${recipe.image}`} // public/images/ folder
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p><strong>Category:</strong> {recipe.category || 'N/A'}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty || 'N/A'}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime || 'N/A'} minutes</p>
      <p><strong>Calories:</strong> {recipe.calories || 'N/A'}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients?.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3>Steps:</h3>
      <ol>
        {recipe.steps?.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      {!saved ? (
        <button className="button" onClick={handleSave}>Save Recipe</button>
      ) : (
        <p>Recipe saved!</p>
      )}
    </div>
  );
}



















// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import recipesDataRaw from '../../../data/recipes.json';
// import { Recipe } from '../../../lib/types';

// // assert JSON as Recipe[]
// const recipesData = recipesDataRaw as Recipe[];

// export default function RecipeDetailPage() {
//   const { id } = useParams() as { id: string };
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const found = recipesData.find(r => r.id === id) || null;
//     setRecipe(found);

//     const savedRecipes: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     if (savedRecipes.includes(id)) setSaved(true);
//   }, [id]);

//   const handleSave = () => {
//     const savedRecipes: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     if (!savedRecipes.includes(id)) savedRecipes.push(id);
//     localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
//     setSaved(true);
//   };

//   if (!recipe) return <p className="container">Recipe not found.</p>;

//   return (
//     <div className="container">
//       <h1>{recipe.title}</h1>

//       {recipe.image && (
//         <Image
//           src={recipe.image}
//           alt={recipe.title}
//           width={400}
//           height={250}
//           style={{ borderRadius: '8px', margin: '20px 0' }}
//         />
//       )}

//       <p><strong>Category:</strong> {recipe.category || 'N/A'}</p>
//       <p><strong>Difficulty:</strong> {recipe.difficulty || 'N/A'}</p>
//       <p><strong>Cooking Time:</strong> {recipe.cookTime || 'N/A'} minutes</p>
//       <p><strong>Calories:</strong> {recipe.calories || 'N/A'}</p>

//       <h3>Ingredients:</h3>
//       <ul>
//         {recipe.ingredients?.map((ing, idx) => (
//           <li key={idx}>{ing}</li>
//         ))}
//       </ul>

//       <h3>Steps:</h3>
//       <ol>
//         {recipe.steps?.map((step, idx) => (
//           <li key={idx}>{step}</li>
//         ))}
//       </ol>

//       {!saved ? (
//         <button className="button" onClick={handleSave}>Save Recipe</button>
//       ) : (
//         <p>Recipe saved!</p>
//       )}
//     </div>
//   );
// }

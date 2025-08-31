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

    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const savedRecipes: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
    if (savedRecipes.includes(id)) setSaved(true);
  }, [id]);

  const handleSave = () => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const savedRecipes: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

    if (!savedRecipes.includes(id)) {
      savedRecipes.push(id);
      localStorage.setItem(savedKey, JSON.stringify(savedRecipes));
      setSaved(true);
      alert('Recipe saved!');
    } else {
      alert('Recipe already saved!');
    }
  };

  if (!recipe) return <p className="container">Recipe not found.</p>;

  return (
    <div className="container">
      <h1>{recipe.title}</h1>
{recipe.image && (
  <img
    src={`/${recipe.image}`}
    alt={recipe.title || 'Recipe Image'}
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
        <button className="button mt-4" onClick={handleSave}>Save Recipe</button>
      ) : (
        <p className="mt-4">Recipe saved!</p>
      )}
    </div>
  );
}
























// 'use client';
// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import recipesData from '../../../data/recipes.json';
// import { Recipe } from '../../../lib/types';

// export default function RecipeDetailPage() {
//   const { id } = useParams() as { id: string };
//   const [recipe, setRecipe] = useState<Recipe | null>(null);

//   useEffect(() => {
//     const found = (recipesData as Recipe[]).find(r => r.id === id) || null;
//     setRecipe(found);
//   }, [id]);

//   if (!recipe) return <p className="container">Recipe not found.</p>;

//   return (
//     <div className="container">
//       <h1>{recipe.title}</h1>

//       <p><strong>Category:</strong> {recipe.category}</p>
//       <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
//       <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
//       <p><strong>Calories:</strong> {recipe.calories}</p>

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
//     </div>
//   );
// }





























// 'use client';
// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import recipesData from '../../../data/recipes.json';
// import { Recipe } from '../../../lib/types';
// import Image from 'next/image';

// export default function RecipeDetailPage() {
//   const { id } = useParams() as { id: string };
//   const [recipe, setRecipe] = useState<Recipe | null>(null);

//   useEffect(() => {
//     const found = (recipesData as Recipe[]).find(r => r.id === id) || null;
//     setRecipe(found);
//   }, [id]);

//   if (!recipe) return <p className="container">Recipe not found.</p>;

//   return (
//     <div className="container">
//       <h1>{recipe.title}</h1>

//       {/* Show image only if recipe.image exists */}
//       {recipe.image && typeof recipe.image === 'string' && (
//         <Image
//           src={`/images/${recipe.image}`} // path relative to public/
//           alt={recipe.title}
//           width={600} // adjust width as needed
//           height={400} // adjust height
//           style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
//         />
//       )}

//       <p><strong>Category:</strong> {recipe.category}</p>
//       <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
//       <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
//       <p><strong>Calories:</strong> {recipe.calories}</p>

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
//     </div>
//   );
// }






















// 'use client';
// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import recipesData from '../../../data/recipes.json';
// import { Recipe } from '../../../lib/types';
// import Image from 'next/image';

// export default function RecipeDetailPage() {
//   const { id } = useParams() as { id: string };
//   const [recipe, setRecipe] = useState<Recipe | null>(null);

//   useEffect(() => {
//     const found = (recipesData as Recipe[]).find(r => r.id === id) || null;
//     setRecipe(found);
//   }, [id]);

//   if (!recipe) return <p className="container">Recipe not found.</p>;

//   return (
//     <div className="container">
//       <h1>{recipe.title}</h1>
//       {recipe.image && (
//   <Image
//     src={`/images/${recipe.image}`} // put your images in public/images/
//     alt={recipe.title}
//     width={400}  // adjust width
//     height={250} // adjust height
//     className="rounded mb-4 object-cover"
//   />
// )}
//       <p><strong>Category:</strong> {recipe.category}</p>
//       <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
//       <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
//       <p><strong>Calories:</strong> {recipe.calories}</p>

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
//     </div>
//   );
// }

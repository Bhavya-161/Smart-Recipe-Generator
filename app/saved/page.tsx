'use client';
import { useState, useEffect } from 'react';
import { Recipe } from '../../lib/types';
import recipesData from '../../data/recipes.json';
import Image from 'next/image';

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  // Load saved recipes per current user
  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

    const filtered = (recipesData as Recipe[]).filter(r => savedIds.includes(r.id));
    setSavedRecipes(filtered);
  }, []);

  const handleRemove = (id: string) => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;

    const updated = savedRecipes.filter(r => r.id !== id);
    setSavedRecipes(updated);

    const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
    localStorage.setItem(savedKey, JSON.stringify(savedIds.filter(savedId => savedId !== id)));
  };

  if (!savedRecipes.length)
    return <p className="container">No saved recipes yet. Go save some recipes first!</p>;

  return (
    <div className="container">
      <h1>Saved Recipes ({savedRecipes.length})</h1>

      <div className="grid">
        {savedRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>

{recipe.image && typeof recipe.image === 'string' && (
  

<Image
  src={recipe.image}
  alt="Recipe"
  width={200}
  height={200}
/>

)}




            <ul>
              {(recipe.ingredients || []).map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>

            <button className="button mt-2" onClick={() => handleRemove(recipe.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

















// 'use client';
// import { useState, useEffect } from 'react';
// import { Recipe } from '../../lib/types';
// import recipesData from '../../data/recipes.json';

// export default function SavedPage() {
//   const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

//   // Load saved recipes per user
//   useEffect(() => {
//     const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//     const savedKey = `savedRecipes_${currentUserEmail}`;
//     const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//     const filtered = (recipesData as Recipe[]).filter(r => savedIds.includes(r.id));
//     setSavedRecipes(filtered);
//   }, []);

//   const handleRemove = (id: string) => {
//     const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//     const savedKey = `savedRecipes_${currentUserEmail}`;

//     const updated = savedRecipes.filter(r => r.id !== id);
//     setSavedRecipes(updated);

//     const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//     localStorage.setItem(savedKey, JSON.stringify(savedIds.filter(savedId => savedId !== id)));
//   };

//   if (!savedRecipes.length)
//     return <p className="container">No saved recipes yet. Go save some recipes first!</p>;

//   return (
//     <div className="container">
//       <h1>Saved Recipes ({savedRecipes.length})</h1>

//       <div className="grid">
//         {savedRecipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h2>{recipe.title}</h2>
//             <p>{recipe.description}</p>

//             {recipe.image && (
//               <img
//                 src={recipe.image.startsWith('/images/') ? recipe.image : `/images/${recipe.image}`}
//                 alt={recipe.title}
//                 className="w-full h-48 object-cover rounded mb-3"
//               />
//             )}

//             <ul>
//               {(recipe.ingredients || []).map((ing, idx) => (
//                 <li key={idx}>{ing}</li>
//               ))}
//             </ul>

//             <button className="button mt-2" onClick={() => handleRemove(recipe.id)}>
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





























// 'use client';
// import { useState, useEffect } from 'react';
// import { Recipe } from '../../lib/types';
// import recipesData from '../../data/recipes.json';

// const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
// const savedKey = `savedRecipes_${currentUserEmail}`;



// export default function SavedPage() {
//   const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);


//   useEffect(() => {
//   const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//   const filtered = (recipesData as Recipe[]).filter(r => savedIds.includes(r.id));
//   setSavedRecipes(filtered);
// }, [savedKey]);


//   // useEffect(() => {
//   //   const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//   //   const filtered = (recipesData as Recipe[]).filter(r => savedIds.includes(r.id));
//   //   setSavedRecipes(filtered);
//   // }, []);



//   const handleRemove = (id: string) => {
//   const updated = savedRecipes.filter(r => r.id !== id);
//   setSavedRecipes(updated);

//   const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//   localStorage.setItem(savedKey, JSON.stringify(savedIds.filter(savedId => savedId !== id)));
// };


//   // const handleRemove = (id: string) => {
//   //   const updated = savedRecipes.filter(r => r.id !== id);
//   //   setSavedRecipes(updated);

//   //   const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//   //   localStorage.setItem('savedRecipes', JSON.stringify(savedIds.filter(savedId => savedId !== id)));
//   // };

//   if (!savedRecipes.length)
//     return <p className="container">No saved recipes yet. Go save some recipes first!</p>;

//   return (
//     <div className="container">
//       <h1>Saved Recipes ({savedRecipes.length})</h1>

//       <div className="grid">
//         {savedRecipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h2>{recipe.title}</h2>
//             <p>{recipe.description}</p>
//             <ul>
//               {(recipe.ingredients || []).map((ing, idx) => (
//                 <li key={idx}>{ing}</li>
//               ))}
//             </ul>
//             <button
//               className="button mt-2"
//               onClick={() => handleRemove(recipe.id)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






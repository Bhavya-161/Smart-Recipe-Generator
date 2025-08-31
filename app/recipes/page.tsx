'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import recipesData from '../../data/recipes.json';
import Filters from '../../components/Filters';
import { Recipe } from '../../lib/types';

export default function RecipesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Load saved recipes per current user
  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const ids: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
    setSavedIds(ids);
  }, []);

  const handleSave = (id: string) => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const saved: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

    if (!saved.includes(id)) {
      const updated = [...saved, id];
      localStorage.setItem(savedKey, JSON.stringify(updated));
      setSavedIds(updated);
      alert('Recipe saved!');
    } else {
      alert('Recipe already saved!');
    }
  };

  const recipes: Recipe[] = recipesData as Recipe[];
  const filteredRecipes: Recipe[] =
    filter === 'All'
      ? recipes
      : recipes.filter(r => r.category?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="container">
      <h1>Recipes</h1>
      <Filters onFilterChange={setFilter} />

      <div className="grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>

            {recipe.image && (
              <img
                src={recipe.image.startsWith('/images/') ? recipe.image : `/images/${recipe.image}`}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <div className="flex mt-3">
              <button className="button mr-3" onClick={() => handleSave(recipe.id)}>
                {savedIds.includes(recipe.id) ? 'Saved' : 'Save Recipe'}
              </button>
              <button className="button" onClick={() => router.push(`/explore/${recipe.id}`)}>
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && <p>No recipes found for {filter}</p>}
    </div>
  );
}






































// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import recipesData from '../../data/recipes.json';
// import Filters from '../../components/Filters';
// import { Recipe } from '../../lib/types';

// export default function RecipesPage() {
//   const router = useRouter();
//   const [filter, setFilter] = useState('All');
//   const [savedIds, setSavedIds] = useState<string[]>([]);

//   // Load saved recipes per user
//   useEffect(() => {
//     const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//     const savedKey = `savedRecipes_${currentUserEmail}`;
//     const ids: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//     setSavedIds(ids);
//   }, []);

//   const handleSave = (id: string) => {
//     const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//     const savedKey = `savedRecipes_${currentUserEmail}`;
//     const saved: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

//     if (!saved.includes(id)) {
//       const updated = [...saved, id];
//       localStorage.setItem(savedKey, JSON.stringify(updated));
//       setSavedIds(updated);
//       alert('Recipe saved!');
//     } else {
//       alert('Recipe already saved!');
//     }
//   };

//   const recipes: Recipe[] = recipesData as Recipe[];
//   const filteredRecipes: Recipe[] =
//     filter === 'All'
//       ? recipes
//       : recipes.filter(r => r.category?.toLowerCase() === filter.toLowerCase());

//   return (
//     <div className="container">
//       <h1>Recipes</h1>
//       <Filters onFilterChange={setFilter} />

//       <div className="grid">
//         {filteredRecipes.map(recipe => (
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

//             <div className="flex mt-3">
//               <button className="button mr-3" onClick={() => handleSave(recipe.id)}>
//                 {savedIds.includes(recipe.id) ? 'Saved' : 'Save Recipe'}
//               </button>

//               <button
//                 className="button"
//                 onClick={() => router.push(`/explore/${recipe.id}`)}
//               >
//                 View Recipe
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredRecipes.length === 0 && <p>No recipes found for {filter}</p>}
//     </div>
//   );
// }































// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import recipesData from '../../data/recipes.json';
// import Filters from '../../components/Filters';
// import { Recipe } from '../../lib/types';




// // Get current logged-in user email
// const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
// const savedKey = `savedRecipes_${currentUserEmail}`;


// export default function RecipesPage() {
//   const router = useRouter();
//   const [filter, setFilter] = useState('All');
//   const [savedIds, setSavedIds] = useState<string[]>([]);


//   useEffect(() => {
//   const ids: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//   setSavedIds(ids);
// }, [savedKey]);


//   // Load saved recipes from localStorage
//   // useEffect(() => {
//   //   const ids: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//   //   setSavedIds(ids);
//   // }, []);

// const handleSave = (id: string) => {
//   const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//   if (!savedIds.includes(id)) {
//     const updated = [...savedIds, id];
//     localStorage.setItem(savedKey, JSON.stringify(updated));
//     setSavedIds(updated);
//     alert('Recipe saved!');
//   } else {
//     alert('Recipe already saved!');
//   }
// };






//   // const handleSave = (id: string) => {
//   //   if (!savedIds.includes(id)) {
//   //     const updated = [...savedIds, id];
//   //     setSavedIds(updated);
//   //     localStorage.setItem('savedRecipes', JSON.stringify(updated));
//   //     alert('Recipe saved!');
//   //   } else {
//   //     alert('Recipe already saved!');
//   //   }
//   // };

//   const recipes: Recipe[] = recipesData as Recipe[];

//   const filteredRecipes: Recipe[] =
//     filter === 'All'
//       ? recipes
//       : recipes.filter(r => r.category?.toLowerCase() === filter.toLowerCase());

//   return (
//     <div className="container">
//       <h1>Recipes</h1>
//       <Filters onFilterChange={setFilter} />

//       <div className="grid">
//         {filteredRecipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h2>{recipe.title}</h2>
//             <p>{recipe.description}</p>

//             {/* Display image */}
//           {recipe.image ? (
//   <img
//     src={recipe.image.startsWith?.('/images/') ? recipe.image : `/images/${recipe.image}`}
//     alt={recipe.title}
//     className="w-full h-48 object-cover rounded mb-3"
//   />
// ) : null}


//             <div className="flex mt-3">
//               <button
//                 className="button mr-3"
//                 onClick={() => handleSave(recipe.id)}
//               >
//                 {savedIds.includes(recipe.id) ? 'Saved' : 'Save Recipe'}
//               </button>
//               <button
//                 className="button"
//                 onClick={() => router.push(`/explore/${recipe.id}`)} // Navigate to Recipe Detail page
//               >
//                 View Recipe
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredRecipes.length === 0 && <p>No recipes found for {filter}</p>}
//     </div>
//   );
// }


















'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';
import RecipeGrid from '../components/RecipeGrid';
import recipesData from '../data/recipes.json';
import { Recipe } from '../lib/types';
import { suggestSubstitutions } from '../lib/substitutions';

export default function HomePage() {
  const [diet, setDiet] = useState('All');
  const [calorie, setCalorie] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [timeLimit, setTimeLimit] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [ingredients, setIngredients] = useState<string>('');
  const [savedCount, setSavedCount] = useState<number>(0);

  // Load saved recipes per user on client-side
  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
    setSavedCount(savedIds.length);
  }, []);

  const handleImageDetected = (_base64: string | null, detectedIngredients?: string[]) => {
    if (Array.isArray(detectedIngredients) && detectedIngredients.length > 0) {
      setIngredients(detectedIngredients.join(', '));
      setResults([]);
      setShowResults(false);
    }
  };

  const handleFindRecipe = () => {
    if (!ingredients.trim()) {
      alert('Please enter ingredients or upload an image first!');
      setResults([]);
      setShowResults(false);
      return;
    }

    const ingList = ingredients.toLowerCase().split(',').map(i => i.trim());
    let filtered = (recipesData as Recipe[])
      .map(r => {
        const recipeIngs = r.ingredients?.map(i => i.toLowerCase()) || [];
        const missing = recipeIngs.filter(i => !ingList.includes(i));
        const substitutions = suggestSubstitutions(missing);
        return { ...r, matchCount: recipeIngs.length - missing.length, missingIngredients: missing, substitutions };
      })
      .filter(r => r.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    if (diet !== 'All') filtered = filtered.filter(r => r.category === diet);
    if (difficulty !== 'All') filtered = filtered.filter(r => r.difficulty === difficulty);
    if (calorie.trim()) filtered = filtered.filter(r => r.calories !== undefined && r.calories <= Number(calorie));
if (timeLimit.trim()) {
  filtered = filtered.filter(r => (r.time as number) !== undefined && (r.time as number) <= Number(timeLimit));
}



    setResults(filtered);
    setShowResults(true);
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
    const savedKey = `savedRecipes_${currentUserEmail}`;
    const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

    if (!savedIds.includes(recipe.id)) {
      savedIds.push(recipe.id);
      localStorage.setItem(savedKey, JSON.stringify(savedIds));
      alert('Recipe saved!');
      setSavedCount(savedIds.length);
    } else {
      alert('Recipe already saved!');
    }
  };

  return (
    <div className="container">
      <h1>Smart Recipe Generator</h1>

      <div className="grid" style={{ marginBottom: '30px' }}>
        {/* Ingredients Input */}
        <div className="recipe-card">
          <h2>Enter Ingredients</h2>
          <input
            type="text"
            className="input"
            placeholder="e.g., Tomato, Cheese"
            value={ingredients}
            onChange={e => { setIngredients(e.target.value); setResults([]); setShowResults(false); }}
          />
        </div>

        {/* Image Upload */}
        <div className="recipe-card">
          <h2>Upload an Image</h2>
          <ImageUpload onImageChange={handleImageDetected} />
        </div>

        {/* My Recipes */}
        <div className="recipe-card">
          <h2>My Recipes</h2>
          <p>View your saved recipes here.</p>
          <Link href="/saved">
            <button className="button">
              Saved Recipes ({savedCount})
            </button>
          </Link>
        </div>
      </div>

      {/* Recipe Filters */}
      <div className="recipe-card">
        <h2>Get Your Recipe</h2>

        <select className="input" value={diet} onChange={e => setDiet(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Dessert">Dessert</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Keto">Keto</option>
          <option value="Vegan">Vegan</option>
          <option value="Juices">Juices</option>
          <option value="Junk Foods">Junk Foods</option>
        </select>

        <select className="input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="number"
          className="input"
          placeholder="Max Calories"
          value={calorie}
          onChange={e => setCalorie(e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Max Cooking Time (minutes)"
          value={timeLimit}
          onChange={e => setTimeLimit(e.target.value)}
        />

        <button className="button" onClick={handleFindRecipe}>Find Recipe</button>
      </div>

      {/* Recipe Results */}
      {showResults && (
        <RecipeGrid
          recipes={results}
          onSave={handleSaveRecipe}
          savedIds={JSON.parse(localStorage.getItem(`savedRecipes_${localStorage.getItem('currentUserEmail') || 'guest'}`) || '[]')}
        />
      )}
    </div>
  );
}




// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import ImageUpload from '../components/ImageUpload';
// import RecipeGrid from '../components/RecipeGrid';
// import recipesData from '../data/recipes.json';
// import { Recipe } from '../lib/types';
// import { suggestSubstitutions } from '../lib/substitutions';

// export default function HomePage() {
//   const [diet, setDiet] = useState('All');
//   const [calorie, setCalorie] = useState('');
//   const [difficulty, setDifficulty] = useState('All');
//   const [timeLimit, setTimeLimit] = useState('');
//   const [results, setResults] = useState<Recipe[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [ingredients, setIngredients] = useState<string>('');
//   const [savedCount, setSavedCount] = useState<number>(0);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//       const savedKey = `savedRecipes_${currentUserEmail}`;
//       const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
//       setSavedCount(savedIds.length);
//     }
//   }, []);

//   const handleImageDetected = (_base64: string | null, detectedIngredients?: string[]) => {
//     if (Array.isArray(detectedIngredients) && detectedIngredients.length > 0) {
//       setIngredients(detectedIngredients.join(', '));
//       setResults([]);
//       setShowResults(false);
//     }
//   };

//   const handleFindRecipe = () => {
//     if (!ingredients.trim()) {
//       alert('Please enter ingredients or upload an image first!');
//       setResults([]);
//       setShowResults(false);
//       return;
//     }

//     const ingList = ingredients.toLowerCase().split(',').map(i => i.trim());
//     let filtered = (recipesData as Recipe[])
//       .map(r => {
//         const recipeIngs = r.ingredients?.map(i => i.toLowerCase()) || [];
//         const missing = recipeIngs.filter(i => !ingList.includes(i));
//         const substitutions = suggestSubstitutions(missing);
//         return { ...r, matchCount: recipeIngs.length - missing.length, missingIngredients: missing, substitutions };
//       })
//       .filter(r => r.matchCount > 0)
//       .sort((a, b) => b.matchCount - a.matchCount);

//     if (diet !== 'All') filtered = filtered.filter(r => r.category === diet);
//     if (difficulty !== 'All') filtered = filtered.filter(r => r.difficulty === difficulty);
//     if (calorie.trim()) filtered = filtered.filter(r => r.calories !== undefined && r.calories <= Number(calorie));
//     if (timeLimit.trim()) filtered = filtered.filter(r => r.time !== undefined && r.time <= Number(timeLimit));

//     setResults(filtered);
//     setShowResults(true);
//   };

//   const handleSaveRecipe = (recipe: Recipe) => {
//     const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
//     const savedKey = `savedRecipes_${currentUserEmail}`;
//     const savedIds: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

//     if (!savedIds.includes(recipe.id)) {
//       savedIds.push(recipe.id);
//       localStorage.setItem(savedKey, JSON.stringify(savedIds));
//       setSavedCount(savedIds.length);
//       alert('Recipe saved!');
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Smart Recipe Generator</h1>

//       <div className="grid" style={{ marginBottom: '30px' }}>
//         <div className="recipe-card">
//           <h2>Enter Ingredients</h2>
//           <input
//             type="text"
//             className="input"
//             placeholder="e.g., Tomato, Cheese"
//             value={ingredients}
//             onChange={e => { setIngredients(e.target.value); setResults([]); setShowResults(false); }}
//           />
//         </div>

//         <div className="recipe-card">
//           <h2>Upload an Image</h2>
//           <ImageUpload onImageChange={handleImageDetected} />
//         </div>

//         <div className="recipe-card">
//           <h2>My Recipes</h2>
//           <p>View your saved recipes here.</p>
//           <Link href="/saved">
//             <button className="button">
//               Saved Recipes ({savedCount})
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="recipe-card">
//         <h2>Get Your Recipe</h2>

//         <select className="input" value={diet} onChange={e => setDiet(e.target.value)}>
//           <option value="All">All Categories</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Dessert">Dessert</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//           <option value="Keto">Keto</option>
//           <option value="Vegan">Vegan</option>
//           <option value="Juices">Juices</option>
//           <option value="Junk Foods">Junk Foods</option>
//         </select>

//         <select className="input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
//           <option value="All">All Difficulties</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>

//         <input
//           type="number"
//           className="input"
//           placeholder="Max Calories"
//           value={calorie}
//           onChange={e => setCalorie(e.target.value)}
//         />
//         <input
//           type="number"
//           className="input"
//           placeholder="Max Cooking Time (minutes)"
//           value={timeLimit}
//           onChange={e => setTimeLimit(e.target.value)}
//         />

//         <button className="button" onClick={handleFindRecipe}>Find Recipe</button>
//       </div>

//       {showResults && (
//         <RecipeGrid
//           recipes={results}
//           onSave={handleSaveRecipe}
//           savedIds={JSON.parse(localStorage.getItem(`savedRecipes_${localStorage.getItem('currentUserEmail') || 'guest'}`) || '[]')}
//         />
//       )}
//     </div>
//   );
// }





// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import ImageUpload from '../components/ImageUpload';
// import RecipeGrid from '../components/RecipeGrid';
// import recipesData from '../data/recipes.json';
// import { Recipe } from '../lib/types';
// import { suggestSubstitutions } from '../lib/substitutions';

// export default function HomePage() {
//   const [diet, setDiet] = useState('All');
//   const [calorie, setCalorie] = useState('');
//   const [difficulty, setDifficulty] = useState('All');
//   const [timeLimit, setTimeLimit] = useState('');
//   const [results, setResults] = useState<Recipe[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [ingredients, setIngredients] = useState<string>('');
//   const [savedCount, setSavedCount] = useState<number>(
//     JSON.parse(localStorage.getItem('savedRecipes') || '[]').length
//   );

//   const handleImageDetected = (_base64: string | null, detectedIngredients?: string[]) => {
//     if (Array.isArray(detectedIngredients) && detectedIngredients.length > 0) {
//       setIngredients(detectedIngredients.join(', '));
//       setResults([]);
//       setShowResults(false);
//     }
//   };

//   const handleFindRecipe = () => {
//     if (!ingredients.trim()) {
//       alert('Please enter ingredients or upload an image first!');
//       setResults([]);
//       setShowResults(false);
//       return;
//     }

//     const ingList = ingredients.toLowerCase().split(',').map(i => i.trim());
//     let filtered = (recipesData as Recipe[])
//       .map(r => {
//         const recipeIngs = r.ingredients?.map(i => i.toLowerCase()) || [];
//         const missing = recipeIngs.filter(i => !ingList.includes(i));
//         const substitutions = suggestSubstitutions(missing);
//         return { ...r, matchCount: recipeIngs.length - missing.length, missingIngredients: missing, substitutions };
//       })
//       .filter(r => r.matchCount > 0)
//       .sort((a, b) => b.matchCount - a.matchCount);

//     if (diet !== 'All') filtered = filtered.filter(r => r.category === diet);
//     if (difficulty !== 'All') filtered = filtered.filter(r => r.difficulty === difficulty);
//     if (calorie.trim()) filtered = filtered.filter(r => r.calories !== undefined && r.calories <= Number(calorie));
//     if (timeLimit.trim()) filtered = filtered.filter(r => r.cookTime !== undefined && r.cookTime <= Number(timeLimit));

//     setResults(filtered);
//     setShowResults(true);
//   };

//   const handleSaveRecipe = (recipe: Recipe) => {
//     const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     if (!savedIds.includes(recipe.id)) {
//       savedIds.push(recipe.id);
//       localStorage.setItem('savedRecipes', JSON.stringify(savedIds));
//       alert('Recipe saved!');
//       setSavedCount(savedIds.length);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Smart Recipe Generator</h1>

//       <div className="grid" style={{ marginBottom: '30px' }}>
//         {/* Ingredients Input */}
//         <div className="recipe-card">
//           <h2>Enter Ingredients</h2>
//           <input
//             type="text"
//             className="input"
//             placeholder="e.g., Tomato, Cheese"
//             value={ingredients}
//             onChange={e => { setIngredients(e.target.value); setResults([]); setShowResults(false); }}
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="recipe-card">
//           <h2>Upload an Image</h2>
//           <ImageUpload onImageChange={handleImageDetected} />
//         </div>

//         {/* My Recipes */}
//         <div className="recipe-card">
//           <h2>My Recipes</h2>
//           <p>View your saved recipes here.</p>
//           <Link href="/saved">
//             <button className="button">
//               Saved Recipes ({savedCount})
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Recipe Filters */}
//       <div className="recipe-card">
//         <h2>Get Your Recipe</h2>

//         <select className="input" value={diet} onChange={e => setDiet(e.target.value)}>
//           <option value="All">All Categories</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Dessert">Dessert</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//           <option value="Keto">Keto</option>
//           <option value="Vegan">Vegan</option>
//           <option value="Juices">Juices</option>
//           <option value="Junk Foods">Junk Foods</option>
//         </select>

//         <select className="input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
//           <option value="All">All Difficulties</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>

//         <input
//           type="number"
//           className="input"
//           placeholder="Max Calories"
//           value={calorie}
//           onChange={e => setCalorie(e.target.value)}
//         />
//         <input
//           type="number"
//           className="input"
//           placeholder="Max Cooking Time (minutes)"
//           value={timeLimit}
//           onChange={e => setTimeLimit(e.target.value)}
//         />

//         <button className="button" onClick={handleFindRecipe}>Find Recipe</button>
//       </div>

//       {/* Recipe Results */}
//       {showResults && (
//         <RecipeGrid
//           recipes={results}
//           onSave={handleSaveRecipe}
//           savedIds={JSON.parse(localStorage.getItem('savedRecipes') || '[]')}
//         />
//       )}
//     </div>
//   );
// }

















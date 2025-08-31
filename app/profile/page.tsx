'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    setUser(parsedUser);

    // Load existing profile data if saved
    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setName(profileData.name || parsedUser.name || '');
    setPassword(profileData.password || '');
    setAge(profileData.age || '');
    setGender(profileData.gender || '');
    setBio(profileData.bio || '');
  }, [router]);

  const handleUpdate = () => {
    const profile = { name, password, age, gender, bio };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="container">
      <h1>Welcome, {user.name || user.email}!</h1>

      <div className="profile-card">
        <label className="input-label">Name</label>
        <input
          type="text"
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label className="input-label">Age</label>
        <input
          type="number"
          className="input"
          value={age}
          onChange={e => setAge(e.target.value)}
        />

        <label className="input-label">Gender</label>
        <select
          className="input"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="input-label">Bio</label>
        <textarea
          className="input"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />

        <button className="button mt-4" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
}





























// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import RecipeGrid from '../../components/RecipeGrid';
// import recipesData from '../../data/recipes.json';
// import { Recipe } from '../../lib/types';

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
//   const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (!loggedInUser) {
//       router.push('/login');
//       return;
//     }
//     setUser(JSON.parse(loggedInUser));

//     const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     const allRecipes = recipesData as Recipe[];
//     const filtered = allRecipes.filter(r => savedIds.includes(r.id));
//     setSavedRecipes(filtered);
//   }, [router]);

//   const handleRemoveRecipe = (id: string) => {
//     const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     const updatedIds = savedIds.filter(rid => rid !== id);
//     localStorage.setItem('savedRecipes', JSON.stringify(updatedIds));
//     setSavedRecipes(prev => prev.filter(r => r.id !== id));
//   };

//   if (!user) return null;

//   return (
//     <div className="container">
//       <h1>Welcome, {user.name || user.email}!</h1>
//       <h2>Your Saved Recipes</h2>
//       {savedRecipes.length > 0 ? (
//         <RecipeGrid recipes={savedRecipes} onRemove={handleRemoveRecipe} savedIds={savedRecipes.map(r => r.id)} />
//       ) : (
//         <p>You have no saved recipes yet.</p>
//       )}
//     </div>
//   );
// }






// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import RecipeGrid from '../../components/RecipeGrid';



// import recipesData from '../../data/recipes.json';
// import { Recipe } from '../../lib/types';

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
//   const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

//   // Load saved recipes and user on mount
//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (!loggedInUser) {
//       router.push('/login'); // redirect if not logged in
//       return;
//     }
//     setUser(JSON.parse(loggedInUser));

//     loadSavedRecipes();
//   }, [router]);

//   const loadSavedRecipes = () => {
//     const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     const allRecipes = recipesData as Recipe[];
//     const filtered = allRecipes.filter((r) => savedIds.includes(r.id));
//     setSavedRecipes(filtered);
//   };

//   // Remove recipe from saved list
//   const handleRemoveRecipe = (id: string) => {
//     const savedIds: string[] = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
//     const updatedIds = savedIds.filter(savedId => savedId !== id);
//     localStorage.setItem('savedRecipes', JSON.stringify(updatedIds));
//     loadSavedRecipes(); // reload the saved recipes
//   };

//   if (!user) return null; // wait for user

//   return (
//     <div className="container">
//       <h1>Welcome, {user.name || user.email}!</h1>

//       <h2>Your Saved Recipes</h2>
//       {savedRecipes.length > 0 ? (
//         <div className="recipe-grid">
//           {savedRecipes.map(recipe => (
//             <div key={recipe.id} className="recipe-card">
//               <h3>{recipe.title}</h3>
//               {recipe.description && <p>{recipe.description}</p>}
//               {recipe.image && (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   style={{ maxWidth: '250px', borderRadius: '8px', marginTop: '10px' }}
//                 />
//               )}
//               <button
//                 className="button"
//                 style={{ marginTop: '10px' }}
//                 onClick={() => handleRemoveRecipe(recipe.id)}
//               >
//                 Remove Recipe
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>You have no saved recipes yet.</p>
//       )}
//     </div>
//   );
// }

Smart Recipe Generator

A Next.js + TypeScript full-stack application that allows users to find, save, and manage recipes based on ingredients or image uploads. Each user has their own saved recipes, and the app supports filtering by category, difficulty, calories, and cooking time.

Features

Ingredient-based Recipe Search: Enter ingredients to get matching recipes.

Image-based Detection: Upload an image of ingredients; the app detects them automatically.

Save Recipes: Each user has their own saved recipes stored in localStorage.

Filters:

Category (Vegetarian, Dessert, Non-Vegetarian, Keto, Vegan, Juices, Junk Foods)

Difficulty (Easy, Medium, Hard)

Max Calories

Max Cooking Time

Recipe Details: View detailed steps, ingredients, calories, cooking time, and category.

Per-User Login Simulation: Different users have separate saved recipe lists.

Minimal UI: Clean, responsive design with TailwindCSS.

Tech Stack

Frontend & Backend: Next.js (App Router, React 18)

TypeScript: Strong typing across components

State Management: React useState and useEffect

Styling: Tailwind CSS

Data: Local JSON file (recipes.json)

Persistence: Browser localStorage (per-user saved recipes)
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string; // <- must be optional
  ingredients?: string[];
  steps?: string[];
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  cookTime?: number;
  calories?: number;
  matchCount?: number;
  missingIngredients?: string[];
  substitutions?: Record<string, string[]>;
}


// /lib/substitutions.ts

// Mapping of ingredients to possible substitutes
export const substitutionMap: Record<string, string[]> = {
  butter: ["margarine", "coconut oil", "olive oil"],
  milk: ["almond milk", "soy milk", "oat milk"],
  egg: ["flax egg", "chia egg", "applesauce"],
  sugar: ["honey", "maple syrup", "agave syrup"],
  flour: ["almond flour", "oat flour", "whole wheat flour"],
  tomato: ["tomato paste", "sundried tomato", "red bell pepper"],
  cheese: ["vegan cheese", "nutritional yeast"],
  // Add more substitutions as needed
};

// Function to suggest substitutions for missing ingredients
export function suggestSubstitutions(missingIngredients: string[]): Record<string, string[]> {
  const suggestions: Record<string, string[]> = {};
  missingIngredients.forEach(ing => {
    const key = ing.toLowerCase();
    if (substitutionMap[key]) {
      suggestions[ing] = substitutionMap[key];
    }
  });
  return suggestions;
}

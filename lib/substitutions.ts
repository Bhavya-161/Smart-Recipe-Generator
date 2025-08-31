// lib/substitutions.ts
export const substitutions: Record<string, string[]> = {
  tomato: ['cherry tomato', 'sun-dried tomato'],
  cheese: ['mozzarella', 'cheddar', 'feta'],
  milk: ['almond milk', 'soy milk'],
  butter: ['margarine', 'coconut oil'],
  sugar: ['honey', 'maple syrup'],
  egg: ['flaxseed meal', 'chia seeds'],
};

// Function to get substitutions for missing ingredients
export function suggestSubstitutions(
  missingIngredients: string[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  missingIngredients.forEach(ing => {
    const lower = ing.toLowerCase();
    if (substitutions[lower]) {
      result[ing] = substitutions[lower];
    }
  });
  return result;
}

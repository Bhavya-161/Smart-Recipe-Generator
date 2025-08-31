'use client';

interface FiltersProps {
  onFilterChange: (value: string) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  return (
    <div className="filters">
      <button className="filter-btn" onClick={() => onFilterChange('All')}>All</button>
      <button className="filter-btn" onClick={() => onFilterChange('Vegetarian')}>Vegetarian</button>
      <button className="filter-btn" onClick={() => onFilterChange('Non-Vegetarian')}>Non-Vegetarian</button>
      <button className="filter-btn" onClick={() => onFilterChange('Dessert')}>Dessert</button>
      <button className="filter-btn" onClick={() => onFilterChange('Keto')}>Keto</button>
      <button className="filter-btn" onClick={() => onFilterChange('Juices')}>Juices</button>
      <button className="filter-btn" onClick={() => onFilterChange('Vegan')}>Vegan</button>
    </div>
  );
}

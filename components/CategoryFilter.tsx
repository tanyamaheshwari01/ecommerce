"use client";

interface Props {
  categories: string[]; 
  selected: string; 
  onChange: (value: string) => void; 
}

// CategoryFilter component
export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <select value={selected} onChange={e => onChange(e.target.value)}>
      <option value="">All Categories</option> 
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat} 
        </option>
      ))}
    </select>
  );
}

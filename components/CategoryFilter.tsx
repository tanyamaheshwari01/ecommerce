"use client";

interface Props {
  categories: string[]; 
  selected: string; 
  onChange: (value: string) => void; 
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <select 
      value={selected} 
      onChange={e => onChange(e.target.value)}
      style={{
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
        backgroundColor: "#fff",
        cursor: "pointer",
        outline: "none",
        minWidth: "160px"
      }}
    >
      <option value="">All Categories</option> 
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')} 
        </option>
      ))}
    </select>
  );
}
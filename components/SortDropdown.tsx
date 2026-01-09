"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}
//sort menu
export default function SortDropdown({ value, onChange }: Props) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Sort By</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="rating-desc">Rating: High → Low</option>
    </select>
  );
}

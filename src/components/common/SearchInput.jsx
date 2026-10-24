export default function SearchInput({ value, onChange, placeholder, label }) {
  return (
    <input
      className="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label ?? placeholder}
    />
  );
}

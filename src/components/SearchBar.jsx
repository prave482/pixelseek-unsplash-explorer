import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit }) {
  return <form className="search-form" onSubmit={(event) => { event.preventDefault(); onSubmit(value); }}>
    <Search size={20} aria-hidden="true" />
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search photos, places, ideas…" aria-label="Search photographs" />
    {value && <button className="icon-button" type="button" onClick={() => onChange('')} aria-label="Clear search"><X size={18} /></button>}
    <button className="search-button" type="submit">Search</button>
  </form>;
}

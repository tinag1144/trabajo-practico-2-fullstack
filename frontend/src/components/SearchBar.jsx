const SearchBar = ({ onSearch }) => {
  return (
    <input
      className="card"
      placeholder="Buscar materia..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
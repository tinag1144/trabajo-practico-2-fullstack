import { useRoutineContext } from "../context/useRoutineContext";

const SearchBar = () => {

   const { handleSearch } = useRoutineContext(); 
  return (
    <input
      className="card"
      placeholder="🔍 Buscar materia..."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};
export default SearchBar;
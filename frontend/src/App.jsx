import { useEffect, useState } from "react";
import RoutineForm from "./components/RoutineForm";
import RoutineList from "./components/RoutineList";
import SearchBar from "./components/SearchBar";
import "./index.css";

const API = "http://localhost:3000/api/routines";

function App() {
  const [routines, setRoutines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRoutines = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setRoutines(data);
      setFiltered(data);
      setError(null);
    } catch (err) { // Definido correctamente aquí
      setError("Error al cargar las rutinas 💔");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  const createRoutine = async (routine) => {
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routine),
      });
      await getRoutines();
    } catch (err) { // Definido correctamente aquí
      console.error("Error al crear:", err);
    }
  };

  const deleteRoutine = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await getRoutines();
    } catch (err) { // Definido correctamente aquí
      console.error("Error al eliminar:", err);
    }
  };

  const updateRoutine = async (id, data) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await getRoutines();
    } catch (err) { // Definido correctamente aquí
      console.error("Error al actualizar:", err);
    }
  };

  const handleSearch = (text) => {
    const result = routines.filter((r) =>
      r.subject.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="container">
      <h1 className="title">🎀 Study Planner 🎀</h1>
      <SearchBar onSearch={handleSearch} />
      <RoutineForm onCreate={createRoutine} />

      {loading && <p className="status-msg">Cargando...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && filtered.length === 0 && (
        <p className="empty">No hay rutinas todavía 💭</p>
      )}

      <RoutineList
        routines={filtered}
        onDelete={deleteRoutine}
        onUpdate={updateRoutine}
      />
    </div>
  );
}

export default App;
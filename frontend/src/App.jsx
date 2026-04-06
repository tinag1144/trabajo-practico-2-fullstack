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
    } catch {
      setError("Error al cargar 💔");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  const createRoutine = async (routine) => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routine),
    });
    getRoutines();
  };

  const deleteRoutine = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getRoutines();
  };

  const updateRoutine = async (id, data) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    getRoutines();
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

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}


    {filtered.length === 0 && !loading && (
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
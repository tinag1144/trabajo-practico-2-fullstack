import RoutineForm from "./components/RoutineForm";
import RoutineList from "./components/RoutineList";
import SearchBar from "./components/SearchBar";
import { useMemo } from "react";
import "./index.css";

import { useRoutineContext } from "./context/useRoutineContext";

function App() {

  // traigo desde context el estado global
  const { loading, error, filtered } = useRoutineContext();

  return (
    <div className="container">
      <h1 className="title">🎀 Study Planner 🎀</h1>

      <SearchBar />
      <RoutineForm />

      {/* si está cargando muestro mensaje */}
      {loading && (
        <p className="status-msg">
          Cargando...
        </p>
      )}

      {/* si hay error lo muestro */}
      {error && (
        <p className="error-msg">
          {error}
        </p>
      )}

      {/* si no hay rutinas también aviso */}
      {!loading && filtered.length === 0 && (
        <p className="empty">
          No hay rutinas todavía
        </p>
      )}

      <RoutineList />
    </div>
  );
}

export default App;
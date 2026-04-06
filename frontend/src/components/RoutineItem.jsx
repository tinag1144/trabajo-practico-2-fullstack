import { useState } from "react";

const RoutineItem = ({ routine, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newSubject, setNewSubject] = useState(routine.subject);

  const handleUpdate = () => {
    onUpdate(routine.id, {
      ...routine,
      subject: newSubject,
    });
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <div className="row">
            <button className="btn-primary" onClick={handleUpdate}>
              Guardar
            </button>
            <button
              className="btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{routine.subject}</h3>
          <p>⏱ {routine.hours} hs</p>
          <p>⭐ {routine.priority || "sin prioridad"}</p>

          <div className="row">
            <button
              className="btn-secondary"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>

            <button
              className="btn-danger"
              onClick={() => onDelete(routine.id)}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoutineItem;
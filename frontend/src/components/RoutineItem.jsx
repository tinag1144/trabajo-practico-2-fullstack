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
          <button onClick={handleUpdate}>Guardar 💖</button>
        </>
      ) : (
        <>
          <h3>{routine.subject}</h3>
          <p>⏱ {routine.hours} horas</p>
          <p>⭐ {routine.priority}</p>

          <button onClick={() => setEditing(true)}>Editar</button>
          <button onClick={() => onDelete(routine.id)}>Eliminar</button>
        </>
      )}
    </div>
  );
};

export default RoutineItem;
import { useState } from "react";
import { useRoutineContext } from "../context/useRoutineContext";

const RoutineItem = ({ routine }) => {
   const { deleteRoutine, updateRoutine } = useRoutineContext();

  const [editing, setEditing] = useState(false);

  const [editData, setEditData] = useState({
    subject: routine.subject,
    hours: routine.hours,
    priority: routine.priority
  });

  const handleUpdate = () => {

    // mando al backend los datos actualizados
    updateRoutine(routine.id, {
      ...editData,
      hours: Number(editData.hours)
    });

    setEditing(false);
  };


  return (
    <div className={`card item-card priority-${routine.priority}`}>
      {editing ? (
        <div className="edit-mode">
          <input
            value={editData.subject}
            onChange={(e) => setEditData({...editData, subject: e.target.value})}
          />
          <div className="row">
            <input
              type="number"
              value={editData.hours}
              onChange={(e) => setEditData({...editData, hours: e.target.value})}
            />
            <select 
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
          <div className="row">
            <button className="btn-primary" onClick={handleUpdate}>Guardar</button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div className="info">
            <h3>{routine.subject}</h3>
            <div className="badges">
              <span>⏱ {routine.hours} hs</span>
              <span className="tag">⭐ {routine.priority || "sin prioridad"}</span>
            </div>
          </div>

          <div className="row">
            <button className="btn-secondary" onClick={() => setEditing(true)}>Editar</button>
            <button className="btn-danger" onClick={() => deleteRoutine(routine.id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoutineItem;
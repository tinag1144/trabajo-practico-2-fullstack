import { useState } from "react";
import { useRoutineContext } from "../context/useRoutineContext";

const RoutineForm = () => {

   // sigo usando useState porque esto es estado LOCAL del formulario
  // solo guarda temporalmente lo que el usuario escribe
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [priority, setPriority] = useState("");

  // ahora traigo createRoutine desde el context global
  const { createRoutine } = useRoutineContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple antes de enviar
    if (!subject || !hours || !priority) return;

    // ahora en vez de llamar props
    // llamo directamente la función global
    createRoutine({
      subject,
      hours: Number(hours),
      priority,
    });

    // limpio formulario después de guardar 
    setSubject("");
    setHours("");
    setPriority("");
  };

  return (
    <form className="card form-container" onSubmit={handleSubmit}>
      <div className="row">
        <input
          placeholder="Materia"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Horas"
          min="1"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
      </div>

      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        required
      >
        <option value="" disabled>Seleccionar Prioridad</option>
        <option value="alta">Alta ⭐</option>
        <option value="media">Media 📈</option>
        <option value="baja">Baja ☕</option>
      </select>

      <button className="btn-primary" type="submit">
        + Agregar rutina
      </button>
    </form>
  );
};

export default RoutineForm;
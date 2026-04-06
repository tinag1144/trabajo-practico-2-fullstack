import { useState } from "react";

const RoutineForm = ({ onCreate }) => {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple antes de enviar
    if (!subject || !hours || !priority) return;

    onCreate({
      subject,
      hours: Number(hours),
      priority,
    });

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
import { useState } from "react";

const RoutineForm = ({ onCreate }) => {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <form className="card" onSubmit={handleSubmit}>
      <input
        placeholder="Materia"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="number"
        placeholder="Horas"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        placeholder="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <button type="submit">Agregar 💕</button>
    </form>
  );
};

export default RoutineForm;
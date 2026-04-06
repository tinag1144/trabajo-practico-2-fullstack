import RoutineItem from "./RoutineItem";

const RoutineList = ({ routines, onDelete, onUpdate }) => {
  return (
    <div>
      {routines.map((r) => (
        <RoutineItem
          key={r.id}
          routine={r}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default RoutineList;
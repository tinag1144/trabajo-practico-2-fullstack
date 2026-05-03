import RoutineItem from "./RoutineItem";
import { useRoutineContext } from "../context/useRoutineContext";

const RoutineList = () => {
  // traigo las rutinas filtradas desde el estado global
  const { filtered } = useRoutineContext();


  return (
    <div>
       {/* recorro las rutinas filtradas */}
      {filtered.map((r) => (
        <RoutineItem
          key={r.id}
          routine={r}
        />
      ))}
    </div>
  );
};

export default RoutineList;
import { useContext } from "react";
import RoutineContext from "./RoutineContext";

// hago esto para no repetir useContext en todos lados
export const useRoutineContext = () => {
  return useContext(RoutineContext);
};
import { useContext } from "react";
import RoutineContext from "./RoutineContext";

export const useRoutineContext = () => {
  return useContext(RoutineContext);
};
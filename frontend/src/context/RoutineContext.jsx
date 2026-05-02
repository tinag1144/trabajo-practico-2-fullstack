import { createContext, useReducer } from "react";
import { routineReducer } from "./routineReducer";

// creo el contexto global
const RoutineContext = createContext();

const initialState = {
  routines: []
};

export const RoutineProvider = ({ children }) => {

  // reemplaza al useState cuando tengo varias acciones
  const [state, dispatch] = useReducer(
    routineReducer,
    initialState
  );

  return (
    <RoutineContext.Provider value={{ state, dispatch }}>
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineContext;


//acá lo que hago es crear el "contendedor global", se supone que antes las rutinas vivian en el App con el useState, ahora van a vivir acá 

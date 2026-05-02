import { createContext, useEffect, useReducer } from "react";
import { routineReducer } from "./routineReducer";

// creo el contexto global
const RoutineContext = createContext();

const API = "http://localhost:3000/api/routines";

const initialState = {
  routines: [],
  filtered: [],
  loading: false,
  error: null
};

export const RoutineProvider = ({ children }) => {

  // reemplaza al useState cuando tengo varias acciones
  const [state, dispatch] = useReducer(
    routineReducer,
    initialState
  );

// trae todas las rutinas desde el backend
  const getRoutines = async () => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(API);
      const data = await res.json();

      dispatch({
        type: "GET_ROUTINES",
        payload: data
      });

    } catch (error) {
        console.error(error);
        
      dispatch({
        type: "SET_ERROR",
        payload: "Error al cargar rutinas"

      });
    }
  };

  // apenas carga la app trae las rutinas
  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <RoutineContext.Provider
      value={{
        ...state,
        getRoutines
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineContext;


//acá lo que hago es crear el "contendedor global", se supone que antes las rutinas vivian en el App con el useState, ahora van a vivir acá 

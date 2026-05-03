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

  const createRoutine = async (routine) => {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(routine)
    });

    // vuelvo a pedir datos actualizados
    getRoutines();

  } catch (error) {
    console.log(error);
  }
};

const deleteRoutine = async (id) => {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

     // si backend devuelve error corto acá
    if (!res.ok) {
      throw new Error("Error al eliminar rutina");
    }

    // recién si salió bien vuelvo a cargar
    await getRoutines();

  } catch (error) {
    console.log(error);
  }
};

const updateRoutine = async (id, data) => {
  try {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    getRoutines();

  } catch (error) {
    console.log(error);
  }
};

const handleSearch = (text) => {
  dispatch({
    type: "SEARCH_ROUTINE",
    payload: text
  });
};

  // apenas carga la app trae las rutinas
  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <RoutineContext.Provider
      value={{
        ...state,
        getRoutines,
        createRoutine,
        deleteRoutine,
        updateRoutine,
        handleSearch
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineContext;


//acá lo que hago es crear el "contendedor global", se supone que antes las rutinas vivian en el App con el useState, ahora van a vivir acá 

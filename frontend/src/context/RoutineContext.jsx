import { createContext, useEffect, useReducer, useCallback } from "react";
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

  // useCallback evita que esta función se cree otra vez
// cada vez que el componente renderiza
const getRoutines = useCallback(async () => {
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
  }, []);


 // useCallback guarda esta función en memoria
// así no se vuelve a crear en cada render
const createRoutine = useCallback(async (routine) => {
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
}, [getRoutines]);


// evita recrear esta función cada render
const deleteRoutine = useCallback(async (id) => {
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
}, [getRoutines]);


// reutiliza esta función mientras getRoutines no cambie
const updateRoutine = useCallback(async (id, data) => {
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
}, [getRoutines]);

// esta función también se pasa a componentes hijos
// por eso la optimizamos
const handleSearch = useCallback((text) => {
  dispatch({
    type: "SEARCH_ROUTINE",
    payload: text
  });
}, []);

  // apenas carga la app trae las rutinas
  useEffect(() => {
    getRoutines();
  }, [getRoutines]);

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


// useCallback en getRoutines: Evita recrear la función que trae datos.
// useCallback en create/update/delete: Evita recrear funciones CRUD.
// useCallback en search: Evita recrear la función de búsqueda.

//acá lo que hago es crear el "contendedor global", se supone que antes las rutinas vivian en el App con el useState, ahora van a vivir acá 

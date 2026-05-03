export const routineReducer = (state, action) => {

  // action.type me dice qué operación quiero hacer
  // dependiendo del tipo entra a un case distinto
  switch (action.type) {

    case "ADD_ROUTINE":
      return {
        // mantengo el resto del estado por si después agrego más propiedades
        ...state,

        // copio todas las rutinas que ya existían
        // y al final agrego la nueva rutina que llega desde action.payload
        routines: [
          ...state.routines,
          action.payload
        ]
      };

    case "DELETE_ROUTINE":
      return {
        ...state,

        // filter recorre todas las rutinas
        // y conserva solo las que NO tengan el id que quiero eliminar
        routines: state.routines.filter(
          routine => routine.id !== action.payload
        )
      };

    case "EDIT_ROUTINE":
      return {
        ...state,

        // map recorre cada rutina
        // si encuentra la que tiene el mismo id,
        // la reemplaza por la rutina actualizada
        // si no coincide, deja la original
        routines: state.routines.map(routine =>
          routine.id === action.payload.id
            ? action.payload
            : routine
        )
      };

      case "SET_LOADING":
      return {
        ...state,
        loading: true
      };

    case "GET_ROUTINES":
      return {
        ...state,

        // guardo rutinas originales
        routines: action.payload,

        // filtered arranca mostrando todo
        filtered: action.payload,

        loading: false,
        error: null
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SEARCH_ROUTINE":
      return {
        ...state,

        // filtro por nombre de materia
        filtered: state.routines.filter((routine) =>
          routine.subject
            .toLowerCase()
            .includes(
              action.payload.toLowerCase()
            )
        )
      };
      
    default:
      // si llega una acción que no existe
      // simplemente devuelve el estado actual sin cambios
      return state;
  }
};
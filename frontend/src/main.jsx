import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RoutineProvider } from './context/RoutineContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* envuelvo toda la app para que cualquier componente use el contexto */}
    <RoutineProvider>
      <App />
    </RoutineProvider>

  </StrictMode>,
)

//esto es lo que le da acceso global a toda la aplicación 
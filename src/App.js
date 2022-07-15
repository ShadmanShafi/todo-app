import { useState } from "react";
import "./App.css";
import BrowserRoutes from "./BrowserRoutes";
import ContextStore from "./Context/ContextStore";


function App() {
  const [contextStore, setContextStore] = useState({
    name: "",
    todos: []
  })
  return (
    <ContextStore.Provider value={{contextStore, setContextStore}} >
      <BrowserRoutes />
    </ContextStore.Provider>
  );
}

export default App;

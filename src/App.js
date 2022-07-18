import { useState } from "react";
import "./App.css";
import BrowserRoutes from "./BrowserRoutes";
import ContextStore from "./Context/ContextStore";

function App() {
  const [contextStore, setContextStore] = useState({
    name: `${localStorage.getItem(`user`)}`,
    todos: JSON.parse(localStorage.getItem("todos")),
    //
  });
  return (
    <ContextStore.Provider value={{ contextStore, setContextStore }}>
      <BrowserRoutes />
    </ContextStore.Provider>
  );
}

export default App;

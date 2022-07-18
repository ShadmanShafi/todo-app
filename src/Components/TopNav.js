import "../App.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../Context/ContextStore";

export default function TopNav() {
  let navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(ContextStore);

  useEffect(() => {
    if (!contextStore.name) {
      navigate("/");
    }
  }, []);

  function handleLogout() {
    setContextStore({ name: "", todos: [] });
    localStorage.setItem("user", "");
    navigate("/");
  }

  return (
    <div className="top-nav-align">
      <div className="top-nav-left">
        <h4>Simple ToDo</h4>
      </div>
      <div className="top-nav-right">
        <h4 className="">{contextStore.name}</h4>
        <button className="top-nav-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

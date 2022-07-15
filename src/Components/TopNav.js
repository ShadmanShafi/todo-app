import "../App.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from '../Context/ContextStore'

export default function TopNav() {
  let navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(ContextStore);

  function handleLogout() {
    setContextStore({ ...contextStore, userName: "" });
    navigate("/");
  }

  return (
    <div className="navbar-top">
      <div>
        <h4>Simple ToDo</h4>
      </div>
      <div className="navbar-side">
        <h4 className="padding-right">{contextStore.name}</h4>
        <button className="log-out" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

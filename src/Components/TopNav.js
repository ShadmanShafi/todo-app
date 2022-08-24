import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { todoLogout } from "../Redux/Todos/actions";
import { logout } from "../Redux/User/actions";

export default function TopNav() {
  let navigate = useNavigate();
  //const { contextStore, setContextStore } = useContext(ContextStore);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //PROTECTIVE ROUTES NOT WORKING
  useEffect(() => {
    if (!user.name) {
      navigate("/");
    }
  }, []);

  function handleLogout() {
    dispatch(todoLogout());
    dispatch(logout());
    localStorage.setItem("user", "");
    navigate("/");
  }

  return (
    <div className="top-nav-align">
      <div className="top-nav-left">
        <h4>Simple ToDo</h4>
      </div>
      <div className="top-nav-right">
        <h4 className="">{user.name}</h4>
        <button className="top-nav-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

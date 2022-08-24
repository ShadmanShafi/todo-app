import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAdd } from "../Redux/User/actions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    name: "",
  });

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!(form.name.trim().length > 0)) {
      setErrors([{ msg: "Name is required" }]);
      return false;
    }
    return true;
  };

  const onClickSubmit = () => {
    if (validate()) {
      dispatch(userAdd(form.name));
      localStorage.setItem("user", form.name);
      navigate("/dashboard");
    }
  };

  return (
    <div class="home">
      <h3>Simple ToDo</h3>
      <input
        className="home-input"
        type="text"
        placeholder="Your name"
        name="name"
        value={form.name}
        onChange={onChangeInput}
      />
      {errors.map((error) => (
        <div className="home-error-alert">{error.msg}</div>
      ))}
      <button className="home-next-btn" onClick={onClickSubmit}>
        Next
      </button>
    </div>
  );
};

export default Home;

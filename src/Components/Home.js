import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../Context/ContextStore";
export const Home = () => {
  const navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(ContextStore);
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
      setContextStore({ ...contextStore, name: form.name });
      localStorage.setItem("user", form.name);
      navigate("/dashboard");
    }
  };
  return (
    <div class="home">
      <h3>Simple ToDo</h3>
      <input
        class="home-input"
        type="text"
        placeholder="Your name"
        name="name"
        value={form.name}
        onChange={onChangeInput}
      />
      {errors.map((error) => (
        <div class="home-error-alert">{error.msg}</div>
      ))}
      <button class="home-next-btn" onClick={onClickSubmit}>
        Next
      </button>
    </div>
  );
};

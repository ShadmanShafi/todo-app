import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import ContextStore from "../Context/ContextStore";
export const Home = () => {
    const navigate = useNavigate()
    const {contextStore, setContextStore} = useContext(ContextStore)
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        name: "",
    })
    const onChangeInput = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const validate = () => {
        if(!(form.name.trim().length > 0)){
            setErrors([{msg: "name field cannot be empty"}])
            return false
        }
        return true
    }
    const onClickSubmit = () => {
        if(validate()){
            setContextStore({...contextStore, name: form.name})
            navigate("/dashboard")
        }
    }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>Homepage</h3>
      <input type="text" name="name" value={form.name} onChange={onChangeInput}/>
      <button onClick={onClickSubmit}>next</button>
      <h4>Shafi</h4>
      <h4>Pranto</h4>
      {errors.map(error => (
        <div> 
            {error.msg}
        </div>
      ))}
    </div>
  );
};

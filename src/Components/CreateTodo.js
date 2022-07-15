import "../App.css";
import { useState, useContext } from "react";
import ContextStore from "../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Footer from "./Footer";
import BackButton from "./BackButton";

export default function CreateTodo() {
  let navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(ContextStore);
  const [errors, setErrors] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: ""
  })
  const onChangeFormValue = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  }
  const validate = () => {
    const errors = []
    for (const [key, value] of Object.entries(form)){
      if(!(value.trim().length > 0)){
        errors.push({msg: `${key} cannot be empty`})
      }
    }
    if(errors.length > 0){
      setErrors(errors)
      return false
    }
    return true
  }
  const onClickSubmit = () => {
    if(validate()){
      const todo = {
        id: contextStore.todos.length + 1,
        title: form.title,
        description: form.description,
        checked: false,
        createdAt: Date.now()
      }
      setContextStore({...contextStore, todos: [...contextStore.todos, todo]})
      navigate("/dashboard")
    }
  }



  return (
    <>
      <TopNav />
      <BackButton />
      <Footer />
      <h4 className="dashboard-body">Create new Todo</h4>
      
        <div className="create-todo-body">
          <h5 className="create-element">Title</h5>
          <input
            className="create-input"
            placeholder="Enter title here"
            value={form.title}
            name="title"
            onChange={onChangeFormValue}
          ></input>
          <h6 className="create-error create-element">Title is required</h6>
          <h5 className="create-element">Description</h5>
          <textarea
            className="create-input create-description"
            placeholder="Enter description here"
            value={form.description}
            name="description"
            onChange={onChangeFormValue}
          ></textarea>
          <button className="submit-newtodo-btn" onClick={onClickSubmit}>Create</button>
          {errors.map(error => <p>{error.msg}</p>)}
        </div>
      
    </>
  );
}

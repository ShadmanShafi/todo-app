import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import "../App.css";
import TopNav from "./TopNav";
import Footer from "./Footer";
import BackButton from "./BackButton";
import { todoAdd } from "../Redux/Todos/actions" 

export default function CreateTodo() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const onChangeFormValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = [];
    for (const [key, value] of Object.entries(form)) {
      if (!(value.trim().length > 0)) {
        errors.push({ msg: `${key} is required` });
      }
    }
    if (errors.length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };
  
  const onClickSubmit = () => {
    if (validate()) {
      dispatch(todoAdd(form.title, form.description));

      // localStorage.setItem(
      //   "todos",
      //   JSON.stringify([...contextStore.todos, todo])
      // );
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="create">
        <TopNav />
        <BackButton />
        <h4 className="create-title">Create new ToDo</h4>
        <div className="create-body">
          <div>
            <h5 className="">Title</h5>
          </div>
          <div>
            <input
              className="create-title-input"
              placeholder="Enter title here"
              value={form.title}
              name="title"
              onChange={onChangeFormValue}
            ></input>
          </div>
          <div>
            <h5 className="">Description</h5>
          </div>
          <div>
            <textarea
              className="create-description-input"
              placeholder="Enter description here"
              value={form.description}
              name="description"
              onChange={onChangeFormValue}
            ></textarea>
          </div>

          <div>
            {errors.map((error) => (
              <p className="create-error">{error.msg}</p>
            ))}
          </div>
          <div>
            <button className="create-btn" onClick={onClickSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

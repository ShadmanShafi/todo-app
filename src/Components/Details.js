import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContextStore from "../Context/ContextStore";
import TopNav from "./TopNav";
import Footer from "./Footer";
import BackButton from "./BackButton";

export default function Details() {
  const { contextStore, setContextStore } = useContext(ContextStore);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    description: "",
    checked: false,
    createdAt: 0,
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    const todo = contextStore.todos.find(
      (todo) => parseInt(todo.id) === parseInt(id)
    );
    setTodo(todo);
    setForm({ title: todo.title, description: todo.description });
  }, []);
  const validate = () => {
    const errors = [];
    for (const [key, value] of Object.entries(form)) {
      if (!(value.trim().length > 0)) {
        errors.push({ msg: `${key} cannot be empty` });
      }
    }
    if (errors.length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };
  const onClickEdit = () => {
    setEditMode(true);
  };
  const onClickCancel = () => {
    setForm({ title: todo.title, description: todo.description });
    setEditMode(false);
  };
  const onClickUpdate = () => {
    if (validate()) {
      let vTodos = contextStore.todos;
      let index = vTodos.findIndex(
        (todo) => parseInt(todo.id) === parseInt(id)
      );
      vTodos[index].title = form.title;
      vTodos[index].description = form.description;
      setContextStore({ ...contextStore, todos: vTodos });
      localStorage.setItem("todos", JSON.stringify([...contextStore.todos]));
      navigate("/dashboard");
    }
  };
  const onChangeFormData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div class="details">
        <TopNav />
        <BackButton />
        <h4 className="create-title">Details of Selected Item</h4>
        <li style={{ listStyle: "none" }} key={todo.id}>
          <div className="details-body">
            <div>
              <p>ID: {todo.id}</p>
            </div>
            {editMode && !todo.checked ? (
              <div>
                <input
                  placeholder="Enter a new title"
                  className="details-title-input"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onChangeFormData}
                />
              </div>
            ) : (
              <div>
                <p className="">Title: {todo.title}</p>
              </div>
            )}
            {editMode && !todo.checked ? (
              <div>
                <input
                  placeholder="Enter a new description"
                  className="details-description-input"
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={onChangeFormData}
                />
              </div>
            ) : (
              <div>
                <p className="">Description: {todo.description}</p>
              </div>
            )}
            {!editMode && !todo.checked && (
              <div>
                <button className="details-edit" onClick={onClickEdit}>
                  Edit
                </button>
              </div>
            )}
            {editMode && !todo.checked && (
              <div>
                <button className="details-update" onClick={onClickUpdate}>
                  Update
                </button>
                <button className="details-cancel" onClick={onClickCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </li>
        {errors.map((error) => (
          <p className="create-error details-error-padding">{error.msg}</p>
        ))}
      </div>
      <Footer />
    </>
  );
}

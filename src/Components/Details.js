import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContextStore from "../Context/ContextStore";

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
      navigate("/dashboard");
    }
  };
  const onChangeFormData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ul>
        <li
          style={{ backgroundColor: "gray", marginBottom: "6px" }}
          key={todo.id}
        >
          <p>{todo.id}</p>
          {editMode && !todo.checked ? (
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onChangeFormData}
            />
          ) : (
            <p className="padding-text">{todo.title}</p>
          )}
          {editMode && !todo.checked ? (
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={onChangeFormData}
            />
          ) : (
            <p className="padding-date">{todo.description}</p>
          )}
          {!editMode && !todo.checked && <button onClick={onClickEdit}>edit</button>}
          {editMode && !todo.checked && (
            <div>
              <button onClick={onClickUpdate}>Update</button>
              <button onClick={onClickCancel}>Cancel</button>
            </div>
          )}
        </li>
      </ul>
      {errors.map((error) => (
        <p>{error.msg}</p>
      ))}
    </>
  );
}

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../Context/ContextStore";
import TopNav from "./TopNav";
import Footer from "./Footer";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(ContextStore);
  useEffect(() => {
    if (!contextStore.name) {
      navigate("/");
    }
  }, []);
  const onClickCreateNew = () => {
    navigate("/create");
  };
  const onClickTodoItem = (id) => {
    navigate(`/todoitem/${id}`);
  };
  const onChangeCheckBox = (id, value) => {
    let vTodos = contextStore.todos;
    let index = vTodos.findIndex((todo) => parseInt(todo.id) === parseInt(id));
    vTodos[index].checked = value;
    setContextStore({ ...contextStore, todos: vTodos });
  };
  return (
    <>
      <TopNav />
      <Footer />
      <div>
        <h4>My ToDos</h4>
        <button>Update</button>
        <button onClick={onClickCreateNew}>Create new</button>
      </div>

      {contextStore.todos.length > 0 ? (
        <ul>
          {contextStore.todos.map((todo) => (
            <li
              style={{ backgroundColor: "gray", marginBottom: "2px" }}
              key={todo.id}
            >
              <p>{todo.id}</p>
              <p
                className={
                    todo.checked ? "strikethrough" : ""
                }
                onClick={() => {
                  onClickTodoItem(todo.id);
                }}
                style={{ cursor: "pointer" }}
              >
                {todo.title}
              </p>
              <p className="padding-date">currentDate</p>
              <p className="padding-box">checkBox</p>
              <input
                type={"checkbox"}
                checked={todo.checked}
                onChange={(e) => {
                  onChangeCheckBox(todo.id, e.target.checked);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h4 className="noTodos">You have 0 Todos</h4>
      )}
    </>
  );
};

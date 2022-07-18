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
    // localStorage.setItem("todos", JSON.stringify([...contextStore.todos]));
    localStorage.setItem("todos", JSON.stringify([...contextStore.todos]));
  };

  return (
    <>
      <div className="dashboard">
        <TopNav />
        <div className="dashboard-title">
          <h4>My ToDos</h4>
          <button className="dashboard-create-new" onClick={onClickCreateNew}>
            Create new
          </button>
        </div>
        <div className="dashboard-body">
          {contextStore.todos.length > 0 ? (
            <ul>
              {contextStore.todos.map((todo) => (
                <li className="dashboard-list-item" key={todo.id}>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <p>{todo.id}</p>
                    <p
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        fontStyle: "bold",
                      }}
                      className={todo.checked ? "strikethrough" : "unchecked"}
                      onClick={() => {
                        onClickTodoItem(todo.id);
                      }}
                    >
                      {todo.title}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <p className="date">{todo.dateTime}</p>
                    <input
                      type={"checkbox"}
                      checked={todo.checked}
                      onChange={(e) => {
                        onChangeCheckBox(todo.id, e.target.checked);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h4 className="dashboard-no-todo-items">You have 0 Todos</h4>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

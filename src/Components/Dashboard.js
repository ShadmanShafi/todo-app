import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { todoCheckedToggle } from "../Redux/Todos/actions"

export default function Dashboard() {
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  console.log(todos);

  const onClickCreateNew = () => {
    navigate("/create");
  };
  const onClickTodoItem = (id) => {
    navigate(`/todoitem/${id}`);
  };

  const onChangeCheckBox = (id, value) => {
    dispatch(todoCheckedToggle(id, value));
    // localStorage.setItem("todos", JSON.stringify([...contextStore.todos]));
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
          {todos.length > 1 ? (
            <ul>
              {todos.map((todo) => (
                <li className="dashboard-list-item" key={todo.id}>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <p>{`${todo.id}.`}</p>
                    <p
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        fontStyle: "bold",
                      }}
                      className={
                        todo.checked ? "strikethrough" : "unchecked"
                      }
                      onClick={() => {
                        onClickTodoItem(todo.id);
                      }}
                    >
                      {todo.title}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <p className="date">{todo.date}</p>
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
}

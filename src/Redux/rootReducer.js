import userReducer from "./User/reducer";
import todoReducer from "./Todos/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: userReducer,
  todos: todoReducer,
});

export default rootReducer;
import {
  TODO_ADD,
  TODO_CHECKED_TOGGLE,
  TODO_UPDATE,
  LOGOUT,
} from "./actionTypes";

const initialState = [
  {
    id: 1,
    title: "First Todo",
    description: "Details of Todo 1",
    date: "20 Mar, 2022",
    checked: false,
  },
  {
    id: 2,
    title: "2nd Todo",
    description: "Details of Todo 2",
    date: "30 Mar, 2022",
    checked: true,
  },
  {
    id: 3,
    title: "Last Todo",
    description: "Details of Todo 3",
    date: "02 Apr, 2022",
    checked: false,
  },
];

//helper functions
const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const current = new Date();
const date = `${current.getDate()} ${current.toLocaleString("default", {
  month: "short",
})}, ${current.getFullYear()}`;

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return [
        ...state,
        {
          id: nextTodoId(state),
          title: action.payload.title,
          description: action.payload.description,
          date: date,
          checked: false,
        },
      ];
    case TODO_CHECKED_TOGGLE:
      return state.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return {
          ...todo,
          checked: action.payload.value,
        };
      });
    case TODO_UPDATE:
      const { id, title, description } = action.payload;
      return state.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          title,
          description,
        };
      });
    case LOGOUT:
      return [...initialState];

    default:
      return state;
  }
};

export default todoReducer;

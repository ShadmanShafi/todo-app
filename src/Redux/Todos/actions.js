import {
  TODO_ADD,
  TODO_CHECKED_TOGGLE,
  TODO_UPDATE,
  LOGOUT,
} from "./actionTypes";

export const todoAdd = (title, description) => {
  return {
    type: TODO_ADD,
    payload: {
      title,
      description,
    },
  };
};

export const todoCheckedToggle = (id, value) => {
  return {
    type: TODO_CHECKED_TOGGLE,
    payload: {
      id,
      value,
    },
  };
};

export const todoUpdate = (id, title, description) => {
  return {
    type: TODO_UPDATE,
    payload: {
      id,
      title,
      description,
    },
  };
};

export const todoLogout = () => {
  return {
    type: LOGOUT,
  };
};

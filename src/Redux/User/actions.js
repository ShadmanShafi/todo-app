import { USER_ADD, LOGOUT } from "./actionTypes";

export const userAdd = (name) => {
  return {
    type: USER_ADD,
    payload: name,
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}
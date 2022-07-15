import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTodo from "./Components/CreateTodo";
import { Dashboard } from "./Components/Dashboard";
import Details from "./Components/Details";
import { Home } from "./Components/Home";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/todoitem/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

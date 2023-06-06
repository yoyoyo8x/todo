import React from "react";
import "./App.css";
import TodoList from "./component/TodoList";

function App() {
  return (
    <div className="todoapp">
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Todoitem from "./TodoItem";
import TodoTasks from "./TodoTasks";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("Tasks");
    if (localValue == null) {
      return [];
    }
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(todos));
  }, [todos]);

  const [status, setStatus] = useState("");

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return todos;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const remove = [...todos].filter((todo) => todo.id !== id);
    setTodos(remove);
  };

  const filterByStatus = (todos = [], status = "", id) => {
    switch (status) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  console.log(filterByStatus);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Todo onSubmit={addTodo} />{" "}
      <TodoTasks
        setStatusFilter={(status) => setStatus(status)}
        status={status}
      />
      <ul>
        <Todoitem
          todos={filterByStatus(todos, status)}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </ul>
    </div>
  );
}

export default TodoList;

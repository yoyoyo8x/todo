import React, { useState } from "react";
import { useRef } from "react";

function Newjob(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);
  const [, setInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) ?? [];
  });

  const handleSubmit = (e) => {
    setInputs((prev) => {
      const newJobs = [...prev, input];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      completed: false,
    });
    setInput("");
  };
  return (
    <form className="Todo" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            className="newTodo edit"
            type="text"
            name="text"
            placeholder="Update your jobs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button className="todo-button">Update</button>
        </>
      ) : (
        <>
          <input
            className="newTodo"
            type="text"
            name="text"
            placeholder="Add new Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button className="todo-button">Add</button>
        </>
      )}
    </form>
  );
}
export default Newjob;

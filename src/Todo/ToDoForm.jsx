import { useState, useEffect } from "react";

export const TodoForm = ({ onTodoForm }) => {
  const [inputValue, setInputValue] = useState({});
  const handleInputValue = (value) => {
    setInputValue({ id: value, content: value, checked: false });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onTodoForm(inputValue);
    setInputValue({ id: "", content: "", checked: false });
  };
  return (
    <section className="form">
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <div>
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            value={inputValue.content}
            onChange={(event) => handleInputValue(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};

import { useState, useEffect} from "react";
import { TodoClock } from "./ToDoClock";
import { TodoForm } from "./ToDoForm";
import { ListTodo } from "./ToDoList";
import { saveToLocalStorage, getFromLocalStorage } from "./LocalStorage";
import "./ToDo.css";

export const ToDO = () => {
  const [date, updateDateTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const dateTime = new Date();
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString();
      updateDateTime(formattedDate + "  -  " + formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [tasks, updateTasks] = useState(() => getFromLocalStorage());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    if (!content) return;
    const checkexistedContent = tasks.find(
      (currTask) => currTask.content === content
    );
    if (!checkexistedContent) {
      // console.log(tasks.values);
      updateTasks((previous) => [...previous, { id, content, checked }]);
    }
  };

  const handleCheckButton = (taskToCheck) => {
    const newTaskList = tasks.map((task) => {
      if (task.content === taskToCheck) {
        return { ...task, checked: !task.checked };
      } else return task;
    });
    updateTasks(newTaskList);
  };

  const handleDeleteButton = (taskToDelete) => {
    const newTaskList = tasks.filter(
      (curElemen) => curElemen.content !== taskToDelete
    );
    updateTasks(newTaskList);
    console.log(tasks);
  };

  const handleAllDeleteButton = () => {
    updateTasks([]);
  };

  const handleCheckedDeleteButton = () => {
    const newTaskList = tasks.filter((curElement) => !curElement.checked);
    updateTasks(newTaskList);
  };

  saveToLocalStorage(tasks);

  return (
    <section className="todo-container">
      <header>
        <h1>ToDO List</h1>
        <TodoClock date={date} updateDateTime={updateDateTime} />
      </header>
      <TodoForm onTodoForm={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul className="todo-list">
          {tasks.map((task) => {
            return (
              <ListTodo
                key={task.id}
                onAdd={task.content}
                checked={task.checked}
                handleCheckedButton={handleCheckButton}
                handleDeleteButton={handleDeleteButton}
                date = {date}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <div className="bottom-buttons">
          <button className="clear-btn" onClick={() => handleAllDeleteButton()}>
            Delete All
          </button>
          <button
            className="clear-btn"
            onClick={() => handleCheckedDeleteButton()}
          >
            Clear Checked
          </button>
        </div>
      </section>
    </section>
  );
};

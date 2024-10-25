import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
export const ListTodo = ({
  onAdd,
  checked,
  handleDeleteButton,
  handleCheckedButton,
  date,
}) => {
  const [remTime, updateRemTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date();
      const nextMidNight = new Date(currentDateTime);
      nextMidNight.setHours(24, 0, 1, 0);
      const remainingTimeInMS = nextMidNight - currentDateTime;

      const hours = Math.floor((remainingTimeInMS / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTimeInMS / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTimeInMS / 1000) % 60);
      const remainingTime = `${hours}:${minutes}:${seconds}`;

      updateRemTime(remainingTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (taskToDelete) => {
    handleDeleteButton(taskToDelete);
  };
  const handleCheck = (taskToCheck) => {
    handleCheckedButton(taskToCheck);
  };

  const [hoveredContent, setHoveredContent] = useState("");
  const handleMouseEnter = (listContent) => {
    setHoveredContent(listContent);
  };
  const handleMouseLeave = () => {
    setHoveredContent("");
  };

  return (
    <li
      className="todo-item-list"
      onMouseEnter={() => {
        handleMouseEnter(onAdd);
      }}
      onMouseLeave={() => handleMouseLeave()}
      // onMouseEnterEvent={() => }
    >
      <div className="todo-item">
        <div className={`${checked ? "checkList" : "notCheckList"} list-item`}>
          {onAdd}
        </div>

        <div className="buttons">
          <button className="check-btn" onClick={() => handleCheck(onAdd)}>
            <MdCheck />
          </button>
          <button className="delete-btn" onClick={() => handleDelete(onAdd)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
      {hoveredContent === onAdd && (
        <div className="remaining-time-div">Remaining Time : {remTime}</div>
      )}
    </li>
  );
};

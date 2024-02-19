import './Task.css'

import { BsXLg, BsCheck } from "react-icons/bs";

const Task = ({title, id, completed, handleDeleteTask, handleTaskCompleted}) => {

  return (
    <div className="task-container">
      <div className={completed ? "task completed" : "task"}>
        <div className="wrapper_button">
          <button onClick={() => handleTaskCompleted(id)}> 
            <BsCheck size={20} className="icon_check"/>
          </button>
        </div>
        <p>{title}</p>
      </div>
      <BsXLg size={20} className="delete-task" onClick={() => handleDeleteTask(id)}/>
    </div>
  )
}

export default Task
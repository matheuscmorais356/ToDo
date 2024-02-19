import { useEffect, useState } from 'react';
import './App.css';

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Task from './components/Task/Task';
import FormTask from './components/FormTask/FormTask';
import FooterTaskList from './components/FooterTaskList/FooterTaskList';

function App() {
  const [theme, setTheme] = useState('dark-theme');
  const [title, setTitle] = useState("")
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");

  const tasksActive = taskList.filter((task) => !task.completed)

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    };
  }, []);

  const createTask = (e) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 1000);

    const newTask = {
      id,
      title,
      completed: false
    };

    setTaskList([newTask, ...taskList]);

    setTitle("");
  };

  const taskCompleted = (id) => {
    const updatedTasks = taskList.map((task) => {
      return task.id === id ? {
        id: task.id,
        title: task.title,
        completed: task.completed ? false : true
      } : task
    });

    setTaskList(updatedTasks);
  }

  const deleteTask = (id) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    );
  };

  const filtersTasks = (type) => {
    setFilter(type)
  }

  const clearCompleted = () => {
    setTaskList(
      taskList.filter(task => {
        return !task.completed;
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <main className={theme}>
      <div className="content">
        <header>
          <h1>TODO</h1>
          {theme === 'dark-theme' ? (
            <BsFillSunFill size={25} className="icon-theme" onClick={() => setTheme('light-theme')} />
          ) : (
            <BsFillMoonFill size={25} className="icon-theme" onClick={() => setTheme('dark-theme')} />
          )}

        </header>

        <FormTask
          handleCreateTask={createTask}
          title={title}
          setTitle={setTitle}
        />
        <div className="wrapper-task-list">
          <div className="task-list">
            <div className="list">
            {filter === "all" && taskList?.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                id={task.id}
                completed={task.completed}
                handleDeleteTask={deleteTask}
                handleTaskCompleted={taskCompleted}
              />
            ))}

            {filter === "active" && taskList?.map((task) => {
              if (!task.completed) {
                return (
                  <Task
                    key={task.id}
                    title={task.title}
                    id={task.id}
                    completed={task.completed}
                    handleDeleteTask={deleteTask}
                    handleTaskCompleted={taskCompleted}
                  />
                )
              }
            })}

            {filter === "completed" && taskList?.map((task) => {
              if (task.completed) {
                return (
                  <Task
                    key={task.id}
                    title={task.title}
                    id={task.id}
                    completed={task.completed}
                    handleDeleteTask={deleteTask}
                    handleTaskCompleted={taskCompleted}
                  />
                )
              }
            })}
            </div>

            <div className="footer-task-list-mobile">
              <p>{tasksActive.length} items left</p>
              <span className="clear-tasks" onClick={clearCompleted}>Clear Completed</span>
            </div>

          </div>
          <FooterTaskList
            handleFiltersTasks={filtersTasks}
            handleClearCompleted={clearCompleted}
            tasksActive={tasksActive}
            filterActive={filter}
          />
        </div>
      </div>
    </main>
  );
};

export default App;

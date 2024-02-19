import "./FooterTaskList.css";

const FooterTaskList = ({handleFiltersTasks, handleClearCompleted, tasksActive, filterActive}) => {

  return (
    <div className="footer-task-list">
      <p>{tasksActive.length} items left</p>
      <div className="filters">
        <span 
          className={filterActive === "all" ? "filter-active" : ""} 
          onClick={() => handleFiltersTasks("all")}
        >
            All
        </span>
        <span 
          className={filterActive === "active" ? "filter-active" : ""} 
          onClick={() => handleFiltersTasks("active")}
        >
            Active
        </span>
        <span 
          className={filterActive === "completed" ? "filter-active" : ""} 
          onClick={() => handleFiltersTasks("completed")}
        >
            Completed
        </span>
      </div>
      <span className="clear-tasks" onClick={() => handleClearCompleted()}>Clear Completed</span>
    </div>
  );
};

export default FooterTaskList;

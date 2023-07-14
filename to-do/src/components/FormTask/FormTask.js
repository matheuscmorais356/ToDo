import "./FormTask.css";

const FormTask = ({handleCreateTask, setTitle, title}) => {

  return (
    <form onSubmit={(e) => handleCreateTask(e)} >
      <div className="input-container">
        <span className="circle-input" />
        <input
          type="text"
          placeholder="Create a new todo..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
    </form>
  );
};

export default FormTask;
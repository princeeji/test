import { useState } from "react";

// TodoForm collects the title and date for a new todo.
// After submit, it clears itself so the user can quickly add another task.
const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !date) {
      return;
    }

    onAddTodo({
      title: title.trim(),
      date,
      completed: false,
    });

    setTitle("");
    setDate("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Write a task"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;

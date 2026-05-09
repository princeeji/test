import { formatDate } from "../utils/date";

// TodoItem displays one todo.
// The checkbox updates completion, and Delete removes the todo.
const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? "todo-item-complete" : ""}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo)}
        />
        <span>
          <strong>{todo.title}</strong>
          <small>{formatDate(todo.date)}</small>
        </span>
      </label>

      <button
        className="danger-button"
        type="button"
        onClick={() => onDeleteTodo(todo._id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;

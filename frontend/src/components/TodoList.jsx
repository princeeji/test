import TodoItem from "./TodoItem";

// TodoList loops through all todos and renders a TodoItem for each one.
const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;

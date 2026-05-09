import { useEffect, useMemo, useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  createTodo,
  deleteTodo,
  getTodos,
  loginUser,
  registerUser,
  updateTodo,
} from "./services/api";
import { clearSession, getSession, saveSession } from "./utils/storage";

// App is the main controller for the page.
// It stores the logged-in user, loads todos, and passes data to child components.
const App = () => {
  const savedSession = getSession();
  const [token, setToken] = useState(savedSession?.token || "");
  const [user, setUser] = useState(savedSession?.user || null);
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  // When a token exists, load the user's todos from the backend.
  useEffect(() => {
    if (!token) {
      return;
    }

    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data = await getTodos(token);
        setTodos(data);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [token]);

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      const data = await loginUser(formData);
      setToken(data.token);
      setUser(data.user);
      saveSession(data);
      setMessage("Login successful.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setIsLoading(true);
      await registerUser(formData);
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      setToken(data.token);
      setUser(data.user);
      saveSession(data);
      setMessage("Account created and logged in.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setToken("");
    setUser(null);
    setTodos([]);
    setMessage("You have logged out.");
  };

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData, token);
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
      setMessage("Todo added.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      const updated = await updateTodo(todo._id, { completed: !todo.completed }, token);
      setTodos((currentTodos) =>
        currentTodos.map((item) => (item._id === updated._id ? updated : item)),
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId, token);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== todoId));
      setMessage("Todo deleted.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="app-shell">
      <section className="todo-app">
        <Header user={user} onLogout={handleLogout} />

        {message && <p className="status-message">{message}</p>}

        {!token ? (
          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        ) : (
          <>
            <section className="summary-row" aria-label="Todo summary">
              <div>
                <span className="summary-number">{todos.length}</span>
                <span>Total tasks</span>
              </div>
              <div>
                <span className="summary-number">{completedCount}</span>
                <span>Completed</span>
              </div>
            </section>

            <TodoForm onAddTodo={handleCreateTodo} />

            {isLoading ? (
              <p className="loading-text">Loading todos...</p>
            ) : todos.length > 0 ? (
              <TodoList
                todos={todos}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default App;

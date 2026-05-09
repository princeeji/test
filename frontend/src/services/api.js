const API_URL = "http://localhost:3000";

// request is a small helper for talking to the backend.
// It adds JSON headers, adds the token when needed, and handles errors in one place.
const request = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const loginUser = (formData) => {
  return request("/auth/login", {
    method: "POST",
    body: formData,
  });
};

export const registerUser = (formData) => {
  return request("/auth/register", {
    method: "POST",
    body: formData,
  });
};

export const getTodos = (token) => {
  return request("/", { token });
};

export const createTodo = (todoData, token) => {
  return request("/", {
    method: "POST",
    body: todoData,
    token,
  });
};

export const updateTodo = (todoId, updates, token) => {
  return request(`/${todoId}`, {
    method: "PUT",
    body: updates,
    token,
  });
};

export const deleteTodo = (todoId, token) => {
  return request(`/${todoId}`, {
    method: "DELETE",
    token,
  });
};

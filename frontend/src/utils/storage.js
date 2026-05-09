const SESSION_KEY = "todo-app-session";

// These helpers keep localStorage code away from App.jsx.
// localStorage lets the user stay logged in after refreshing the page.
export const saveSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = () => {
  const savedSession = localStorage.getItem(SESSION_KEY);
  return savedSession ? JSON.parse(savedSession) : null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

import { useState } from "react";

// AuthForm keeps only the login/register form fields.
// The actual API request happens in App.jsx, so this component stays simple.
const AuthForm = ({ onLogin, onRegister, isLoading }) => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === "register") {
      onRegister(formData);
      return;
    }

    onLogin({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Login" : "Create account"}</h2>

      {mode === "register" && (
        <label>
          Username
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
      )}

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading
          ? "Please wait..."
          : mode === "login"
            ? "Login"
            : "Register"}
      </button>

      <button
        className="link-button"
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </form>
  );
};

export default AuthForm;

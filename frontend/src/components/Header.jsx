// Header shows the app title and the logged-in user.
// It also receives the logout function from App.jsx.
const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Simple Todo App</p>
        <h1>My Tasks</h1>
      </div>

      {user && (
        <div className="user-area">
          <span>{user.username}</span>
          <button className="secondary-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

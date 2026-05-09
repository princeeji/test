// EmptyState is shown when the logged-in user has no todos yet.
const EmptyState = () => {
  return (
    <div className="empty-state">
      <h2>No todos yet</h2>
      <p>Add your first task using the form above.</p>
    </div>
  );
};

export default EmptyState;

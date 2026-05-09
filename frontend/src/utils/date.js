// formatDate changes the backend date into text that is easy to read in the UI.
export const formatDate = (dateValue) => {
  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

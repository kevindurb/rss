export const getStartOfDay = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const formatDate = (input) => {
  const startOfDay = getStartOfDay();
  const date = new Date(input);

  if (date > startOfDay) {
    return date.toLocaleTimeString();
  }
  return date.toDateString();
}

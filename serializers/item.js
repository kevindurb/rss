module.exports = ({ _id, ...item }) => ({
  id: _id,
  ...item
});

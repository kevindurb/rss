const identity = x => x;

module.exports = (handler, serializer = identity) => async (req, res) => {
  try {
    const result = await handler(req);

    if (Array.isArray(result)) {
      res.json(result.map(serializer));
    } else {
      res.json(serializer(result));
    }

    res.end();
  } catch (e) {
    res.status(500).end(e.message);
  }
};

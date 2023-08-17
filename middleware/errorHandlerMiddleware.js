exports.handleNotFoundError = (req, res) => {
  res.status(404).json({ error: "Not Found" });
};

exports.handleError = (error, req, res, next) => {
  console.error("Error:", error);
  res
    .status(error.status || 500)
    .json({ error: error.message || "Internal Server Error" });
};

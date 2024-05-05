const secureApi = (req, res, next) => {
  if (req.headers.authorization === "sui=tah=ha") {
    next();
  } else {
    res.send({ error: "invalid sites" });
  }
};

module.exports = secureApi;

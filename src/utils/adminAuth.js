const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthoraize = token === "xyz";
  if (!isAdminAuthoraize) {
    res.status(401).send("Admin Unauthoriazed");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthoraize = token === "xyz";
  if (!isAdminAuthoraize) {
    res.status(401).send("Admin Unauthoriazed");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

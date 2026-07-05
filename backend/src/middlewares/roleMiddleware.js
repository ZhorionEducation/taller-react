const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "acceso denegado" });
    }
    next();
  };
};

module.exports = authorize;
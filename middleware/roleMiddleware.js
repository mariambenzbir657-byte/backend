const authorize = (roles = []) => {
  return (req, res, next) => {
    console.log("RoleMiddleware exécuté pour :", req.user?.role); 
    if (!roles.includes(req.user.role)) {
      console.log("Accès refusé pour :", req.user.role);
      return res.status(403).json({ message: "Accès refusé" });
    }
    console.log("Accès autorisé pour :", req.user.role);
    next();
  };
};

module.exports = authorize;

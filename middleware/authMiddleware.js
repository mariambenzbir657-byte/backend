const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = protect;

const jwt = require('jsonwebtoken')

const AuthMiddleware = (req, res, next) => {
  const SECRET = process.env.JWT_SECRET;
  console.log('ddddddddddddddddddd')
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.replace("Bearer ", "");
    console.log('tokenn ois here', token)
    if (token == null)
      return res.status(401).json({ status: false, message: "Access denied" });
        jwt.verify(token, SECRET, (err, user) => {
      console.log(err);
      if (err)
        res.status(403).json({ status: false, message: "Invalid token" });

        req.user = user;
      next();
    });
  } catch (error) {
    console.log('error is here', error)
    res.status(400).json({ status: false, message: "Invalid token" });
  }
};

module.exports =AuthMiddleware;
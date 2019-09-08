const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.authenticate = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  if (process.env.ADMIN_TOKEN == token) {
    next();
  } else {
    res.status(201).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

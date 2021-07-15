// user auth middleware logic
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models'); //get User model to interact with DB

const { secret, expiresIn } = jwtConfig;//set up JWT to handle authorization token


//@authorization token send: if user verified successfully (login/singup success)
//once login/signup route is successful, we'll call these authorization middlewares to give token.
const setTokenCookie = (res, user) => {// Sends a JWT Cookie
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";
  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

//@Restore user's information (username, role, etc.) from JWT payload
//routes that REQUIRES AUTHORIZATION (protected routes) need to verify the identity of the user.
//i.e. adminOnly route needs restoreUser(user) data to determine if 'user' contains the role of 'admin'
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

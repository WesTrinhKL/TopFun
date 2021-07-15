// user auth middleware logic
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models'); //get User model to interact with DB

const { secret, expiresIn } = jwtConfig;//set up JWT to handle authorization token


//@authorization token send: if user verified successfully (login/singup success)
//once login/signup route is successful, we'll call this authorization middleware to give token.
const setTokenCookie = (res, user) => {// Sends a JWT Cookie
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";
  // once user is found in db, attach token to res to be sent back.
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
  //note: we didn't assign an error handler here since the logic that calls this is wrapped in an async handler to handle the error there if anything throws an error.
};

//@Restore user's information (username, role, etc.) from JWT payload
//routes that REQUIRES AUTHORIZATION (protected routes) need to verify the identity of the user.
//i.e. adminOnly route needs restoreUser(user) data to determine if 'user' contains the role of 'admin'
//1) request is sent back.
//2) Our route restores(middleware) user.
//3) user successfully restored and added to req object
//4) other middleware (like requireAuth) uses restoreUser to determine if they are allowed to access this route
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies; //get token
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {//verify token first
    if (err) {
      return next(); //don't invoke any errors, just go to the next middleware.
    }
    try { //restore user's data
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id); //scope this b/c hashedPassword is not required for this operation.
      //^req.user "user key" contains the user data to be used.
    } catch (e) {
      res.clearCookie('token');
      return next();
    }
    if (!req.user) res.clearCookie('token');

    return next();
  });
};

//@RequireAuth checks if user have correct authorization data to access the protected route
//uses the req.user data that is first set up by the restoreUser middleware above.
// If there is no current user, return an error
const requireAuth = [ //the array will execute the items (middleware logic) in order.
  restoreUser, //restoreUser ran first to add user to req.user
  function (req, res, next) {
    if (req.user) return next(); //if req.user exists, continue to the next middleware or logic

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err); //raise an error immediately
  },
];
module.exports = { setTokenCookie, restoreUser, requireAuth };

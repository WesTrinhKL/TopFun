//@hold resources for routes starting with: /api/session
const express = require('express')
const asyncHandler = require('express-async-handler'); //wrap routes and custom middlewares to do error handling (try/catch)

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();



//@login POSTS route: POST /api/session
//if user exists (after bycrpt validation), send back jwt token
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password }); //calls the user static login method defined in User Model.

    if (!user) { //custom error handling if not correct user
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    await setTokenCookie(res, user); //attach cookie to 'res'
    return res.json({ //send res with cookie attached
      user,
    });
  }),
);

//@logout delete route
//if user is logged in, clear jwt cookie token
router.delete( //we don't need async handler because we're not making any async request calls (like to db)
  '/',
  (_req, res) => {
    res.clearCookie('token'); //attach a clearCookie to res obj to let browser know to clear cookie.
    return res.json({ message: 'success' });
  }
);

//@retrieve user GET /api/session
// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject() //we added the 'user object' from db in the login route. The 'user obj' contains a method toSafeObject() which will return a js object with the user's id, email, username. this is for encapsulation(protecting direct access of data) so we don't have to directly do 'user.email' and instead use a getter method (toSafeObject) to essentially get the data.
      });
    } else return res.json({});
  }
);





module.exports = router;

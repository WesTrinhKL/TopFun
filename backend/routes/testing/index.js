
const router = require('express').Router();



router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

router.get('/helloworld2', (req, res) => {
  res.send('Hello World2!')
})

//@send-cookie-test
//@GET /api/set-token-cookie
//1) send token w/ user data in payload
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));


//@restoreUser-test, check if req.user set properly
//@GET /api/restore-user
//2) receive token, reconstruct user data from token payload
const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

//@requireAuth test to check if user is authorized to access route.
//@GET /api/require-auth
//3) if req.user (from restoreUser) exists, continue by sending back some data, else error handler
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;

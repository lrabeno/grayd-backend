import User from '../model/User.js';
import express from 'express';

const router = express.Router();

// needs to be get route for logout
router.get('/', async (req, res) => {
  // On front end delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log('logged out user');
    return res.sendStatus(204);
  } // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in thr DB?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    /* clear whatever it is called. In this case jwt
    also need to pass the same options it was set as, otherwise wont work. 
    max age does not need to be there and is 1 exception */
    res.clearCookie('jwt', {
      httpOnly: true,
      //sameSite: 'None',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); //Forbidden
  }
  // Delete refreshToken in DB
  foundUser.refreshToken = '';
  // .save() saves to mongoDB document
  const result = await foundUser.save();
  console.log(result);

  // clear the jwt below
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); //secure: true
  res.sendStatus(204);
});

export default router;

import User from '../model/User.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// const handleNewUser = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd)
//     return res
//       .status(400)
//       .json({ message: 'Username and password are required' });
//   // check for duplicate names in db
//   const duplicate = await User.findOne({ username: user }).exec();
//   if (duplicate) return res.sendStatus(409); //409 status = conflict
//   try {
//     //encrypt pw
//     const hashedPwd = await bcrypt.hash(pwd, 10);
//     // create and store the new user
//     const newUser = await User.create({
//       username: user,
//       password: hashedPwd,
//     });
//     console.log('new user from registerController', newUser);
//     res.status(201).json({ success: `New user ${user} created!` });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

router.post('/', async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  // check for duplicate names in db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //409 status = conflict
  try {
    //encrypt pw
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create and store the new user
    const newUser = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log('new user from registerController', newUser);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

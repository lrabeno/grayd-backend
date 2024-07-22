import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  const foundUser = usersDB.find((person) => person.username === user);
  if (!user) return res.sendStatus(401); //Unauthorized
  // evaluate pw
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // need to add JWTs here. access and refresh token
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    // save token in DB with refreshToken
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    // setting httpOnly to true makes refreshToken secure on front end and not accessible by javascript
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;

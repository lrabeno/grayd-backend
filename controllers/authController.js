import bcrypt from 'bcrypt';

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
    res.json({ success: `User ${user} is logged in!!!` });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;

import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  // check for duplicate names in db
  const duplicate = usersDB.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); //409 status = conflict
  try {
    //encrypt pw
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handleNewUser;

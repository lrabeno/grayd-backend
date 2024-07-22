const handleLogout = (req, res) => {
  // On front end delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in thr DB?
  const foundUser = usersDB.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    /* clear whatever it is called. In this case jwt
    also need to pass the same options it was set as, otherwise wont work. 
    max age does not need to be there and is 1 exception */
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.sendStatus(204); //Forbidden
  }
  // Delete refreshToken in DB
  const otherUsers = usersDb.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);

  // clear the jwt below
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
};

export default handleLogout;

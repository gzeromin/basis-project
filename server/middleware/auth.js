const { User } = require('../models/User');

let auth = (req, res, next) => {
  // get token from client cookie
  let token = req.cookies.x_auth;

  // decrypt token and find user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        data: {}
      });

    req.token = token;
    req.user = user;
    console.log(user);
    next();
  });
};

module.exports = { auth };

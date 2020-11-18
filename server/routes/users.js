const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      data: userInfo
    });
  });
});

router.post('/login', (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        success: false,
        message: 'There is no user'
      });
    }
    //check password
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          sucess: false,
          message: 'unvalid password'
        });
      }

      //create token
      userInfo.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // save token. where? cookie, localStorage --> cookie here
        res.cookie('x_auth', user.token).status(200).json({
          success: true,
          data: user
        });
      });
    });
  });
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    data: Object.assign(
      {
        isAdmin: req.user.role === 0 ? false : true
      },
      req.user._doc
    )
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

module.exports = router;

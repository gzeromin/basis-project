const express = require('express');
const app = express();
const port = 9090;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
////////////////////////////////////////////////////////////////////////////////
//connect mongo db
//
let mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'basis-project';

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(config.mongoURI)
      .then(() => {
        console.log('Database connect successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

new Database();
////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => res.send('hello??'));

app.post('/api/user/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      data: userInfo
    });
  });
});

app.post('/api/user/login', (req, res) => {
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

app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    success: true,
    data: Object.assign(
      {
        isAdmin: req.user.role === 0 ? false : true
      },
      req.data
    )
  });
});

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.listen(port, () => console.log(`example ${port}`));

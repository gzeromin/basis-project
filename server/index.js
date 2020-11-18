const express = require('express');
const app = express();
const port = 9090;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
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

app.use('/api/user', require('./routes/users'));

app.listen(port, () => console.log(`example ${port}`));

const express = require('express');
const app = express();
const port = 3000;

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
      .connect(`mongodb://${server}/${database}`)
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

app.listen(port, () => console.log(`example ${port}`));

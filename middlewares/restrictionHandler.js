const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

function protected(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db('users').where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
}

module.exports = protected;

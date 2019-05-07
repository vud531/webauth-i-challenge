const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

function protected(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'Please login to access this resource' });
  }
}


module.exports = protected;

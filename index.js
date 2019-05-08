const helmet = require('helmet');

const express = require('express')
// const knex = require('knex')
// const db = require('./data/dbConfig')
// const restricted = require('./auth/protected-middleware')

const session = require('express-session');

const auth = require('./routes/auth')
const users = require('./routes/users')

const server = express()


const sessionConfig = {
  name: 'monster', // by default would be sid
  secret: 'keep it secret, keep it safe! -gandalf',
  cookie: {
    httpOnly: true, // true means prevent access from JavaScript code
    maxAge: 1000 * 60 * 2, // in milliseconds
    secure: false, // true means only send the cookie over https
  },
  resave: false, // resave session even if it didn't change?
  saveUninitialized: true, // create new sessions automatically, make sure to comply with law
};

// configure express-session middleware
server.use(session(sessionConfig));


server.use(helmet());
server.use(express.json())

server.use('/api/users', users)
server.use('/auth', auth)

server.get('/', (req, res) => {
  console.log(req.session.username)
  const username = req.session.username || 'stranger';
  res.send(`Hello ${username}!`);
});


const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
)


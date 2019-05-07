const helmet = require('helmet');

const express = require('express')
// const knex = require('knex')
// const db = require('./data/dbConfig')
// const restricted = require('./auth/protected-middleware')
const users = require('./routes/users')
const server = express()

server.use(helmet());
server.use(express.json())

const session = require('express-session');

// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  })
);


server.use('/api/users', users)

const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
)
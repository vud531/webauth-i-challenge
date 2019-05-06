const bcrypt = require('bcryptjs');
const helmet = require('helmet');

const express = require('express')
const knex = require('knex')
const db = require('./data/dbConfig')

const server = express()

server.use(helmet());
server.use(express.json())

server.post('/api/register', async(req, res) => {
    try {

        const credentials = req.body
        const hash = bcrypt.hashSync(credentials.password, 14)
        credentials.password = hash
        const id = await db('users').insert(credentials)
    
        const result = await db('users')
        .where({ id })
        .first()
    
        res.status(201).json(result)
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

server.post('/api/login', async(req, res) => {
    try {
        const credentials = req.body
        const user = await db('users').where('username', credentials.username).first()
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return res.status(401).json({ error: 'Incorrect Credentials'})
        }

        const result = await db('posts')
        res.status(202).json(result)
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
)
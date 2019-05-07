const express = require('express')
const router = express.Router()

const users = require('../models/users')


router.post('/api/register', async(req, res) => {
    try {

        const credentials = req.body
        const hash = bcrypt.hashSync(credentials.password, 5)
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

router.post('/api/login', async(req, res) => {
    try {
        const credentials = req.body
        const user = await db('users').where('username', credentials.username).first()
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return res.status(401).json({ error: 'Incorrect Credentials'})
        }
        // const result = await db('users').where
        res.status(202).json({message: 'Welcome!'})
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

router.get('/api/users', restricted, async (req, res) => {
    try {
        const result = await db('users')
        res.status(202).json(result)
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
});
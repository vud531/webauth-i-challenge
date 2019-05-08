const express = require('express')
const bcrypt = require('bcryptjs');

const router = express.Router()

const Users = require('../models/users')
const restricted = require('../middlewares/restrictionHandler')


router.post('/register', async(req, res) => {
    try {

        const credentials = req.body
        const hash = bcrypt.hashSync(credentials.password, 5)
        credentials.password = hash
        const result = await users.add(credentials)
        req.session.username = credentials.username;

        res.status(201).json(result)
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const credentials = req.body
        const { username } = credentials
        const user = await Users.findBy({username})
        if (user || bcrypt.compareSync(credentials.password, user.password)) {
            
        req.session.username = user.username
        console.log(req.session)
        res.status(202).json({message: 'Welcome!' + user.username})
        } else {
            res.status(401).json({ error: 'Incorrect Credentials'})
        }
        // const result = await db('users').where

    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

router.get('/greet', (req, res) => {
    const name = req.session.name;
    console.log(name)
    if (name) {
        res.send(`hello ${req.session.name}`);
    }
    
    res.status(404).send({message: "user not loged in"})

});

router.get('/', restricted, async (req, res) => {
    try {
        const result = await users.all()
        res.status(202).json(result)
        
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
});

module.exports = router
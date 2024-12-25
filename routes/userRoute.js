const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async(req, res) => {
    const {name, password} = req.body;

    try {
        const user = await User.findOne({ name });

        if(user){
            return res.status(400).json({message: 'User already exists!!'})
        }
        
        const newUser = new User({ name, password });
        await newUser.save();

        return res.status(201).json({ message: 'User added successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;
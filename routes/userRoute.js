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

        return res.status(201).json({ message: 'User successfully added!!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/', async(req, res) => {
    try {
        const users = await User.find();

        if(users.length > 0){
            return res.status(200).json({ users })
        }else{
            return res.status(400).json({ message: 'There is no any user' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.put('/', async(req, res) => {
    const {editingUserId, editingUserName, editingUserPassword, editingUserRole} = req.body;
    const id = editingUserId

    const userData = {
        name: editingUserName,
        password: editingUserPassword,
        role: editingUserRole,
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, {
            new: true,
            runValidators: true, 
        });

        if (updatedUser) {
            res.status(200).json({ message: 'User successfully updated!!' });
        } else {
            res.status(404).json({ message: 'User not found!!' });
        }
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: 'An error occurred while updating the user details!!' });
    }
})


router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deletingUser = await User.findByIdAndDelete(id);

        if (deletingUser) {
            res.status(200).json({ message: 'User successfully deleted!!' });
        } else {
            res.status(404).json({ message: 'User not found!!' });
        }
    } catch (error) {
        console.error("Error deleting user details:", error);
        res.status(500).json({ message: 'An error occurred while deleting the user details!!' });
    }
})

module.exports = router;
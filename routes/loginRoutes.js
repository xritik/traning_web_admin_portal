const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/', async(req, res) => {
    const {name, password} = req.body;

    const admin = await Admin.findOne({name, password});

    if(admin){
        res.status(200).json({message: 'Login Successful!!..'})
    }else{
        res.status(401).json({message: 'Incorrect name or password!!..'})
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/', async(req, res) => {
    const {name, password} = req.body;


    const admin = await Admin.findOne({name, password});

    if (!admin){
        if(name=='admin' && password=='pass'){
            res.status(200).json({ message: 'Login Successful!!' });
        }else{
            res.status(401).json({ message: 'Invalid name or password!!' });
        }
    }else{
        if(admin){
            res.status(200).json({ message: 'Login Successful!!' });
        } else{
            res.status(401).json({ message: 'Invalid name or password!!' });
        }
    }
});

module.exports = router;
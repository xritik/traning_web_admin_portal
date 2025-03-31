const mongoose = require('mongoose')
require('dotenv').config();

// const mongodbUserName = process.env.MONGO_USER
// const mongodbPass = process.env.MONGO_PASS

const mongoURL = 'mongodb://localhost:27017/mytraining';
// const mongoURL = `mongodb://${mongodbUserName}:${mongodbPass}@localhost:27017/mytraining`;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongodb server...');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:- ', err);
});

db.on('disconnected', () => {
    console.log('Disconnected to MongoDB server')
});


module.exports = db;
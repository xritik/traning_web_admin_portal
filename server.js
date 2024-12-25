const express = require('express');
const cors = require('cors');
const app = express();
require('./db');

app.use(cors());

app.use(express.json());

const loginRoute = require('./routes/loginRoutes')
const userRoute = require('./routes/userRoute')


app.use('/login', loginRoute);
app.use('/user', userRoute);

app.listen(5000);
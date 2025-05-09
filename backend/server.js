const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
require('./db');

app.use(cors());

app.use(express.json());

const loginRoute = require('./routes/loginRoutes')
const userRoute = require('./routes/userRoute')


app.use('/login', loginRoute);
app.use('/user', userRoute);

app.listen(PORT, () => console.log('Server is running at port ', PORT));
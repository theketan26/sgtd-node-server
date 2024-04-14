const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./modules/services/db')();

const authRouter = require("./modules/routes/auth")
const userRouter = require('./modules/routes/user');
const eventRouter = require('./modules/routes/event');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
const noteRouter = require('./Routes/Notes');

const app = express();
require('dotenv').config();
require('./models/db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRouter);
app.use('/notes', noteRouter);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on the Port:", PORT);
});

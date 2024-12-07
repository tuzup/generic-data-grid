const express = require('express');
const dotenv = require('dotenv');

var tableRoute = require('./routes/tableRoute');

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/table', tableRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(process.env.MONGODB_URI);
});
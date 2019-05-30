require('dotenv').config();
const path = require('path');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.use(require('body-parser').json());

app.use('/api', require('./router'));
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:8080/`);
});

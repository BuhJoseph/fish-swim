const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send(`İsteğin cevaplandığı port:  ${port}`));

app.listen(port, () => console.log(`Running on ${port}`));
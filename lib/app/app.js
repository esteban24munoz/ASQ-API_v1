const express = require('express');
const bodyParser = require('body-parser');

const common = require('./common.js');
const api = require('./api/api.js');

const app = express();

//parsing POST data to body
app.use(bodyParser.urlencoded({ extended: false }));

//mount features
app.use('/api', api.router);

//if cant find static files, show 404
app.use(common.notFound);


module.exports = app;

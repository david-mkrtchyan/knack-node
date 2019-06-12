const morgan = require('morgan');
const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

//set up express app
const app = express();

//set up Logger for HTTP requests
app.use(morgan('dev'));

//attach to request body JSON data
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//set up routes
app.use('/api/v1', routes);

//Error handling  Middleware
app.use((err, req, res, next) => {
    // res.send(err.message)
    res.status(422).send(err)
});

//listen to requests
app.listen(process.env.port || 4000, () => {
    console.log('server is listening to port: 4000')
});
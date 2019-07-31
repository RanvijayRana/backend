const express = require('express');
const appConf = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const globalErrorMW = require('./middlewares/appErrorHandler');
const routeLoggerMW = require('./middlewares/routeLogger');
const helmet = require('helmet');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.use(helmet());

app.use(globalErrorMW.globalError);
app.use(routeLoggerMW.logIp);

let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function (file){
    if(~file.indexOf('.js')){
        require(modelsPath + '/' + file);
    }
});

let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file){
    if(~file.indexOf('.js')){
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

app.use(globalErrorMW.globalNotFound); //404 error handler

app.listen(appConf.port, () => {
    console.log(`Example app listening on port ${appConf.port}!`);
    //creating mongodb connection here
    let db = mongoose.connect(appConf.db.uri, { useNewUrlParser: true });//{ useMongoClient: true });
});

//error handling
mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err);
});

mongoose.connection.on('open', function(err){
    if(err){
        console.log('database connection error');
        console.log(err);
    }else{
        console.log("database connection open success");
    }
    
});



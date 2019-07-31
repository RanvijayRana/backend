const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');
const check = require('./../libs/check');

let isAuthenticated = (req,res,next) => {
    if(req.params.authToken || req.query.authToken || req.header('authToken')){
        if(req.params.authToken == "Admin" || req.query.authToken == "Admin" ||
          req.header('authToken') == 'Admin'){
              req.user = {fullName:'Admin', userId:'Admin'};
              next();
        }else{
            logger.error('Incorrect authentication token','Authentication middleware',5);
            let apiResponse = response.generate(true,'Incorrect auth token',403,null);
            res.send(apiResponse);
        }
    }else{
        logger.error('authentication token missing','Authentication middleware',5);
        let apiResponse = response.generate(true,'auth token missing',403,null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuth : isAuthenticated
}


const response = require('./../libs/responseLib');
let errorHandler = (err,req,res,next) =>{
    console.log(err);
    let apiResponse = response.generate(true, 'Application error handler called', 500, null);
    res.send(apiResponse);
} //end request ip logger function

let notFoundHandler = (req,res,next) =>{
    console.log("Global route not found handler called");
    let apiResponse = response.generate(true, 'route not found', 404, null);
    res.send(apiResponse);
}// end not found handler

module.exports = {
    globalError: errorHandler,
    globalNotFound: notFoundHandler
}
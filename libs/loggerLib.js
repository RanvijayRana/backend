const logger = require('pino')();
const moment = require('moment');

let capturError = (errMsg, errOrigin, errLevel) => {
    let currentTime = moment();

    let errorResponse = {
        timestamp: currentTime,
        errorMessage: errMsg,
        errorOrigin: errOrigin,
        errorLevel: errLevel
    }

    logger.error(errorResponse);
    return errorResponse;
} // end captureError

let captureInfo = (message, origin, importance) => {
    let currentTime = moment();

    let infoMessage = {
        timestamp: currentTime,
        message: message,
        origin: origin,
        level: importance
    }

    logger.info(infoMessage);
    return infoMessage;
} // end infoCapture

module.exports = {
    error: capturError,
    info: captureInfo
}

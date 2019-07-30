const moment = require('moment');
const momenttz = require('moment-timezone');
const timeZone = 'Asia/Calcutta';

let now = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

let getLocalTime = () => {
    return moment().tz(timeZone).format();
}

let convertToLocalTime = (time) =>{
    return momenttz.tz(time, timeZone).format('LLLL');
}

module.exports = {
    now: now,
    getLocal: getLocalTime,
    convetToLocal: convertToLocalTime
}
const moment = require('moment');
const momenttz = require('moment-timezone');
const timeZone = 'Asia/Calcutta';

let now = () => {
    return moment().format('LLLL');
}

let getLocalTime = () => {
    return moment().tz(timeZone).format('LLLL');
}

let convertToLocalTime = (time) =>{
    return momenttz.tz(time, timeZone).format('LLLL');
}

module.exports = {
    now: now,
    getLocal: getLocalTime,
    convetToLocal: convertToLocalTime
}
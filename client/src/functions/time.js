function convertToLocalTime(time){
    return time.split('T')[1].slice(0,5);
}

module.exports = {convertToLocalTime}
var oneVariable = 15;
var anoterVariable = 10;

var result = oneVariable + anoterVariable;

//document.querySelector('#par').innerHTML = (new Date()).getMilliseconds();

var timesTwo = function (val) {
    return val * 2;
};

var timesNum = function (val, num) {
    return val * num;
};

function writeStuff(stf) {
    return stf;
}

module.exports = {
    timesTwo: timesTwo,
    timesNum: timesNum,
    write: writeStuff
};

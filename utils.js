function getRegexFromArray(arr, flags) {
    let out = '';
    arr.forEach((el,i,a) => {
        out += `${el}`;
        out += i < a.length-1 ? '|' : '';
    });
    return new RegExp(out, flags);
}

function randomHash(length=8) {
    let srcArr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    for (let i = 0; i < 10; i++) {
        srcArr.sort((a,b)=>Math.random()>0.5?1:-1)   
    }
    return srcArr.join('').slice(0,length);
}


module.exports = {
    getRegexFromArray, randomHash
}
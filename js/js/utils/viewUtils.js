//将时间秒转换成  00:00形式
function sTString(s) {
    var str = '';
    //得到分
    var m = Math.floor(s / 60);
    str += (m >= 10 ? m : '0' + m);
    str += ':';
    //得到秒
    var n = s % 60;
    str += (n >= 10 ? n : '0' + n);
    return str;
}
/**
 * 将时间戳转换成YYYY-MM-D h:m:s
 * @param {*} timestamp
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds() + '';
    return Y + M + D + h + m + s;
}
//# sourceMappingURL=viewUtils.js.map
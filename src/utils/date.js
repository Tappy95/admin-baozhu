export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};

//距当前时间/天/时/分/秒
export  function computeTime(time) { // time format 2016-11-11 18:56:33
  let datePart = time.substring(0, 10).replace(/\-/g, "/");
  let timePart = time.substring(11, 19);
  //console.log(datePart + ' ' + timePart);
  let oldTime = (new Date(datePart + ' ' + timePart)).getTime();
  let currTime = new Date().getTime();

  let diffValue = currTime - oldTime;

  let days = Math.floor(diffValue/(24*3600*1000));
  if(days === 0){
    //计算相差小时数
    let leave1 = diffValue%(24*3600*1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1/(3600*1000));
    if(hours === 0) {
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);  //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));
      if(minutes === 0) {
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        return seconds+'秒前';
      }
      return minutes+'分钟前';
    }
    return hours+'小时前';
  }

  return days+'天前';
}


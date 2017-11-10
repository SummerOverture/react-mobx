global.Date.prototype.pattern = function pattern(fmt) {
  let format = fmt;
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d',
  };
  if (/(y+|Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[`${this.getDay()}`]);
  }

  Object
    .keys(o)
    .forEach((key) => {
      if (new RegExp(`(${key})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[key]) : ((`00${o[key]}`).substr((`${o[key]}`).length)));
      }
    });

  return format;
};

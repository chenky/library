// 数组随机乱序，数组乱序
Array.prototype.shuffle = function () {
  let j;
  let i = this.length;
  while (i > 0) {
    j = parseInt(Math.random() * i);
    i--;
    [this[j], this[i]] = [this[i], this[j]];
  }
  return this;
};
// 从数组中随机提取一个元素
Array.prototype.random = function () {
  const len = this.length;
  return this[parseInt(Math.random() * len)];
};

let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.random());
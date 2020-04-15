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
// 带权重的数组乱序，格式[{value:"val1", priority:1},{value:"val2", priority:9},...]
// priority的值在[0,1]之间，包括0，小于1
Array.prototype.shuffleWithPriority = function(){
  let prioritySum = this.reduce((total, elem)=>total+elem.priority, 0);
  let res = [];
  for (let i = 0; i < this.length; i++) {
    const elem = this[i];
    if(elem.priority/prioritySum>Math.random()){
      res.unshift(elem);
    } else{
      res.push(elem)
    }
  }
  return res;
}
// 从数组中随机提取一个元素
Array.prototype.random = function () {
  const len = this.length;
  return this[parseInt(Math.random() * len)];
};

let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.random());
console.log([{value: 1,priority:1},{value: 2,priority:10},{value: 3,priority:20},{value: 4,priority:30},{value: 5,priority:50},{value: 6,priority:60}].shuffleWithPriority())
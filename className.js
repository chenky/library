/*
  对html元素的class进行操作，包括获取getClass，判断是否存在hasClass，添加addClass, 删除removeClass, 清空clearClass
*/
function getClass(elem){
  return elem.className.replace(/\s+/," ").split(" ");
}
function hasClass(elem, cls){
  return " "+ elem.className + " ".indexOf(" "+ cls +" ") > -1;
}
function addClass(elem, cls){
  if(!hasClass(elem,cls))
    elem.className += " " + cls;
}
function removeClass(elem, cls){
  if(hasClass(elem, cls)){
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)')
    elem.className = elem.className.replace(reg, " ");
  }
}
function clearClass(elem){
  elem.className = "";
}
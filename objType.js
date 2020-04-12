// javascript数据类型判断
var class2type = {};
var toString = class2type.toString;
"Boolean Number String Null Undefined Function Array Date RegExp Object Error Symbol"
  .split(" ")
  .forEach((name, index) => {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
function ObjType(obj) {
  return class2type[toString.call(obj)] || typeof obj;
}
var isFunction = function isFunction(obj) {
  // Support: Chrome <=57, Firefox <=52
  // In some browsers, typeof returns "function" for HTML <object> elements
  // (i.e., `typeof document.createElement( "object" ) === "function"`).
  // We don't want to classify *any* DOM node as a function.
  return typeof obj === "function" && typeof obj.nodeType !== "number";
};
var isWindow = function isWindow(obj) {
  return obj != null && obj === obj.window;
};

var isPlainObject = function (obj) {
  var proto, Ctor;
  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = getProto(obj);
  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    return true;
  }
  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return (
    typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString
  );
};

var isEmptyObject = function (obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

// console.log(class2type)
console.log(ObjType({}));
console.log(ObjType([]));
console.log(ObjType(Symbol()));
console.log(ObjType(null));
console.log(ObjType(undefined));
console.log(ObjType(""));
console.log(ObjType(String("Str")));
console.log(ObjType(23));
console.log(ObjType(Number(222222)));
console.log(ObjType(true));
console.log(ObjType(Boolean(false)));
console.log(ObjType(() => {}));
console.log(ObjType(new RegExp()));
console.log(ObjType(new Error()));
console.log(ObjType(new Date()));

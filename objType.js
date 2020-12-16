(function () {
  var getProto = Object.getPrototypeOf
  // javascript数据类型判断
  var class2type = {}
  var toString = class2type.toString
  var hasOwn = class2type.hasOwnProperty
  var fnToString = hasOwn.toString
  var ObjectFunctionString = fnToString.call(Object)
  // var toString = class2type.toString
  "Boolean Number String Null Undefined Function Array Set Map Date RegExp Object Error Symbol"
    .split(" ")
    .forEach((name, index) => {
      class2type["[object " + name + "]"] = name.toLowerCase()
    })
  function ObjType (obj) {
    return class2type[toString.call(obj)] || typeof obj
  }
  var isFunction = function isFunction (obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number"
  }
  var isWindow = function isWindow (obj) {
    return obj != null && obj === obj.window
  }

  // 原始类型
  var isPrimitive = function (obj) {
    return obj === null || ['string', 'number', 'boolean', 'undefine', 'symbol'].indexOf(typeof obj) !== -1
  }

  var isPlainObject = function (obj) {
    var proto, Ctor
    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
      return false
    }
    proto = getProto(obj)
    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true
    }
    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor
    return (
      typeof Ctor === "function" &&
      fnToString.call(Ctor) === ObjectFunctionString
    )
  }

  var isEmptyObject = function (obj) {
    var name
    for (name in obj) {
      return false
    }
    return true
  }

  function isArrayLike (obj) {

    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
      type = ObjType(obj)

    if (isFunction(obj) || isWindow(obj)) {
      return false
    }

    return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj
  }

  // 判断两个对象是否相等，对象相等
  // ES6新增的Object.is判断两个对象是否相等，但对于对象类型判断只看是否指向同一个对象
  // https://www.jb51.net/article/110768.htm
  function isObjEqual (a, b) {
    //如果a和b本来就全等
    if (a === b) {
      //判断是否为0和-0
      return a !== 0 || 1 / a === 1 / b
    }
    //判断是否为null和undefined
    if (a == null || b == null) {
      return a === b
    }
    //接下来判断a和b的数据类型
    var classNameA = toString.call(a),
      classNameB = toString.call(b)
    //如果数据类型不相等，则返回false
    if (classNameA !== classNameB) {
      return false
    }
    //如果数据类型相等，再根据不同数据类型分别判断
    switch (classNameA) {
      case '[object RegExp]':
      case '[object String]':
        //进行字符串转换比较
        return '' + a === '' + b
      case '[object Number]':
        //进行数字转换比较,判断是否为NaN
        if (+a !== +a) {
          return +b !== +b
        }
        //判断是否为0或-0
        return +a === 0 ? 1 / +a === 1 / b : +a === +b
      case '[object Date]':
      case '[object Boolean]':
        return +a === +b
    }
    //如果是对象类型
    if (classNameA == '[object Object]') {
      //获取a和b的属性长度
      var propsA = Object.getOwnPropertyNames(a),
        propsB = Object.getOwnPropertyNames(b)
      if (propsA.length != propsB.length) {
        return false
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i]
        //如果对应属性对应值不相等，则返回false
        if (a[propName] !== b[propName]) {
          return false
        }
      }
      return true
    }
    //如果是数组类型
    if (classNameA == '[object Array]') {
      if (a.toString() == b.toString()) {
        return true
      }
      return false
    }
  }

  // console.log(class2type)
  console.log(ObjType({}))
  console.log(ObjType([]))
  console.log(ObjType(Symbol()))
  console.log(ObjType(null))
  console.log(ObjType(undefined))
  console.log('String object or string, ', ObjType(String("Str")), ObjType(""))
  console.log('Number object or number, ', ObjType(Number(222222)), ObjType(23))
  console.log('Boolean object or boolean, ', ObjType(Boolean(false)), ObjType(true))
  console.log(ObjType(() => { }))
  console.log(ObjType(new RegExp()))
  console.log(ObjType(new Error()))
  console.log(ObjType(new Date()))
  console.log('set map,', ObjType(new Set()), ObjType(new Map()))
  console.log('isPlainObject', isPlainObject({ a: 1, b: 2 }))
  console.log('isPlainObject', isPlainObject(new Date()))
  console.log('isPrimitive', isPrimitive(1), isPrimitive(new Date()))
})()

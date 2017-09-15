/**
 * Created by hebo on 2017/9/8.
 */
/**
 * util 模块
 * util 模块主要用于支持 Node.js 内部 API 的需求。 大部分实用工具也可用于应用程序与模块开发者。
 */
const util = require('util');
const fs = require('fs');

console.log(process)
// console.dir(util);


/***************/

// async function fn() {
//     return await Promise.resolve('hello world');
// }
// const callbackFunction = util.callbackify(fn);
//
// callbackFunction((err, ret) => {
//     if (err) throw err;
//     console.log(ret);
// });

/***************/


// run: NODE_DEBUG=foo  node util.js

const debuglog = util.debuglog('foo');

debuglog('hello from foo [%d]', 123);

/***************/

// util.deprecate() 方法会包装给定的 function 或类，并标记为废弃的。
const put = util.deprecate(function () {
    for (let i = 0, len = arguments.length; i < len; ++i) {
        process.stdout.write(arguments[i] + '\n');
    }
}, 'util.puts: 使用 console.log 代替');

put('put something');
put('put 2');

/***************/

// 如果占位符没有对应的参数，则占位符不被替换。
console.log(util.format('%s:%s', 'foo'));
// 返回: 'foo:%s'


// 如果有多余参数 ，则多出的参数会被转成字符串
console.log(util.format('%s:%s', 'foo', 'bar', 'baz'));
// 'foo:bar baz'


/***************/

// 从一个构造函数中继承原型方法到另一个。 constructor 的原型会被设置到一个从 superConstructor 创建的新对象上。
// 建议使用es6 class extend
// util.inherits()

/***************/

//util.inspect() 方法返回 object 的字符串表示，主要用于调试。 附加的 options 可用于改变格式化字符串的某些方面。
// options
//      showHidden      是否展示不可枚举属性以及symbol属性
//      depth           递归次数
//      colors          打印样式
//      customInspect   是否调用object上自定义的inspect
//      showProxy       Proxy 对象的对象和函数会展示它们的 target 和 handler 对象
//      maxArrayLength  格式化时数组和 TypedArray 元素能包含的最大数量
//      breakLength     对象的键被拆分成多行的长度
console.log(util.inspect(util, {showHidden: true, depth: null, breakLength: 60}));

// 自定义inspect

const obj = {foo: '这个不会出现在 inspect() 的输出中'};
// 自定义 custom  todo 这个有问题
obj[util.inspect.custom] = function (depth) {
    return {bar: 'baz'};
};
// 自定义inspect
obj.inspect = function (depth) {
    return {bar: 'inspect'};
};

console.log(util.inspect(obj));
// 返回: "{ bar: 'inspect' }"

/***************/

const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
    // Do something with `stats`
}).catch((error) => {
    // Handle the error.
});
/***************/

// 实验阶段
const TextEncoder = util.TextEncoder;
const TextDecoder = util.TextDecoder;

const encoder = new TextEncoder();
const decoder = new TextDecoder(/*'utf-16'*/);
const uint8array = encoder.encode('this is some data');
console.log(uint8array)
const utf9 = decoder.decode(uint8array, {steam: false});
console.log(utf9)
/***************/


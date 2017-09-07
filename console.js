/**
 * Created by hebo on 2017/9/7.
 */
const {Console} = require('console');
console.dir(console);
/**
 * console
 * @type {console.Console}
 * output   一个有write的可写流
 * err      一个有write的可写流
 */
const myConsole = new console.Console(process.stdout, process.stderr);

// 以下例子 同样可行 会打印到文件中 //
// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// const myConsole = new console.Console(output, errorOutput);

myConsole.log('你好世界');
// 打印: '你好世界'到 out。
myConsole.log('你好%s', '世界');
// 打印: '你好世界'到 out。
myConsole.error(new Error('错误信息'));
// 打印: [Error: 错误信息]到 err。

const name = '描述';
myConsole.warn(`警告${name}`);
// 打印: '警告描述'到 err。

/***************/

/**
 * 正常的assert用法，但assert非真断言会中断后面message的打印
 */
// console.assert(true, 'does nothing');
// 通过

// console.assert(false, 'Whoops %s', 'didn\'t work');
// AssertionError: Whoops didn't work

/**
 *
 *  在浏览器中，用非真的断言调用 console.assert() 会导致 message 被打印到控制台但不会中断后续代码的执行。 而在 Node.js 中，非真的断言会导致抛出 AssertionError。

 可以通过扩展 Node.js 的 console 并重写 console.assert() 方法来实现与浏览器中类似的功能。

 */
const myConsoleAssert = Object.create(console, {
    assert: {
        value: function assert(assertion, message, ...args) {
            try {
                console.assert(assertion, message, ...args);
            } catch (err) {
                console.error(err.stack);
            }
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});

// 重写过后的console 可以再非真的时候打印message 也不会阻断后面的执行
myConsoleAssert.assert(false, '会打印这个消息，但不会抛出错误');
myConsoleAssert.log('这个也会打印');


/***************/
// 新增 v8.3.0

// console.clear()

// console.count()

// console.countReset();

/***************/

console.dir(console, {
    showHidden: false, // default: false, 是否显示不可枚举属性和symbol属性
    colors: true, // default false, 打印的时候是否为彩色
    depth: 2 // default: 2  表示递归层级，null为无限，该参数用于表示对一个对象N层级进行无线展开
});

/***************/

const code = 5;
console.error('error #%d', code);
// 打印: error #5 到 stderr
console.error('error', code);
// 打印: error 5 到 stderr

/***************/

// console.info === console.log

/***************/

console.time('test')
console.timeEnd('test')

/***************/
//
console.trace('show trace')

/***************/
// console.error的别名
console.warn('warn')



/**
 * Created by hebo on 2017/9/12.
 */
const stream = require('stream');
const fs = require("fs");
/**
 *  stream 类型：
 *   readable  可读
 *   writable  可写
 *   duplex    可读可写
 *   transform  在读写过程中可以修改和变换数据的 Duplex 流
 */

/**
 *  所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
 *
 *  data - 当有数据可读时触发。
 *  end - 没有更多的数据可读时触发。
 *  error - 在接收和写入过程中发生错误时触发。
 *  finish - 所有数据已被写入到底层系统时触发。
 */


/**
 * readable streams 可读流
 */

let readableData = '';
let readerStream = fs.createReadStream('_stream1.txt');
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
    readableData += chunk;
});
//
readerStream.on('end', function () {
    console.log(readableData);
});

readerStream.on('error', function (err) {
    console.log(err.stack);
});


/**
 * writable streams 可写流
 *
 *   事件 on(eventName)：
 *   close
 *   drain
 *   pipe
 *   finish
 *   error
 *   unpipe
 *
 *   writable.cork()
 *   writable.uncork()
 *   writable.end();
 *   writable.setDefaultEncoding(encoding)
 *   writable.write()
 */

let writedata = '测试写入流' + new Date();
let writerStream = fs.createWriteStream('_stream2_output.txt');


// 处理流事件 --> data, end, drain and error
writerStream.on('finish', function () {
    console.log("写入完成。");
});
writerStream.on('pipe', function (src) {
    console.log('触发pipe事件');
});
writerStream.on('error', function (err) {
    console.log(err.stack);
});

// 写入
writerStream.write(writedata, 'UTF8');
// 标记文件末尾
// writerStream.end();

// 将一个读流 通过pipe写入一个 可写流， 会触发pipe事件
readerStream.pipe(writerStream);

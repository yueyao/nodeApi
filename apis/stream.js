/**
 * Created by hebo on 2017/9/12.
 */
const {PassThrough, Duplex, Readable, Transform, Writable} = require('stream');
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
 * Readable stream
 *
 *  readable.on('data',cb)
 *
 *  readable.pause()   // 停止flowing模式
 *  readable.resume()  // 重新开启 flowing模式
 *
 *  有两种模式之一：flowing 和 paused 。

 在 flowing 模式下， 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用。

 在 paused 模式下，必须显式调用 stream.read() 方法来从流中读取数据片段。

 模式切换：
 换为flowing模式
 监听 'data' 事件。
 调用 stream.resume() 方法。
 调用 stream.pipe() 方法将数据发送到 Writable。
 换为paused模式：
 如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法实现。
 如果存在管道目标，可以通过取消 'data' 事件监听，并调用 stream.unpipe() 方法移除所有管道目标来实现。
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
readerStream.on('readable', function () {
    console.log('readable: ', readerStream.read())
});
readerStream.on('error', function (err) {
    console.log(err.stack);
});

const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// flowing 现在为 false

pass.on('data', (chunk) => {
    console.log(chunk.toString());
});
pass.write('ok'); // 不会触发 'data' 事件
pass.resume(); // 只有被调用了才会触发 'data' 事件

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

let writedata = '测试写入流~~' + new Date();
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
writerStream.on('unpipe', function (src) {
    console.log('触发unpipe事件');
});


// 将一个读流 通过pipe写入一个 可写流， 会触发pipe事件
readerStream.pipe(writerStream); // 或者 自己写入一个数据：  writerStream.write(writedata, 'UTF8');

// 取消一个写入流
// readerStream.unpipe(writerStream);

// 标记文件末尾  之后不能再写入
// writerStream.end();


let writerStream2 = fs.createWriteStream('test_cork_uncork.txt');


writerStream2.on('finish', function () {
    console.log("写入完成。");
});
// 方法将强制所有写入数据都存放到内存中的缓冲区里
writerStream2.cork();

writerStream2.write('some data');
writerStream2.write('\n test cork uncork');

process.nextTick(() => {
    // 从缓冲区取出，
    writerStream2.uncork()
});


///////////////
// 创建一个新的写入流
class MyWritable extends Writable {
    constructor(options) {
        // Calls the stream.Writable() constructor
        super(options);
        // ...
    }

    // _write 必须实现
    _write(chunk, encoding, callback) {
        if (chunk.toString().indexOf('a') >= 0) {
            callback(new Error('chunk is invalid'));
        } else {
            callback();
        }
    }
}

// or 简化方式
const myWritable = new Writable({
    write(chunk, encoding, callback) {
        // ...
    },
    writev(chunks, callback) {
        // ...
    }
});


///////////////

class MyReadable extends Readable {
    constructor(options) {
        // Calls the stream.Readable(options) constructor
        super(options);
        // ...
    }

    _read(size) {
        return 'some thing'
    }
}


class MyDuplex extends Duplex {
    constructor(options) {
        super(options);
        // ...
    }

    _write() {

    }

    _read() {

    }
}


// All Transform streams are also Duplex Streams
const myTransform = new Transform({
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        // Coerce the chunk to a number if necessary
        chunk |= 0;

        // Transform the chunk into something else.
        const data = chunk.toString(16);
        // console.log('tostring', data);
        // Push the data onto the readable queue.
        callback(null, '0'.repeat(data.length % 2) + data);
    }
});

myTransform.setEncoding('ascii');
myTransform.on('data', (chunk) => console.log(chunk));

myTransform.write(1);
// Prints: 01
myTransform.write(10);
// Prints: 0a
myTransform.write(100);
// Prints: 64
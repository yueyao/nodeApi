/**
 * Created by hebo on 2017/9/8.
 */
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
console.log(buf1);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
console.log(buf2);


// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
buf3.fill(1)
console.log(buf3);

// from(ARRAY)
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('test');
console.log(buf5);

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('test', 'binary');
console.log(buf6)


/***************/
// 速度比较

//当调用 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 时，被分配的内存段是未初始化的（没有用 0 填充）
//虽然这样的设计使得内存的分配非常快，但已分配的内存段可能包含潜在的敏感旧数据。
Buffer.allocUnsafeSlow(10)
console.time('alloc unsafe')
let t = Buffer.allocUnsafe(10000);
// t.fill(0)
console.timeEnd('alloc unsafe')
console.time('alloc')
let t1 = Buffer.alloc(10000, 1)
console.timeEnd('alloc')

// --zero-fill-buffers 可以强制新分配的buffer自动用0填充

/***************/
// from(str,encoding)
// ascii  utf8 utf16le ucs2 base64 latin1 binary hex
const buf = Buffer.from('hello world', 'ascii');

// 输出 68656c6c6f20776f726c64
console.log(buf.toString('hex'));

// 输出 aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));

// from(buffer)
const bufb = Buffer.from(buf);


/***************/
// from(arrayBuffer[, byteOffset[, length]])

// from 当传入一个 TypedArray 实例的 .buffer 属性的引用时，共享内存
var b = new ArrayBuffer(4);
var v1 = new Uint8Array(b);
var copy = Buffer.from(b);
console.log('first, typeArray: ', v1) // first, typeArray:  Uint8Array [ 0, 0, 0, 0 ]
console.log('first, Buffer: ', copy) // first, Buffer:  <Buffer 00 00 00 00>
v1[0] = 12
console.log('second, typeArray: ', v1) // second, typeArray:  Uint8Array [ 12, 0, 0, 0 ]
console.log('second, Buffer: ', copy) // second, Buffer:  <Buffer 0c 00 00 00>

/***************/

const str = '\u00bd + \u00bc = \u00be';
console.log(Buffer.byteLength(str, 'utf8'));

/***************/


const buf11 = Buffer.from('1234');
const buf12 = Buffer.from('0123');
const arr = [buf11, buf12];

// 输出: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (结果相当于: [buf2, buf1])
console.log(arr.sort(Buffer.compare));

/***************/

const buf21 = Buffer.alloc(10);
const buf22 = Buffer.alloc(14);
const buf23 = Buffer.alloc(18);
const totalLength = buf21.length + buf22.length + buf23.length;

// 输出: 42
console.log(totalLength);

const bufA = Buffer.concat([buf21, buf22, buf23], totalLength);

// 输出: <Buffer 00 00 00 00 ...>
console.log(bufA);

// 输出: 42
console.log(bufA.length);

/***************/


console.log(Buffer.isBuffer(bufA))
console.log(Buffer.isEncoding('utf-8'))
console.log(Buffer.poolSize)

// buf[index]

const stra = 'Node.js';
const bufbb = Buffer.allocUnsafe(stra.length);

for (let i = 0; i < stra.length; i++) {
    bufbb[i] = stra.charCodeAt(i);
}

// 输出: Node.js
console.log(bufbb.toString('ascii'));

/***************/
// buffer 属性指向创建该 Buffer 的底层的 ArrayBuffer 对象
const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);

console.log(buffer.buffer === arrayBuffer);
// 输出: true

/***************/

//  buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

const bufc1 = Buffer.from('ABC');
const bufc2 = Buffer.from('BCD');
const bufc3 = Buffer.from('ABCD');


// 输出: 0 顺序相同
console.log(bufc1.compare(bufc1));

// 输出: -1 target 排在后面
console.log(bufc1.compare(bufc2));

// 输出: -1 target 排在后面
console.log(bufc1.compare(bufc3));


// 输出: 1 target排在前面
console.log(bufc2.compare(bufc1));


/***************/
// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])


const bufp1 = Buffer.allocUnsafe(26);
const bufp2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
    // 97 是 'a' 的十进制 ASCII 值
    bufp1[i] = i + 97;
}
// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
bufp1.copy(bufp2, 8, 16, 20);

// 输出: !!!!!!!!qrst!!!!!!!!!!!!!
console.log(bufp2.toString('ascii', 0, 25));

/***************/
// buf.entries()
const bufen = Buffer.from('buffer');

// 输出:
//   [0, 98]
//   [1, 117]
//   [2, 102]
//   [3, 102]
//   [4, 101]
//   [5, 114]
for (const pair of bufen.entries()) {
    console.log(pair);
}

/***************/

// buf.equals(otherBuffer)
const bufe1 = Buffer.from('ABC');
const bufe2 = Buffer.from('414243', 'hex');
const bufe3 = Buffer.from('ABCD');

// 输出: true
console.log(bufe1.equals(bufe2));

// 输出: false
console.log(bufe1.equals(bufe3));

/***************/
// fill
const fb = Buffer.allocUnsafe(50).fill('h');

/***************/

// buf.includes('is')

// buf.indexOf('is')
// buf.lastIndexOf('is')

// for (const key of buf.keys()) {
//     console.log(key);
// }

/***************/
// 从 buf 中指定的 offset 读取一个32位浮点值
const buff = Buffer.from([1, 2, 3, 4]);
console.log(buff.length)
// 输出: 2.387939260590663e-38
console.log(buff.readFloatBE());

// 输出: 1.539989614439558e-36
console.log(buff.readFloatLE());

// 抛出异常: RangeError: Index out of range
// console.log(buff.readFloatLE(1));

// 警告: 读取超出 buffer 的最后一位字节！
// 这会导致内存区段错误！不要这么做！
// console.log(buff.readFloatLE(1, true));


// 从 buf 中指定的 offset 读取一个有符号的8位整数值。
// 输出: 1
console.log(buff.readInt8(0));

// 从 buf 中指定的 offset 读取一个有符号的16位整数值
console.log(buff.readInt16BE());

// readInt16LE
// readInt32BE
// readInt32LE
// readIntBE
// readIntLE
// readUInt8
// readUInt16BE
// readUInt16LE
// readUInt32BE
// readUInt32LE
// readUIntBE
// readUIntLE


/***************/

// buf.slice()

//将 buf 解析为一个无符号16位的整数数组，并且以字节顺序原地进行交换。
// buf.swap16()
// buf.swap32()
// buf.swap64()


// buf.toJSON()
// buf.toString()

// buf.values()


// buf.write()


/***************/

// 写入操作
// buf.writeInt8()
// buf.writeInt16BE()
// buf.writeInt16LE()
// buf.writeInt32BE()
// buf.writeInt32LE()
// buf.writeIntBE()
// buf.writeIntLE()
// buf.writeUInt8()
// buf.writeUInt16BE()
// buf.writeUInt16LE()
// buf.writeUInt32BE()
// buf.writeUInt32LE()
// buf.writeUIntBE()
// buf.writeUIntLE()

/***************/
// 将给定的 Buffer 或 Uint8Array 实例从一个字符编码重新编码到另一个字符
const newBuf = buffer.transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// 输出: '?'
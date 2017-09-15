/**
 * Created by hebo on 2017/9/15.
 */
const chalk = require('chalk');
const log = console.log;
/**
 * process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。
 * 作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。
 */

// process.arch属性返回一个标识Node.js在其上运行的处理器架构的字符串。例如 'arm', 'ia32', or 'x64'
log(chalk.green(`This processor architecture is ${process.arch}`));

// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数
// 0个参数为execPath   1参数为执行文件
log(chalk.green(`args : ${process.argv}`));

log(chalk.green(`execArgv: ${process.execArgv}`));

// 如果Node.js进程是由IPC channel(see the Child Process documentation) 方式创建的
log(process.channel);
// 如果IPC channel保持连接 则为true
// process.connected
// 关闭到父进程的IPC频道
// process.disconnect()
// 发消息到父进程
// process.send()


// 变更进程目录
// process.chdir(directory)

// 此对象描述了用于编译当前Node.js执行程序时涉及的配置项信息
console.dir(process.config)

// process.cpuUsage()方法返回包含当前进程的用户CPU时间和系统CPU时间的对象  单位微秒
log(chalk.green(JSON.stringify(process.cpuUsage())))

//
log(chalk.green(process.cwd()));

// 终止进程
//process.exit(1);

log(`exit code:${process.exitCode}`);

// 返回Node.js进程的<有效>数字标记的组身份
log(chalk.green(`Current gid: ${process.getegid()}`));

// 返回Node.js进程的有效数字标记的用户身份
log(chalk.green(`Current uid: ${process.geteuid()}`));

// 返回Node.js进程的数字标记的组身份
log(chalk.green(`Current gid: ${process.getgid()}`));

// 方法返回数组，其中包含了补充的组ID
log(chalk.green(`Current groups: ${process.getgroups()}`));


//process.hrtime()返回的时间，都是相对于过去某一时刻的值，与一天中的时钟时间没有关系，因此不受制于时钟偏差。
// 此方法最主要的作用是衡量间隔操作的性能
// process.hrtime()

// process.kill()方法将signal发送给pid标识的进程。
// process.kill(process.pid, 'SIGHUP');

//

// 获取require.main 入口
log(process.mainModule)
// 内存状况 单位为字节
log(process.memoryUsage());

// process.nextTick()方法将 callback 添加到"next tick 队列"一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。
process.nextTick(function () {
    log(chalk.green('use nextTick'))
});

log(chalk.green(process.pid));

log(chalk.green(process.platform))

log(chalk.green(JSON.stringify(process.release)))

// process.stderr
// process.stdin
// process.stdout
process.stdin.pipe(process.stdout);

// process.title

// process.version

// Node.js和其依赖的版本信息
console.log(process.versions);

// 返回当前晋城运行时长  秒
// process.uptime()
/**
 * Process Events
 * process 对象是EventEmitter的实例.
 *
 * beforeExit
 *
 */

process.on('beforeExit', function () {
    console.log('beforeExit')
});

// 如果Node.js进程是由IPC channel的方式创建的(see the Child Process and Cluster documentation)，当IPC channel关闭时，会触发'disconnect'事件。
process.on('disconnect', function () {
    console.log('disconnect')
});

// 当子进程收到父进程的的消息时(消息通过childprocess.send()发送）， 会触发'message'事件。
process.on("message", function () {

});


process.on('exit', function (code) {
    console.log(`About to exit with code: ${code}`);
});

/**
 * 如果有Promise被rejected 并且此Promise绑定了一个 catch，则触发该事件
 */
process.on('rejectionHandled', function (p) {
    log(chalk.bgGreen.gray('rejectionHandled:'), p)
});

/**
 * 如果有Promise被rejected 并且此Promise 么有绑定错误处理器 ，则触发该事件
 */
process.on('unhandledRejection', function (reason, p) {
    log(chalk.bgYellow.gray('unhandledRejection :'), reason)
});

/---------test promise rejection event------------/
let p = (new Promise(function (resolve, reject) {
    reject(new Error('Error from promise by reject'));
    // 或者通过 throw 的方式抛出，效果相同
    // throw new Error('Error from promise by throw');

}));

setTimeout(function () {
    p.catch(function (e) {
        console.error('Catch in Promise', e);
    });
}, 1e3);

// rejectionHandled 事件的触发条件为，promise 没有被及时 catch 到错误并触发了 unhandledRejection 事件，
// 在这之后的一段时间里，promise 错误又被处理了，此时触发 rejectionHandled

/---------------------------/


process.on('uncaughtException', function (err) {
    log(chalk.bgRed.black('uncaughtException: '), err)
});
/-------------test uncaughtException--------------/
nonexistentFunc();
/---------------------------/


process.on('warning', (warning) => {
    console.warn(warning.name);    // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack);   // Print the stack trace
});


/**
 * Signal Events   标准POSIX的信号事件
 *
 * http://man7.org/linux/man-pages/man7/signal.7.html
 *
 */
process.on('SIGINT', () => {
    console.log('Received SIGINT.  Press Control-D to exit.');
});

// 在大多数终端程序中发送SIGINT信号的简单方法是<Ctrl>-C。


// process.abort()

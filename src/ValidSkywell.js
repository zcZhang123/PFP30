var http = require('http');

// 本地服务启动，生成钱包后，运行

var data = {
    jsonrpc: '2.0',
    method: 'jt_sendTransaction',
    params: [
        {
            from: 'jfqiMxoT228vp3dMrXKnJXo6V9iYEx94pt',
            to: 'jfyiDN3XrbdPuAzWSwnx49DNsdkX6jqz12',
            value: '1'
        }
    ],
    id: 1
}
var content = JSON.stringify(data)

var options = {
    host: 'localhost',
    port: '7545',
    method: 'POST',
    path: '/v1/jsonrpc',
    headers: {
        "Content-Type": 'application/json',
        'Content-Length': content.length
    }
}

var req = http.request(options, function (res) {
    var _data = '';
    res.on('data', function (chunk) {
        _data += chunk;
    });
    res.on('end', function () {
        console.log("\n--->>\npostresult:", _data)
        resolve(JSON.parse(_data))
    });
});
req.write(content);
req.end();

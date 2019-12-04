var keypairs = require('swtc-keypairs')

console.log('可以由swtc-keypairs生成ed25519编码的井通密钥')
console.log('\n')

// 生成私钥
const defaultSecret = keypairs().generateSeed()
const ed25519Secret = keypairs().generateSeed({ algorithm: 'ed25519' })
console.log('生成ecdsa编码的私钥: ' + defaultSecret)
console.log('生成ed25519编码的私钥: ' + ed25519Secret)
console.log('\n')

var jtlib = require('jingtum-lib')
var jingTumWallet = jtlib.Wallet;

// jingtum-lib验证私钥合法性
const isValidDefaultSecretByJingTumLib = jingTumWallet.isValidSecret(defaultSecret)
const isValidED25519SecretByJingTumLib = jingTumWallet.isValidSecret(ed25519Secret)
console.log('jingtum-lib验证ecdsa编码的私钥: ' + isValidDefaultSecretByJingTumLib)
console.log('jingtum-lib验证ed25519编码的私钥: ' + isValidED25519SecretByJingTumLib)
console.log('\n')

// jingtum-lib根据私钥生成钱包
var w1 = jingTumWallet.generate();
const jingtumLibWalletByDefaultSecret = jingTumWallet.fromSecret(defaultSecret)
const jingtumLibWalletByEd25519Secret = jingTumWallet.fromSecret(ed25519Secret)
console.log('jingtum-lib通过ecdsa编码的私钥生成的钱包: ')
console.log(jingtumLibWalletByDefaultSecret)
console.log('jingtum-lib通过ed25519编码的私钥生成的钱包: ')
console.log(jingtumLibWalletByEd25519Secret)
console.log('\n')

// jingtum-lib验证地址合法性
const isValidAddress = jingTumWallet.isValidAddress(jingtumLibWalletByDefaultSecret.address)
console.log('jingtum-lib通过ecdsa编码的私钥生成的钱包地址合法性: ' + isValidAddress)
console.log('jingtum-lib无法通过ed25519编码的私钥生成钱包')
console.log('\n')


const testWallet = { address: 'jfyiDN3XrbdPuAzWSwnx49DNsdkX6jqz12', secret: 'spmGWL3xxgQre38Lubo37BUi8q13D' }
const ed25519Wallet = { address: 'jHGFiq39aGd4HoQRC2ThuFLomvZ4GSKoNQ', secret: 'sEdTEDG1niRHFdKicouTDkVWqf8YRsx' }


// 测试jingtum-lib使用本地签名提交支付
// var Remote = jtlib.Remote;
// var remote = new Remote({
//     server: 'wss://s.jingtum.com:5020', local_sign: true
// });
// remote.connect(function (err, result) {
//     if (err) {
//         return console.log('err:', err);
//     }
//     var tx = remote.buildPaymentTx({
//         account: ed25519Wallet.address,
//         to: testWallet.address,
//         amount: {
//             "value": 1,
//             "currency": "SWT",
//             "issuer": ""
//         }
//     });
//     tx.setSecret(ed25519Wallet.secret);
//     tx.addMemo('测试 ed25519编码钱包使用jingtum_lib转账');//可选
//     tx.submit(function (err, result) {
//         if (err) { console.log('err:', err); remote.disconnect(); }
//         else if (result) {
//             console.log('----------------------------------------------------------------------------------------------------------------')
//             console.log('test jingtum-lib :', result);
//             console.log('\n')
//             remote.disconnect()
//         }
//     });
// });

// 测试jingtum-lib不使用本地签名提交支付
var JRemote = jtlib.Remote;
var jRemote = new JRemote({
    server: 'wss://s.jingtum.com:5020', local_sign: false
});
jRemote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var tx = jRemote.buildPaymentTx({
        account: ed25519Wallet.address,
        to: testWallet.address,
        amount: {
            "value": 1,
            "currency": "SWT",
            "issuer": ""
        }
    });
    tx.setSecret(ed25519Wallet.secret);
    tx.addMemo('测试 ed25519编码钱包使用jingtum_lib转账');//可选
    tx.submit(function (err, result) {
        if (err) { console.log('err:', err); jRemote.disconnect(); }
        else if (result) {
            console.log('----------------------------------------------------------------------------------------------------------------')
            console.log('test jingtum-lib :', result);
            console.log('\n')
            jRemote.disconnect()
        }
    });
});


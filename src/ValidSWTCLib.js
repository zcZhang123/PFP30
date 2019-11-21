var keypairs = require('swtc-keypairs')

console.log('可以由swtc-keypairs生成ed25519编码的井通密钥')
console.log('\n')

// 生成私钥
const defaultSecret = keypairs().generateSeed()
const ed25519Secret = keypairs().generateSeed({ algorithm: 'ed25519' })
console.log('生成ecdsa编码的私钥: ' + defaultSecret)
console.log('生成ed25519编码的私钥: ' + ed25519Secret)
console.log('\n')

var slib = require("swtc-lib");
var SWTCWallet = slib.Wallet;

// swtc-lib验证生成私钥合法性
const isValidDefaultSecretBySWTCLib = SWTCWallet.isValidSecret(defaultSecret)
const isValidED25519SecretBySWTCLib = SWTCWallet.isValidSecret(ed25519Secret)
console.log('swtc-lib验证ecdsa编码的私钥:  ' + isValidDefaultSecretBySWTCLib)
console.log('swtc-lib验证ed25519编码的私钥: ' + isValidED25519SecretBySWTCLib)
console.log('\n')

// swtc-lib根据私钥生成钱包
const SWTCLibWalletByDefaultSecret = SWTCWallet.fromSecret(defaultSecret)
const SWTCLibWalletByEd25519Secret = SWTCWallet.fromSecret(ed25519Secret)
console.log('swtc-lib通过ecdsa编码的私钥生成的钱包 ')
console.log(SWTCLibWalletByDefaultSecret)
console.log('swtc-lib通过ed25519编码的私钥生成的钱包 : ')
console.log(SWTCLibWalletByEd25519Secret)
console.log('\n')

// swtc-lib验证地址合法性
const isValidDefaultAddressBySWTCLib = SWTCWallet.isValidAddress(SWTCLibWalletByDefaultSecret.address)
const isValidEd25519AddressBySWTCLib = SWTCWallet.isValidAddress(SWTCLibWalletByEd25519Secret.address)
console.log('swtc-lib通过ecdsa编码的私钥生成的钱包地址合法性: ' + isValidDefaultAddressBySWTCLib)
console.log('swtc-lib通过ed25519编码的私钥生成的钱包地址合法性: ' + isValidEd25519AddressBySWTCLib)
console.log('\n')

const testEd25519Wallet = { address: 'jHGFiq39aGd4HoQRC2ThuFLomvZ4GSKoNQ', secret: 'sEdTEDG1niRHFdKicouTDkVWqf8YRsx' }
const testDefaultWallet = {
  address: 'jfyiDN3XrbdPuAzWSwnx49DNsdkX6jqz12',
  secret: 'spmGWL3xxgQre38Lubo37BUi8q13D'
}
// 测试swtc_lib提交支付
var SWTCRemote = slib.Remote;
// ed25519发起转账
// var SRemote = new SWTCRemote({
//   server: "ws://47.92.4.236:5020",
//   issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
// });
// SRemote
//   .connectPromise()
//   .then(async () => {
//     let tx = SRemote.buildPaymentTx({
//       account: testEd25519Wallet.address,
//       to: testDefaultWallet.address,
//       amount: SRemote.makeAmount(0.1)
//     });
//     let response = await tx.submitPromise(
//       testEd25519Wallet.secret,
//       "测试"
//     );
//     console.log(response);
//     SRemote.disconnect();
//   })
//   .catch(console.error);

// 向ed25519转账
var SRemote = new SWTCRemote({
  server: "ws://47.92.4.236:5020",
  issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
});
SRemote
  .connectPromise()
  .then(async () => {
    let tx = SRemote.buildPaymentTx({
      account: testDefaultWallet.address,
      to: testEd25519Wallet.address,
      amount: SRemote.makeAmount(0.1)
    });
    let response = await tx.submitPromise(
      testDefaultWallet.secret,
      "测试"
    );
    console.log(response);
    SRemote.disconnect();
  })
  .catch(console.error);

// 创建挂单
// var jlib = require('swtc-lib');
// var Remote = jlib.Remote;
// var remote = new Remote({ server: 'ws://47.92.4.236:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS' });
// remote.connectPromise()
//   .then(async () => {
//     let options = {
//       type: 'Sell',
//       account: 'jHGFiq39aGd4HoQRC2ThuFLomvZ4GSKoNQ',
//       currency: 'swt',
//       taker_pays: remote.makeAmount(0.01, 'CNY'),
//       taker_gets: remote.makeAmount(1)
//     };
//     let tx = remote.buildOfferCreateTx(options);
//     let response = await tx.submitPromise('sEdTEDG1niRHFdKicouTDkVWqf8YRsx')
//     console.log(response)
//     remote.disconnect()
//   }
//   )
//   .catch(console.error)


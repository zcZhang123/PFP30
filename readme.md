# ed25519 密钥生成方式：

> swtc-keypairs 支持生成 ed25519 编码的井通密钥

# ed25519 在井通上的支持情况：
> 使用swtc-keypairs生成ed25519编码的井通密钥

| 组件        |      测试内容      |                                          测试结果                                           |
| ----------- | :----------------: | :-----------------------------------------------------------------------------------------: |
| jingtum-lib |    fromSecret()    |                                        不支持                                         |
|             |  isValidSecret()   |                                          不支持(false)                              |
|             | PaymentTx.submit() |                             转账失败，无法验证密钥(err: invalid secret)                              |
| swtc-lib    |    fromSecret()    |                                         支持                                          |
|             |  isValidSecret()   |                                          支持（true）                                           |
|             | PaymentTx.submit() | 转账失败(message must be array of octets) |
| skywell     | jt_sendTransaction |                                        转账失败 ，不识别ed25519编码的密钥（Bad version for: sEdTJSpen5J8ZA7H4cVGDF6oSSLLW2Y expected: Family seed. ）  </br>  |

注：</br>
swtc-lib挂单、转账时都会出现message must be array of octets报错</br>
在swtc-keypairs/src/index中的ed25519的signTx()方法中注释以下代码，
> assert(Array.isArray(message), "message must be array of octets")</br>
message参照secp256k1中signTx()并非是Array，而是String,所以注释此代码</br>
在注释代码后，运行后出现 fails local checks: Transaction has bad signature 问题</br>

skywell无法识别ed25519编码的密钥</br>
jt_sendRawTransaction发起原始交易后出现：</br>
>skywell.node: http: panic serving 127.0.0.1:55494: interface conversion: interface {} is nil, not map[string]interface {}


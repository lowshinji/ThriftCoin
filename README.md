# ThriftCoin

This project was built on top of the following github repository https://github.com/tpiros/javascript-blockchain.

The current implementation works by downloading the files and running the following command in the project directory.

```
node app.js
```

The back-end application can then be interacted with at localhost:3000.
By typing in localhost:3000/mine?sender=<name-of-sender>&receiver=<name-of-receiver>&amount=<amount-to-send>, a proof of work block will mined and the main blockchain will be updated.
By simply visiting, localhost:3000, the current blockchain can be seen.

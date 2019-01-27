const crypto = require('crypto');
const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('thriftcoin-ciyus');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('ThriftCoin');

class Blockchain {
  constructor(chain = []) {
    this.chain = chain;
    this.createBlock(1, 1); // genesis block
  }

  createBlock(proof, previousHash = undefined, sender = undefined, receiver = undefined, amount = undefined) {
    this.validateTransaction(sender, receiver, amount);
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date().getTime(),
      proof,
      sender,
      receiver,
      amount,
      previousHash: previousHash ? previousHash : this.hash(JSON.stringify(this.lastBlock()))
    };

    this.chain.push(block);
    return block;
  }
  
  
  hash(block) {
    return crypto.createHmac('sha256', 'a').update(block).digest('hex');
  }

  lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(lastProof) {
    let proof = 0;
    while (!this.validProof(lastProof, proof)) {
      proof += 1;
    }
    return proof;
  }
  
  validProof(lastProof, proof) {
    let guess = `${lastProof}${proof}`;
    let guessHash = crypto.createHmac('sha256', 'a').update(guess).digest('hex');
    return guessHash.slice(0, 4) === 'abcd';
  }
}

module.exports = Blockchain;
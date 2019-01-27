const http = require('http');
const url = require('url');

const Blockchain = require('./blockchain.class');
const blockchain = new Blockchain();

const port = 3000;

const mine = (res, sender, receiver, amount) => {
  const lastBlock = blockchain.lastBlock();
  const lastProof = lastBlock.proof;
  const proof = blockchain.proofOfWork(lastProof);
  const previousHash = blockchain.hash(JSON.stringify(lastBlock));
  const block = blockchain.createBlock(proof, previousHash, sender, receiver, amount);

  const response = {
    message: 'New block forged',
    index: block.index,
    proof: block.proof,
    sender: block.sender,
    receiver: block.receiver,
    amount: block.amount,
    previousHash: block.previousHash
  };
  
  res.end(JSON.stringify(response));
};

const chain = (req, res) => {
  const response = {
    chain: blockchain.chain,
    length: blockchain.chain.length
  };
  return res.end(JSON.stringify(response));
}

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  
  switch(urlParts.pathname) {
    case '/mine':
      const sender = /(?<=sender\=)\w+(?=\&)/.exec(urlParts.query);
      const receiver = /(?<=receiver\=)\w+(?=\&)/.exec(urlParts.query);
      const amount = /(?<=amount\=)\w+/.exec(urlParts.query);
      mine(res, sender, receiver, amount);
      break;
    default :
      chain(req, res);
      break;
  }
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
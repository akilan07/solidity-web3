const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "deal giggle hobby clown fiber want alley only auction immense orbit index",
  "https://rinkeby.infura.io/v3/19b9ec0254044ed2909163137b1e00c0"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.table(accounts);
  console.log("Account used to deploy contract :: ", accounts[0]);

  const results = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi Akilan here"] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log("contrat deployed address :: ", results.options.address);

  provider.engine.stop();
};

deploy();

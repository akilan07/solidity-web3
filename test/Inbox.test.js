const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts, inbox;
let msg = "Hi Akilan";

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [msg] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deployed contract", () => {
    assert.ok(inbox.options.address);
  });

  it("can retrive message from contract", async () => {
    message = await inbox.methods.message().call();
    assert.equal(msg, message);
  });

  it("can update message in contract", async () => {
    updatedMsg = "Bye";
    await inbox.methods.setMessage(updatedMsg).send({ from: accounts[0] });
    message = await inbox.methods.message().call();
    assert.equal(updatedMsg, message);
  });
});

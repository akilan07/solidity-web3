const path = require("path");
const fs = require("fs");
const solCompiler = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(
  solCompiler.compile(JSON.stringify(input))
).contracts["Inbox.sol"].Inbox;

const App = require("rey-sdk/dist/app/client").default;
const RegistryContract = require("rey-sdk/dist/contracts/registry").default;
const config = require("./config");

const app = new App(config.BIRTHDOC_APP_ADDRESS, {
  contract: new RegistryContract(config.BLOCKCHAIN_NODE_URL,
    config.REGISTRY_CONTRACT_ADDRESS),
});

module.exports = app;

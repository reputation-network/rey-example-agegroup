/**
 * @template T
 * @param {T} gettersByPropertyName
 * @returns {T}
 */
function _(gettersByPropertyName) {
  const config = {};
  for (const propertyName of Object.keys(gettersByPropertyName)) {
    const get = gettersByPropertyName[propertyName];
    Object.defineProperty(config, propertyName, { get });
  }
  return config;
}

const config = _({
  PORT: () => process.env.PORT || "8081",
  BLOCKCHAIN_NODE_URL: () => process.env.BLOCKCHAIN_NODE_URL ||
    "https://rinkeby.infura.io/v3/8ffcffe1462c401bb2b2eaac7cc80a77",
  REGISTRY_CONTRACT_ADDRESS: () => process.env.REGISTRY_CONTRACT_ADDRESS ||
    "0xD4B80e54e3d4aFfa0D7DDe9332Aa8F4EbAAe8825",
  BIRTHDOC_APP_ADDRESS: () => process.env.BIRTHDOC_APP_ADDRESS ||
    "0x8b756515ff1929ee4388e118e53cdf1eeff5904f",

  APP_ADDRESS: () => process.env.APP_ADDRESS || `0x${"1".repeat(40)}`,
  APP_ACCOUNT_PASSWORD: () => process.env.APP_ACCOUNT_PASSWORD || "",

  HOMEPAGE_URL: () => process.env.HOMEPAGE_URL ||
    "http://localhost:8081",
  PICTURE_URL: () => process.env.PICTURE_URL ||
    "https://avatars1.githubusercontent.com/u/42174428?s=200",
  APP_URL: () => process.env.APP_URL ||
    "http://localhost:8081/data",
});


module.exports = config;
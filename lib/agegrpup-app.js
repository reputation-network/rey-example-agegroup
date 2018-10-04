const Factory = require("rey-sdk/dist/structs/factory").default;
const EthPersonalSign = require("rey-sdk/dist/sign-strategies/eth-personal").default;
const config = require("./config");
const birthdocApp = require("./birthdoc-app");
const utils = require("./utils");

const signStrategy = EthPersonalSign(config.BLOCKCHAIN_NODE_URL,
  config.APP_ADDRESS, config.APP_ACCOUNT_PASSWORD);

async function getAgeGroup(session, extraReadPermissions) {
  const bdocRp = findBirthdocReadPermission(extraReadPermissions);
  const bdoc = await getBirthdoc(bdocRp, session);
  const age = utils.dateToAge(utils.birthDateToDate(bdoc.birthdate));
  return {
    age_group: utils.ageToAgeGroup(age),
    "18+": Number(age > 18),
    "21+": Number(age > 21),
  }
}

function findBirthdocReadPermission(extraReadPermissions) {
  return extraReadPermissions
    .find((rp) => rp.source === birthdocApp.address);
}

async function getBirthdoc(readPermission, session) {
  const birthdocParams = await Factory.buildAppParams({
    request: {
      readPermission,
      session,
      counter: Date.now(),
      value: 0,
    },
    extraReadPermissions: [],
  }, signStrategy);
  const bdoc = await birthdocApp.query(birthdocParams);
  return bdoc;
}

module.exports = {
  getAgeGroup,
}

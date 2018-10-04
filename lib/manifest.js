const config = require("./config");

module.exports = {
  version: "1.0",
  name: "AgeGroup",
  description: "Returns the age group of the subject",
  homepage_url: config.HOMEPAGE_URL,
  picture_url: config.PICTURE_URL,
  address: config.APP_ADDRESS,
  app_url: config.APP_URL,
  app_reward: 0,
  app_dependencies: [config.BIRTHDOC_APP_ADDRESS],
}

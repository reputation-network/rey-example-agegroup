const express = require("express");
const path = require("path");
const config = require("./lib/config");
const reyHeaders = require("./lib/rey-headers");
const ageGroupApp = require("./lib/agegrpup-app");
const manifest = require("./lib/manifest");

const app = express();
app.get("/manifest", (req, res) => res.json(manifest));
app.get("/data", reyHeaders, async (req, res, next) => {
  try {
    const { session, extraReadPermissions } = req.rey;
    const data = await ageGroupApp.getAgeGroup(session, extraReadPermissions);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
app.use(express.static(path.resolve(__dirname, "public")));

app.listen(config.PORT, (err) => {
  if (err) {
    console.error("Error while starting:", err);
  } else {
    console.log("Server listening on port", config.PORT);
  }
});

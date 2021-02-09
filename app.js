"use strict";

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parse application/json
app.use(bodyParser.json());

app.get("/status", async (req, res) => {
    res.send("Ok.");
});

module.exports = { app };

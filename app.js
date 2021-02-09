"use strict";

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parse application/json
app.use(bodyParser.json());

app.post("/create", async (req, res) => {
    res.send("OK");
});

module.exports = { app };

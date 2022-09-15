const express = require('express');
require("dotenv").config();
const { getNft } = require('./backendHelper')

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This section will help you get a list of all the documents.
recordRoutes.route("/mintToken").get(async function (req, res) {
    let result = req.query
    console.log("body", req);
    res.json(result)

});

recordRoutes.route("/getNft").get(async function (req, res) {
    let nftAddress = req.query.nftAddress
    let nft = await getNft(nftAddress)
    res.json(nft)
});

module.exports = recordRoutes;
const express = require('express');
require("dotenv").config();
const {
    getNft
} = require('./backendHelper')
const {
    mintAndUpdate
} = require('./main')

const apiKeys = [
    '29df7ed6c340e52066fbe1f3d0d3505019863bc6'
]
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This section will help you get a list of all the documents.
recordRoutes.route("/mintToken").get(async function (req, res) {
    if (apiKeys.includes(req.query.apiKey)) {
        // Authorize access
    } else {
        return res.status(401).send('unauthorized');
    }

    if (req.body !== {}) {
        const newNftAddress = mintAndUpdate(req.body)
        return res.json({newNftAddress: newNftAddress})
    }

    let result = req.query
    console.log("body", req);
    return res.json(result)
});

recordRoutes.route("/getNft").get(async function (req, res) {
    let nftAddress = req.query.nftAddress
    let nft = await getNft(nftAddress)
    res.json(nft)
});

module.exports = recordRoutes;
const {
    updateMetadata,
    originalMetadata,
    createCache,
    mintToken
} = require("./backendHelper")

const {
    Connection,
    clusterApiUrl
} = require("@solana/web3.js");

require('dotenv').config();


async function mintAndUpdate(metadata) {
    // const newMetadata = {
    //     name: "New Newton",
    //     description: "My Updated SCIENCE NFTs",
    //     attributes: [{
    //         "trait_type": "accessory",
    //         "value": "new lamp"
    //     }]
    // }
    // const newMetadata = JSON.parse(metadata)
    console.log("metadata", metadata)
    const newMetadata = metadata
    const mint = await mintToken()
    console.log("mint result: ", mint.txId.length === 0 ? mint.txId[0] : mint.txId, "mint address: ", mint.mint.toString())

    const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
    const connection = new Connection(rpcHost);


    while (true) {
        const result = await connection.getSignatureStatus(
            mint.txId[0],
            {
                searchTransactionHistory: true,
            }
        )
        if (result.value.confirmationStatus === 'finalized') {
            console.log("transcation finalized")
            break
        }
    }
    const updateResponse = await updateMetadata(mint.mint.toString(), newMetadata)
    console.log("update response: ", updateResponse)

    return mint.mint.toString()
}

module.exports = {
    mintAndUpdate
};
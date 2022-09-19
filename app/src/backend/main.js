const {
    updateMetadata,
    originalMetadata,
    createCache,
    mintToken,
    waitTxIsFinalized,
    getNft
} = require("./backendHelper")

const {
    Connection,
    clusterApiUrl
} = require("@solana/web3.js");

require('dotenv').config();


async function mintAndUpdate(metadata) {
    console.log("metadata", metadata)
    const newMetadata = metadata
    const mint = await mintToken()
    console.log("mint result: ", mint.txId.length === 0 ? mint.txId[0] : mint.txId, "mint address: ", mint.mint.toString())

    const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
    const connection = new Connection(rpcHost);
    await waitTxIsFinalized(connection, mint.txId[0])

    const updateResponse = await updateMetadata(mint.mint.toString(), newMetadata)
    const updateTxHash = updateResponse.response.signature
    console.log("update response: ", updateResponse)
    await waitTxIsFinalized(connection, updateTxHash)

    const nftData = await getNft(mint.mint.toString())
    if (nftData.json === metadata){
        console.log("successfully minted and updated ", mint.mint.toString())
        return mint.mint.toString()
    } else {
        console.log("an error has ocurred updating ", nftData)
        return false
    }
}

module.exports = {
    mintAndUpdate
};
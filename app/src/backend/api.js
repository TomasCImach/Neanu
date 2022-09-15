const express = require("express");
const cors = require('cors');
require("dotenv").config();

const isLocalServer = false;

console.log("isLocal", isLocalServer);

if (isLocalServer) {
    const PORT = 8001;
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(require('./record'));
    
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
} else {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(require('./record'));
    app.listen(process.env.PORT, () => {    
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
}
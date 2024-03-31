const cluster = require("node:cluster");
const os = require("os");
const express = require("express");
const process = require("node:process");

const totalCPUs = os.cpus().length;
const altTotalCPUs = os.availableParallelism();

// console.log(totalCPUs);     // return 8
// console.log(altTotalCPUs);  // return 8

if (cluster.isPrimary){
    // Creating worker processes
    for(let i = 0; i < totalCPUs; i++){
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 8000;

    app.get("/", (req, res) => {
        return res.json({
            message: `Hello from Express Server ${process.pid}`
        })
    });

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

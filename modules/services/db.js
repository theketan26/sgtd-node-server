require("dotenv").config();
const mongoose = require('mongoose');
const URI = process.env.DB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

module.exports = run;

const mongoose = require('mongoose');
const uri = "mongodb+srv://theketan26:b8qhj0RrXHsju40J@sgtddb.cp7r5xy.mongodb.net/?retryWrites=true&w=majority&appName=sgtddb";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

module.exports = run;

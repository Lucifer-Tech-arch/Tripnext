const mongoose = require("mongoose");
const mongourl = 'mongodb://127.0.0.1:27017/wonderlust';
const initdata = require("./data.js");
const listing = require("../models/listings.js")

main().then(()=> {
    console.log("connection established");
}).catch((err) => {
    console.log(err);
})

async function main() {
   await mongoose.connect(mongourl);
}

const initDB = async () => {
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "687bbadc2593778ea928bd67"
    }));
    await listing.insertMany(initdata.data);
    console.log("data was initialized!");
}

initDB();
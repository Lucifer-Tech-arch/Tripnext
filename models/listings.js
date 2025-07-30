const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")
const User = require("./users.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["rooms","mountains","castles","iconic_cities","farms","amazing_pools","arctic","beaches","religious_places","hills","igloos"]
    }
})

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
})

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;
const review = require("../models/reviews.js");
const listing = require("../models/listings.js");
const mongoose = require("mongoose");

module.exports.createreview =  async(req,res) => {
    let listing1 = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing1.reviews.push(newReview);
    await newReview.save();
    await listing1.save();
    console.log("new review saved");
    req.flash("success","Review added successfully!");
    res.redirect(`/listings/${listing1._id}`);
};

module.exports.destroyreview =  async(req,res) => {
    let {id,reviewID} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews : new mongoose.Types.ObjectId(reviewID)}})
    await review.findByIdAndDelete(reviewID);
    req.flash("success","Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
};
//const review = require("../models/reviews.js");
const express = require("express")
//const listing = require("../models/listings.js");
const router = express.Router({ mergeParams: true });
//const mongoose = require("mongoose");
const { isloggedin, isauthor } = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

//Review post route
router.post("/",isloggedin,reviewcontroller.createreview);

//review delete route
router.delete("/:reviewID",isloggedin,isauthor,reviewcontroller.destroyreview);

module.exports = router;
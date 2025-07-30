const listing = require("./models/listings");
const review = require("./models/reviews");

//login 
module.exports.isloggedin = (req,res,next) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

//saving previous route and redirect
module.exports.saveredireecturl = (req,res,next) => {
  if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

//owner aurthorisation
module.exports.isowner = async(req,res,next) => {
  let {id} = req.params;
  let lisiting = await listing.findById(id);
  if(!lisiting.owner.equals(res.locals.curruser._id)) {
    req.flash("error","You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
} 

module.exports.isauthor = async(req,res,next) => {
  let {id,reviewID} = req.params;
  let foundReview = await review.findById(reviewID);
  if (!foundReview.author.equals(res.locals.curruser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
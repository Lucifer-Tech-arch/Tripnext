const Lisitng = require("../models/listings")

module.exports.index = async (req, res) => {
    const searchedfield = req.query.title;
     let filter = {};
    if (searchedfield && typeof searchedfield === "string") {
        filter.title = { $regex: searchedfield, $options: "i" };
    }
    const alllistings = await Lisitng.find(filter);
    res.render("listings/index.ejs", { alllistings});
};

module.exports.category = async(req,res) => {
    const category = req.params.category;
    const catlistings = await Lisitng.find({category: category});
    res.render("listings/category.ejs",{catlistings,category});
}

module.exports.newlisitngform = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showlisitng = async (req, res) => {
    let { id } = req.params;
    let list = await Lisitng.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");
    if (!list) {
        req.flash("error", "Listing Does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { list});
};

module.exports.createnewlisting = async (req, res, next) => {
    //let {title,description,image,price,location,country} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Lisitng(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listings");

};

module.exports.editlistingform = async (req, res, next) => {
    try {
        let { id } = req.params;
        let list = await Lisitng.findById(id);
        let orignalimageurl = list.image.url;
        orignalimageurl = orignalimageurl.replace("/upload","/upload/h_100,w_250");
        res.render("listings/edit.ejs", { list,orignalimageurl });
    } catch (err) {
        next(err);
    }
}

module.exports.updatelisting =  async (req, res) => {
    let { id } = req.params;
    let listing =  await Lisitng.findByIdAndUpdate(id, { ...req.body.listing }, {
        new: true,
        runValidators: true
    });
    if(typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroylisitng =  async (req, res) => {
    let { id } = req.params;
    let deleteditem = await Lisitng.findByIdAndDelete(id);
    console.log(deleteditem);
    req.flash("success", "Listing Deleted successfully!");
    res.redirect("/listings");

};
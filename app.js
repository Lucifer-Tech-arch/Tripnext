if(process.env.NODE_ENV != "productions"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
//const mongourl = 'mongodb://127.0.0.1:27017/wonderlust';
const dburl = process.env.ATLASDB_TOKEN;
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const Listingrouter = require("./routes/listing.js");
const Reviewrouter = require("./routes/review.js");
const Userrouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstretagy = require("passport-local");
const User = require("./models/users.js");
const { deserialize } = require("v8");
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600
})

store.on("error",() => {
    console.log("error in mongo session store");
})

const sessionoptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

app.use(session(sessionoptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstretagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().then(() => {
    console.log("connection established");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dburl);
}

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    res.locals.query = req.query;
    next();
})

app.use("/listings",Listingrouter);
app.use("/listings/:id/reviews",Reviewrouter);
app.use("/",Userrouter);


/*let validatelisting = (req,res,next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error) {
        res.status(400).render("listings/error.ejs",{err:error});
    }
}*/

/*let validatereview = (req,res,next) => {
    let result = reviewSchema.validate(req.body);
    console.log(result);
    if(result.error) {
        res.status(400).render("listings/error.ejs");
}
}*/

//home route
app.get("/", (req, res) => {
    res.redirect("/listings");
})

app.use((err, req, res, next) => {
    res.render("listings/error.ejs", { err });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})
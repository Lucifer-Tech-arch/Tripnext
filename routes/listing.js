const express = require("express");
/*const listing = require("../models/listings.js");*/
const router = express.Router();
const { isloggedin, isowner } = require("../middleware.js");
const lisitngcontroller = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

router 
   .route("/")
   .get(lisitngcontroller.index)
   .post(isloggedin,upload.single("listing[image]"),lisitngcontroller.createnewlisting)

router
   .route("/category/:category")
   .get(lisitngcontroller.category);

//New route
router.get("/new",isloggedin,lisitngcontroller.newlisitngform);

router
   .route("/:id")
   .get(lisitngcontroller.showlisitng)
   .put(isloggedin, isowner,upload.single("listing[image]"),lisitngcontroller.updatelisting)
   .delete( isloggedin, isowner,lisitngcontroller.destroylisitng)

//Edit route
router.get("/:id/edit",isloggedin, isowner,lisitngcontroller.editlistingform);


module.exports = router;
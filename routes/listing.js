const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createlisting),
  );

//new route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
  .route("/:id")
  .get(wrapAsync(listingController.showlisting))
  .put(
    isLoggedIn,
     upload.single("listing[image]"),
    validateListing,
    isOwner,
    wrapAsync(listingController.updatelisting),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroylisting));

//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editlisting),
);

module.exports = router;

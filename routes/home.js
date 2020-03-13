var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("home", {
    title: "Todo管理",
    user: req.user
  });
});

module.exports = router;

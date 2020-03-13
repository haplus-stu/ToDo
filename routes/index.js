var express = require("express");
var router = express.Router();
const Task = require("../models/task");
let i;
const title = "Todoリスト";
/* GET home page. */
router.get("/", function(req, res, next) {


  if (req.user) {
    Task.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['"updatedAt"', "DESC"]]
    }).then((tasks) => {
      
      
      res.render("index", {
        title: title,
        user: req.user,
        tasks
      });
    });
  } else {
    res.render("index", {
      title: title
    });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.post("/login", usersController.login);
router.post("/register", usersController.create);
router.get("/:token", usersController.findOne);
router.put("/:id", usersController.update);
router.post("/delete", usersController.remove);


module.exports = router;
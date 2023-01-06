const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts.controller");

router.post("/create", PostController.create);
router.delete("/:id", PostController.remove);
router.put("/:id", PostController.update);
router.get("/",PostController.find);


module.exports = router;
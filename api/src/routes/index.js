const { Router } = require("express");

const characters = require("./characters");

const router = Router();

router.use("/characters", characters);

module.exports = router;

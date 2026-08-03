const express = require("express");
const router = express.Router();

console.log("Auth Routes Loaded");

const { register, login } = require("../controllers/auth.controller");

router.get("/test", (req, res) => {
    res.send("Auth Works");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
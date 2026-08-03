const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers,
} = require("../controllers/user.controller");

router.post("/", createUser);
router.get("/", authMiddleware, getAllUsers);
router.get("/search", searchUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteUser
);

module.exports = router;

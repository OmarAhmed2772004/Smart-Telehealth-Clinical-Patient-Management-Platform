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

// POST   /users            — Public (self-registration)
router.post("/", createUser);

// GET    /users            — Authenticated
router.get("/", authMiddleware, getAllUsers);

// GET    /users/search     — Authenticated
router.get("/search", authMiddleware, searchUsers);

// GET    /users/:id        — Authenticated
router.get("/:id", authMiddleware, getUserById);

// PUT    /users/:id        — Authenticated (own profile or admin)
router.put("/:id", authMiddleware, updateUser);

// DELETE /users/:id        — Admin only
router.delete("/:id", authMiddleware, authorize("admin"), deleteUser);

module.exports = router;

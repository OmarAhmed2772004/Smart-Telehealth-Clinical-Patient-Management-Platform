const express = require("express");
const router = express.Router();

const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctor.controller");

const {
    createDoctorValidator,
    updateDoctorValidator,
} = require("../middlewares/doctor.validator");

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// GET    /doctors          — All authenticated users can view
router.get("/", authMiddleware, getAllDoctors);

// GET    /doctors/:id      — All authenticated users can view
router.get("/:id", authMiddleware, getDoctorById);

// POST   /doctors          — Only Admin or Doctor can create
router.post("/", authMiddleware, authorize("admin", "doctor"), createDoctorValidator, createDoctor);

// PUT    /doctors/:id      — Only Admin or Doctor can update
router.put("/:id", authMiddleware, authorize("admin", "doctor"), updateDoctorValidator, updateDoctor);

// DELETE /doctors/:id      — Only Admin can delete
router.delete("/:id", authMiddleware, authorize("admin"), deleteDoctor);

module.exports = router;

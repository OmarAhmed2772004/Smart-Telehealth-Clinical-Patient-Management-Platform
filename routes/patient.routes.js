const express = require("express");
const router = express.Router();

const {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} = require("../controllers/patient.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// GET    /patients         — All authenticated users can view
router.get("/", authMiddleware, getPatients);

// GET    /patients/:id     — All authenticated users can view
router.get("/:id", authMiddleware, getPatientById);

// POST   /patients         — Admin or Doctor can create
router.post("/", authMiddleware, authorize("admin", "doctor"), createPatient);

// PUT    /patients/:id     — Admin or Doctor can update
router.put("/:id", authMiddleware, authorize("admin", "doctor"), updatePatient);

// DELETE /patients/:id     — Only Admin can delete
router.delete("/:id", authMiddleware, authorize("admin"), deletePatient);

module.exports = router;
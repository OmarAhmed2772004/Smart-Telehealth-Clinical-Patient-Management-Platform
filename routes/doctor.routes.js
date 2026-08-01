const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctor.controller");

const doctorValidation = [
    body("userId")
        .notEmpty()
        .withMessage("userId is required"),

    body("specialization")
        .notEmpty()
        .withMessage("specialization is required"),
];

router.post("/", doctorValidation, createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", doctorValidation, updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;

const express = require("express");
const SolicitudeController = require("./solicitude.controller");
const router = express.Router();
const validator  = require("../_middleware/validator");


// CRUD de solicitudes
router.post("/solicitudes", SolicitudeController.createSolicitude);
router.get("/solicitudes/:id", SolicitudeController.getSolicitudeById);
router.get("/solicitudes", SolicitudeController.getAllSolicitudes);
router.put("/solicitudes/:id", SolicitudeController.updateSolicitude);
router.delete("/solicitudes/:id", SolicitudeController.deleteSolicitude);

// Obtener opciones únicas para filtros
router.get("/filters", SolicitudeController.getSolicitudeFilterOptions);

module.exports = router;

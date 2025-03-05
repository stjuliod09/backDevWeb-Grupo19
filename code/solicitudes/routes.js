const express = require("express");
const SolicitudeController = require("./solicitude.controller"); // Verifica que este archivo existe y está en la ruta correcta
const router = express.Router();

// CRUD de solicitudes
router.post("/solicitudes", SolicitudeController.registerSchema, SolicitudeController.createSolicitude);
router.get("/solicitudes/:id", SolicitudeController.getSolicitudeById);
router.get("/solicitudes", SolicitudeController.getAllSolicitudes);
router.put("/solicitudes/:id", SolicitudeController.updateSolicitude);
router.delete("/solicitudes/:id", SolicitudeController.deleteSolicitude);

// Obtener opciones únicas para filtros
router.get("/filters", SolicitudeController.getSolicitudeFilterOptions);

module.exports = router;

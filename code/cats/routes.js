const express = require("express");
const CatsController = require("./cats.controller");
const router = express.Router();

// Crear un gato
router.post("/cats", CatsController.createCat);

// Obtener detalle de un gato
router.get("/cats/:id", CatsController.getCatById);

// Actualizar estado de un gato
router.patch("/cats/:id/status", CatsController.updateCatStatus);

// Subir una imagen de un gato
router.post("/cats/:id/images", CatsController.uploadCatImage);

// Eliminar una imagen de un gato
router.delete("/cats/images/:imageId", CatsController.deleteCatImage);

// Actualizar información de un gato
router.put("/cats/:id", CatsController.updateCatInfo);

// Obtener todos los gatos con filtros opcionales
router.get("/cats", CatsController.getAllCats);

// Obtener opciones de filtros disponibles
router.get("/filters", CatsController.getFilterOptions);

module.exports = router;

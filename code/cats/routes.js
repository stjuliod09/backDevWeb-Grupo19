const express = require("express");
const CatsController = require("./cats.controller");
const router = express.Router();
const validator  = require("../_middleware/validator");

// Crear un gato
router.post("/cats", validator(["admin"]), CatsController.createCat);

// Obtener detalle de un gato
router.get("/cats/:id", CatsController.getCatById);

// Actualizar estado de un gato
router.patch("/cats/:id/status", CatsController.updateCatStatus);

// Subir una imagen de un gato
router.post("/cats/:id/images", validator(["admin"]), CatsController.uploadCatImage);

// Eliminar una imagen de un gato
router.delete("/cats/images/:imageId", validator(["admin"]), CatsController.deleteCatImage);

// Actualizar información de un gato
router.put("/cats/:id", validator(["admin"]), CatsController.updateCatInfo);

// Obtener todos los gatos con filtros opcionales
router.get("/cats", CatsController.getAllCats);

// Obtener opciones de filtros disponibles
router.get("/filters", CatsController.getFilterOptions);

module.exports = router;

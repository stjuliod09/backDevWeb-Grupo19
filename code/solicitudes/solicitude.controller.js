const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const SolicitudeService = require("./solicitude.service");

class SolicitudeController {
    
  static registerSchema(req, res, next) {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        email: Joi.string()
            .email()
            .pattern(/@unal\.edu\.co$/)
            .required()
            .messages({
                "string.email": "El correo debe ser válido.",
                "string.pattern.base": "Solo se permiten correos de dominio de la universidad."
            }),
            phone: Joi.string().required(),
            cat_id: Joi.number().required(),
        message: Joi.string().required()
    });

    validateRequest(req, next, schema);
  }

  static createSolicitude(req, res, next) {
      new SolicitudeService()
          .createSolicitude(req)
          .then((data) => res.json(data))
          .catch(next);
  }

  static getSolicitudeById(req, res, next) {
      new SolicitudeService()
          .getSolicitudeById(req.params.id)
          .then((data) => res.json(data))
          .catch(next);
  }

  static getAllSolicitudes(req, res, next) {
      new SolicitudeService()
          .getAllSolicitudes()
          .then((data) => res.json(data))
          .catch(next);
  }

  static updateSolicitude(req, res, next) {
      new SolicitudeService()
          .updateSolicitude(req.params.id, req.body)
          .then((data) => res.json(data))
          .catch(next);
  }

  static deleteSolicitude(req, res, next) {
      new SolicitudeService()
          .deleteSolicitude(req.params.id)
          .then(() => res.json({ message: "Solicitud eliminada correctamente" }))
          .catch(next);
  }

  static getSolicitudeFilterOptions(req, res, next) {
      new SolicitudeService()
          .getFilterOptions()
          .then((data) => res.json(data))
          .catch(next);
  }
}

module.exports = SolicitudeController;

const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const UsersService = require("./users.service");

class UsersController {
    
  static registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
            .email()
            .pattern(/@unal\.edu\.co$/)
            .required()
            .messages({
                "string.email": "El correo debe ser válido.",
                "string.pattern.base": "Solo se permiten correos de dominio de la universidad."
            }),
        password: Joi.string().min(6).required(),
        rol: Joi.string().required()
    });

    validateRequest(req, next, schema);
  }

    static register(req, res, next) {
        new UsersService()
            .register(req)
            .then((data) => res.json(data))
            .catch(next);
    }

    static auth(req, res, next) {
        new UsersService()
            .authenticate(req)
            .then((data) => res.json(data))
            .catch(next);
    }
}

module.exports = UsersController;

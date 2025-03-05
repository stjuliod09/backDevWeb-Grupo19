const SolicitudeService = require("./solicitude.service");
const solicitudeService = new SolicitudeService();
const validateRequest = require("../_middleware/validate-request");

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
                cat_id: Joi.string().required(),
            message: Joi.string().required()
        });
        validateRequest(req, next, schema);
    }
    
    async createSolicitude(req, res) {
        const response = await solicitudeService.createSolicitude(req.body);
        res.status(response.status).json(response);
    }

    async getSolicitudeById(req, res) {
        const response = await solicitudeService.getSolicitudeById(req.params.id);
        res.status(response.status).json(response);
    }

    async getAllSolicitudes(req, res) {
        const response = await solicitudeService.getAllSolicitudes(req.query);
        res.status(response.status).json(response);
    }

    async updateSolicitude(req, res) {
        const response = await solicitudeService.updateSolicitude(req.params.id, req.body);
        res.status(response.status).json(response);
    }

    async deleteSolicitude(req, res) {
        const response = await solicitudeService.deleteSolicitude(req.params.id);
        res.status(response.status).json(response);
    }

    async getSolicitudeFilterOptions(req, res) {
        const response = await solicitudeService.getSolicitudeFilterOptions();
        res.status(response.status).json(response);
    }
}

module.exports = SolicitudeController;

const SolicitudeService = require("./solicitude.service");
const solicitudeService = new SolicitudeService();

class SolicitudeController {
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

module.exports = new SolicitudeController();

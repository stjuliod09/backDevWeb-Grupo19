const CatsService = require("./cats.service");
const catsService = new CatsService();

class CatsController {
    async createCat(req, res) {
        const response = await catsService.createCat(req.body);
        res.status(response.status).json(response);
    }

    async getCatById(req, res) {
        const response = await catsService.getCatById(req.params.id);
        res.status(response.status).json(response);
    }

    async updateCatStatus(req, res) {
        const response = await catsService.updateCatStatus(req.params.id, req.body.status);
        res.status(response.status).json(response);
    }

    async uploadCatImage(req, res) {
        const { urlImg } = req.body;
        const response = await catsService.uploadCatImage(req.params.id, urlImg);
        res.status(response.status).json(response);
    }

    async deleteCatImage(req, res) {
        const response = await catsService.deleteCatImage(req.params.imageId);
        res.status(response.status).json(response);
    }
    async updateCatInfo(req, res) {
      const response = await catsService.updateCatInfo(req.params.id, req.body);
      res.status(response.status).json(response);
    }
    async getAllCats(req, res) {
      const response = await catsService.getAllCats(req.query);
      res.status(response.status).json(response);
    }
    async getFilterOptions(req, res) {
      const response = await catsService.getFilterOptions();
      res.status(response.status).json(response);
    }

}

module.exports = new CatsController();

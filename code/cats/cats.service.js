const models = require("../db/models");
const { Op } = require("Sequelize")

class CatsService {
    // Registrar un gato
    async createCat(data) {
        try {
            const cat = await models.tbl_cats.create(data);
            return { status: 201, message: "Cat registered successfully", data: cat };
        } catch (error) {
            return { status: 500, message: "Error registering cat", error: error.message };
        }
    }

    // Obtener detalle de un gato con imágenes
    async getCatById(id) {
        try {
            const cat = await models.tbl_cats.findByPk(id, {
                include: [{ model: models.tbl_cat_images, as: "images" }]
            });
            if (!cat) return { status: 404, message: "Cat not found" };

            return { 
                status: 200, 
                data: { 
                    id: cat.id, 
                    name: cat.name, 
                    age: cat.age, 
                    health: cat.health, 
                    personality: cat.personality, 
                    description: cat.description, 
                    status: cat.status, 
                    images: cat.images.map(img => img.urlImg)
                } 
            };
        } catch (error) {
            return { status: 500, message: "Error fetching cat", error: error.message };
        }
    }

    async sendEmail(id){
        
    }

    // Cambiar el estado de un gato
    async updateCatStatus(id, status) {
        try {
            const solicitude = await models.tbl_solicitude.findByPk(id, {
                include: [{ model: models.tbl_cats, as: "cat" }]
            });
            let tempData
            if (!solicitude) return { status: 404, message: "Solicitude not found" };
            if(status === 'Adoptado'){
                await solicitude?.cat.update({ status });
                await solicitude.update({ acepted: true });

                await models.tbl_solicitude.destroy({
                    where:{
                        cat_id: solicitude.cat_id,
                        acepted: false
                    }
                })
                tempData = solicitude
            }else{
                await solicitude.destroy();
                tempData = solicitude
            }
            //await sendEmail(tempData)
            return { status: 200, message: "Cat status updated successfully", data: tempData };
        } catch (error) {
            return { status: 500, message: "Error updating cat status", error: error.message };
        }
    }

    // Subir una imagen a un gato
    async uploadCatImage(id_gato, urlImg) {
        try {
            const cat = await models.tbl_cats.findByPk(id_gato);
            if (!cat) return { status: 404, message: "Cat not found" };

            const image = await models.tbl_cat_images.create({ id_gato, urlImg });
            return { status: 201, message: "Image uploaded successfully", data: image };
        } catch (error) {
            return { status: 500, message: "Error uploading image", error: error.message };
        }
    }

    // Eliminar una imagen de un gato
    async deleteCatImage(id) {
        try {
            const image = await models.tbl_cat_images.findByPk(id);
            if (!image) return { status: 404, message: "Image not found" };

            await image.destroy();
            return { status: 200, message: "Image deleted successfully" };
        } catch (error) {
            return { status: 500, message: "Error deleting image", error: error.message };
        }
    }
    // Actualizar información general de un gato
    async updateCatInfo(id, data) {
        try {
            const cat = await models.tbl_cats.findByPk(id);
            if (!cat) return { status: 404, message: "Cat not found" };

            await cat.update(data);
            return { status: 200, message: "Cat info updated successfully", data: cat };
        } catch (error) {
            return { status: 500, message: "Error updating cat info", error: error.message };
        }
    }
    async getAllCats(filters) {
        try {
            let where = {};

            if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };
            if (filters.age){ 
                filters.age = filters.age.split(",")
                where.age = { [Op.in]: filters.age };
            }
            if (filters.health){ 
                filters.health = filters.health.split(",")
                where.health = { [Op.in]: filters.health };
            }
            if (filters.personality){
                filters.personality = filters.personality.split(",")
                where.personality = { [Op.in]: filters.personality }
            }
            if (filters.status){ 
                filters.status = filters.status.split(",")
                where.status = { [Op.in]: filters.status }
            }

            const cats = await models.tbl_cats.findAll({
                where,
                include: [{ model: models.tbl_cat_images, as: "images" }],
                limit: filters.limit ? parseInt(filters.limit) : null,
                offset: filters.offset ? parseInt(filters.offset) : 0,
            });

            const formattedData = cats.map(cat => ({
                id: cat.id,
                name: cat.name,
                age: cat.age,
                health: cat.health,
                personality: cat.personality,
                description: cat.description,
                status: cat.status,
                images: cat.images.map(img => img.urlImg),
            }));

            return { status: 200, data: formattedData };
        } catch (error) {
            return { status: 500, message: "Error fetching cats", error: error.message };
        }
    }
    async getFilterOptions() {
        try {
            const names = await models.tbl_cats.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('name')), 'name']], raw: true });
            const ages = await models.tbl_cats.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('age')), 'age']], raw: true });
            const healthStatuses = await models.tbl_cats.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('health')), 'health']], raw: true });
            const personalities = await models.tbl_cats.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('personality')), 'personality']], raw: true });
            const statuses = await models.tbl_cats.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('status')), 'status']], raw: true });

            return {
                status: 200,
                data: {
                    names: names.map(item => item.name),
                    ages: ages.map(item => item.age),
                    healthStatuses: healthStatuses.map(item => item.health),
                    personalities: personalities.map(item => item.personality),
                    statuses: statuses.map(item => item.status),
                }
            };
        } catch (error) {
            return { status: 500, message: "Error fetching filter options", error: error.message };
        }
    }
}

module.exports = CatsService;

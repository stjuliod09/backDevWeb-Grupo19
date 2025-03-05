const { Op } = require("sequelize");
const models = require("../db/models");

class SolicitudeService {
    // Crear una solicitud
    async createSolicitude(data) {
        try {
            const solicitude = await models.tbl_solicitude.create(data);
            return { status: 201, message: "Solicitude created successfully", data: solicitude };
        } catch (error) {
            return { status: 500, message: "Error creating solicitude", error: error.message };
        }
    }

    // Obtener una solicitud por ID
    async getSolicitudeById(id) {
        try {
            const solicitude = await models.tbl_solicitude.findByPk(id, {
                include: [{ model: models.tbl_cats, as: "cat" }]
            });
            if (!solicitude) return { status: 404, message: "Solicitude not found" };

            return {
                status: 200,
                data: {
                    id: solicitude.id,
                    fullName: solicitude.full_name,
                    email: solicitude.email,
                    phone: solicitude.phone,
                    catName: solicitude.cat ? solicitude.cat.name : null,
                    message: solicitude.message
                }
            };
        } catch (error) {
            return { status: 500, message: "Error fetching solicitude", error: error.message };
        }
    }

    // Obtener todas las solicitudes con filtros opcionales
    async getAllSolicitudes(filters) {
        try {
            let where = {};
            
            if (filters?.fullName) where.full_name = { [Op.like]: `%${filters.fullName}%` };
            if (filters?.email){ 
                filters.email = filters.email.split(",")
                where.email = { [Op.in]: filters.email }
            };
            if (filters?.phone) {
                filters.phone = filters.phone.split(",")
                where.phone = { [Op.in]: filters.phone };
            }
            if (filters?.catName) {
                where["$cat.name$"] = { [Op.like]: `%${filters.catName}%` };
            }

            const solicitudes = await models.tbl_solicitude.findAll({
                where,
                include: [{ model: models.tbl_cats, as: "cat" }],
                limit: filters?.limit ? parseInt(filters.limit) : 10,
                offset: filters?.offset ? parseInt(filters.offset) : 0,
            });

            const formattedData = solicitudes.map(solicitude => ({
                id: solicitude.id,
                fullName: solicitude.full_name,
                email: solicitude.email,
                phone: solicitude.phone,
                catName: solicitude.cat ? solicitude.cat.name : null,
                message: solicitude.message
            }));

            return { status: 200, data: formattedData };
        } catch (error) {
            return { status: 500, message: "Error fetching solicitudes", error: error.message };
        }
    }

    // Actualizar una solicitud
    async updateSolicitude(id, data) {
        try {
            const solicitude = await models.tbl_solicitude.findByPk(id);
            if (!solicitude) return { status: 404, message: "Solicitude not found" };

            await solicitude.update(data);
            return { status: 200, message: "Solicitude updated successfully", data: solicitude };
        } catch (error) {
            return { status: 500, message: "Error updating solicitude", error: error.message };
        }
    }

    // Eliminar una solicitud
    async deleteSolicitude(id) {
        try {
            const solicitude = await models.tbl_solicitude.findByPk(id);
            if (!solicitude) return { status: 404, message: "Solicitude not found" };

            await solicitude.destroy();
            return { status: 200, message: "Solicitude deleted successfully" };
        } catch (error) {
            return { status: 500, message: "Error deleting solicitude", error: error.message };
        }
    }

    // Obtener opciones únicas para filtros de solicitudes
    async getSolicitudeFilterOptions() {
        try {
            const fullNames = await models.tbl_solicitude.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('full_name')), 'full_name']], raw: true });
            const emails = await models.tbl_solicitude.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('email')), 'email']], raw: true });
            const phones = await models.tbl_solicitude.findAll({ attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('phone')), 'phone']], raw: true });
            const catNames = await models.tbl_solicitude.findAll({
                include: [{ model: models.tbl_cats, as: "cat", attributes: ["name"] }],
                attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('cat.name')), 'cat_name']],
                raw: true
            });

            return {
                status: 200,
                data: {
                    fullNames: fullNames.map(item => item.full_name),
                    emails: emails.map(item => item.email),
                    phones: phones.map(item => item.phone),
                    catNames: catNames.map(item => item.cat_name)
                }
            };
        } catch (error) {
            return { status: 500, message: "Error fetching filter options", error: error.message };
        }
    }
}

module.exports = SolicitudeService;

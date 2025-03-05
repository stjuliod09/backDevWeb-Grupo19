const { expressjwt: jwt } = require("express-jwt");
const { algorithm, secret } = require("../_config/config");
const models = require("../db/models");

module.exports = authorize;

function authorize(roles = []) {
    return async (req, res, next) => {
        // Middleware para verificar JWT
        jwt({ secret, algorithms: [algorithm] })(req, res, async (err) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized", status: 401 });
            }

            try {
                // Extraer email del token
                const email = req.auth.sub;

                // Buscar al usuario en la base de datos
                const user = await models.tbl_users.findOne({ where: { email } });

                if (!user) {
                    return res.status(401).json({ message: "Unauthorized", status: 401 });
                }

                // Verificar rol
                if (roles.length && !roles.includes(user.rol)) {
                    return res.status(403).json({ message: "Forbidden", status: 403 });
                }

                // Asignar datos del usuario a `req.auth`
                req.auth = {
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                };

                next();
            } catch (error) {
                console.error("Authorization error:", error);
                res.status(500).json({ message: "Internal server error", status: 500 });
            }
        });
    };
}

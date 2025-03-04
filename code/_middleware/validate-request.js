module.exports = validateRequest;

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // Incluir todos los errores
    allowUnknown: true, // Ignorar propiedades desconocidas
    stripUnknown: true // Eliminar propiedades desconocidas
  };
  
  const { error, value } = schema.validate(req.body, options);
  
  if (error) {
    let err = new Error(error.details.map((x) => x.message).join(', '));    
    return next({
      message: err.message,
      status: 400
    }); // Enviar al middleware de errores
  } else {
    req.body = value;
    next();
  }
}

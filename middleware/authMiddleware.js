const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => 
{
    // Tomamos el token del encabezado
    const token = req.headers['authorization']; 
    if (!token) { return res.status(401).json({ message: 'No token provided' }); }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => 
    {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id; // Almacenar el ID del usuario en la solicitud
        next();
    });
};

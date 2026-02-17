// Middleware

const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer Token

    // Verifica Token
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido!'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            return res.status(403).json({ error: 'Token invalido!'});
        }

        // Permite continuar se não ouver irregularidades 
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;


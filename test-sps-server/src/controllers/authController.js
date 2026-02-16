const jwt = require('jsonwebtoken');
const { users } = require('../database');

function login(req, res) {
    const { email, password } = req.body;

    // Procura o usuario no banco
    const user = users.find(u => u.email === email && u.password === password);
    if (!user){
        return res.status(401).json({ error: 'Credenciais invalidas!'});
    }

    // Se encontrar, gera um token JWT
    const token = jwt.sign
    (
        { 
            id: user.is,
            email: user.email,
            type: user.type
        },
        process.env.JWT_SECRET,
        { expiresIn: '24'}
    );

    // Retorna o token do usuario (Não mostra a senha!)
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type
        }
    });
}

module.exports = {  login  };
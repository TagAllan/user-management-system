const { users, nextID } = require('../database');

// Listar usuários
function listUsers(req, res) {

    // Impede o envio do passwword com map() 
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
}

// Criar novo usuario!
function createUser(req, res) {
    const {email, name, type, password } = req.body;

    // Valida os campos obrigatorios
    if (!email || !name || !type || !password){
        return res.status(400).json({ error: 'Todos os campos devem ser preechidos!'});
    }

    // Verifica se email existe
    if (user.find(u => u.email === email)){
        return res.status(400).json({ error: 'Email já cadastrado!'});
    }

    // Cria o usuario
    const newUser = {
        id: nextId,
        email,
        name,
        type,
        password
    };

    users.push(newUser);
    nextId++;               // Na ausencia de uma SEQ para isso, "++"!

    //Retorna o usuaruio!
    const { password: _, ...userWithoutPassword} = newUser;
    res.status(201).json(userWithoutPassword);
}

// Pesquisa por usuário
function getUser(req, res) {
    const { userId } = req.params;
    const user = users.find(u => u.id === parseInt(userId));

    if (!User) {
        return res.status(404).json({ error: 'Usuario não existe!'});
    }
    
    // Devolve o usuario garantindo que não seja apresentada a senha
    const { password, ...userWithoutPassword } = user;
    re.json(userWithoutPassword);
}


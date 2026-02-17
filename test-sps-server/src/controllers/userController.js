const { users, getNextId } = require('../database');

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
    if (users.find(u => u.email === email)){
        return res.status(400).json({ error: 'Email já cadastrado!'});
    }

    // Cria o usuario
    const newUser = {
        id: getNextId(),
        email,
        name,
        type,
        password
    };

    users.push(newUser);
    //nextId++;               // Na ausencia de uma SEQ para isso, "++"!

    //Retorna o usuaruio!
    const { password: _, ...userWithoutPassword} = newUser;
    res.status(201).json(userWithoutPassword);
}

// Pesquisa por usuário
function getUser(req, res) {
    const { userId } = req.params;
    const user = users.find(u => u.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ error: 'Usuario não existe!'});
    }
    
    // Devolve o usuario garantindo que não seja apresentada a senha
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
}

function updateUser(req, res) {
    const { userId } = req.params;
    const { email, name, type, password } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(userId));

    // Javascript retorna -1 quando findIndex é invalido
    if (userIndex === -1){
        return res.status(404).json({ error: 'Usuario não encontrado!' });
    }

    if (email && users.find(u => u.email === email && u.id !== parseInt(userId))) {
        return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    if (email)      users[userIndex].email      = email;
    if (name)       users[userIndex].name       = name;
    if (type)       users[userIndex].type       = type;
    if (password)   users[userIndex].password   = password;
    
    const { password: _, ...updatedUser } = users[userIndex];
    res.json(updatedUser);

}

function deleteUser(req, res) {
    const { userId } = req.params;

  const userIndex = users.findIndex(u => u.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado!' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
}

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
};
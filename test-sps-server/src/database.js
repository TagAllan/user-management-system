let users = [
    {
        id: 1,
        name: "admin",
        email: "admin@spsgroup.com.br",
        type: "admin" ,
        password: "1234"
    }
]

let nextId = 2;

// Função para obter e incrementar o ID
function getNextId() {
    return nextId++;
}

module.exports = {
    users,
    nextId,
    getNextId
};


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "user",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.list();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await UserService.delete(id);
        loadUsers();
      } catch (err) {
        alert(err.response?.data?.error || "Erro ao excluir usuário");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.create(formData);
      setShowForm(false);
      setFormData({ name: "", email: "", type: "user", password: "" });
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao criar usuário");
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/signin");
  };

  if (loading) return <div style={{ padding: "20px" }}>Carregando...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
        <h1>Usuários</h1>
        <div>
          <button 
            onClick={() => setShowForm(!showForm)} 
            style={{ marginRight: "10px", padding: "8px 16px", cursor: "pointer" }}
          >
            {showForm ? "Cancelar" : "Novo Usuário"}
          </button>
          <button 
            onClick={handleLogout}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Sair
          </button>
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {showForm && (
        <form 
          onSubmit={handleSubmit} 
          style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <h3>Cadastrar Novo Usuário</h3>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Nome: </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email: </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Tipo: </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Senha: </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <button 
            type="submit" 
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Salvar
          </button>
        </form>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nome</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Tipo</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{user.id}</td>
              <td style={{ padding: "10px" }}>{user.name}</td>
              <td style={{ padding: "10px" }}>{user.email}</td>
              <td style={{ padding: "10px" }}>{user.type}</td>
              <td style={{ padding: "10px" }}>
                <button 
                  onClick={() => navigate(`/users/${user.id}`)} 
                  style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
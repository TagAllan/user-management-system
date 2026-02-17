import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

function Home() {
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getUser();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>SPS REACT TEST</h1>
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {user?.name}!</p>
          <Link to="/users" style={{ display: "inline-block", marginTop: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "5px" }}>
            Ir para Usuários
          </Link>
        </div>
      ) : (
        <div>
          <p>Faça login para acessar o sistema</p>
          <Link to="/signin" style={{ display: "inline-block", marginTop: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "5px" }}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
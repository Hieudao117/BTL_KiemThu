import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css'
// eslint-disable-next-line react/prop-types
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (credentials.username === "admin@gmail.com" && credentials.password === "admin") {
      const token = "admin-auth-token"; 
      localStorage.setItem("adminToken", token); 
      onLogin(token);
      navigate("/list"); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

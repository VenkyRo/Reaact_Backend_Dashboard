import React, { useState } from 'react'
import {API_URL} from '../../data/ApiPath'
import { useNavigate } from 'react-router-dom';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const RegisterHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("vendor registered Sucess!");
        showLoginHandler();
      }
    } catch (error) {
      console.error("register Failed", error);
      alert("register Failed!");
    }
  };

  return (
    <>
      <div className="main-content">
        <form className="login-form" onSubmit={RegisterHandleSubmit}>
          <h2>Vendor Register</h2>

          <div className="form-group">
            <label htmlFor="userName">userName</label>
            <input
              type="text"
              id="userName"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your userName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register
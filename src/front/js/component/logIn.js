import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogIn = ({ onClose }) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("The field cannot be empty.");
      return;
    }

    try {
      const response = await actions.login(email, password);
      console.log(response);

      if (response.token) {
        setTimeout(() => {
          onClose();
          navigate("/");
        }, 2000);
      } else {
        alert("Wrong email or password.");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };

  return (
    <form className="signup-form-wrapper" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          className="login-form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="signup-form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button className="navbar-button" type="submit">
        Log In
      </button>
    </form>
  );
};







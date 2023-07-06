import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../front/styles/login&signup.css";

export const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const formRef = useRef(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User created:", userData);

        setEmail("");
        setPassword("");

        setSignupSuccess(true);
      } else {
        console.log("Failed to create user.");
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="signup-form-wrapper" ref={formRef}>
      {signupSuccess ? (
        <p style={{ color: "green" }}>Sign up successful.</p>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit" className="navbar-button">
            Sign Up
          </button>
          <button type="button" onClick={handleClose} className="close-button">
            Close
          </button>
        </form>
      )}
    </div>
  );
};



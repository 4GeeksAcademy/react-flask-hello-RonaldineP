import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../../front/styles/login&signup.css";
import { useNavigate } from "react-router-dom";

export const LogIn = ({ onClose }) => {
  const { store, actions } = useContext(Context);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   setLoginStatus("Logging in..."); // Display "Logging in..." message

  //   try {
  //     const response = await actions.login(
  //       event.target.email.value,
  //       event.target.password.value
  //     );
  //     console.log(response);
  //     if (response.token) {
  //       setLoginStatus("Login successful");
  //       setTimeout(() => {
  //         onClose();
  //         navigate("/help");
  //       }, 2000);
  //     } else {
  //       setLoginStatus("Login unsucessful");
  //     }
  //   } catch (error) {
  //     setLoginStatus("Login failed!");
  //   }
  // };

  return (
    <form className="signup-form-wrapper" >
      {/* onSubmit={handleLogin} */}
      <div className="form-group">
        <label>Email</label>
        <input
          className="login-form-input"
          onChange={(e)=>setEmail(e.target.value)}
          name="email" // Added name attribute
          type="email" // Set input type to "email"
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="signup-form-input"
          onChange={(e)=>setPassword(e.target.value)}
          name="password" // Added name attribute
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button className="navbar-button" type="submit" onClick={(e)=>{
        if (email==""|| password==""){
          e.preventDefault()
          alert("The field cannot be empty.")
        } else if(email!==email|| password!==password) {
          alert("Wrong email or password.")
        }
        else {
          actions.login(email,password)
          console.log(store.user)
        }
      }}>
        Log In
      </button>
      {/* {loginStatus && (
        <p style={{ color: loginStatus === "Login successful" ? "green" : "red" }}>
          {loginStatus}
        </p>
      )} */}
    </form>
  );
};






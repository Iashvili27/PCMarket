import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";

const oldLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError("Wrong Email or Password");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError("Wrong Email or Password");
    }
  };

  return (
    <div className="login-body">
      {user ? (
        <div>
          <h3>Your are already logged in</h3>
        </div>
      ) : (
        <div className="login-container">
          <div className="p-4-box">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="form-class" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid">
                <Button
                  className="d-grid-button"
                  variant="primary"
                  type="Submit"
                >
                  Log In
                </Button>
              </div>
            </Form>
            {/* 
          <div>
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default oldLogin;

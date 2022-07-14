import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [secpassword, setSecPassword] = useState("");
  const { signUp, emailVerification } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (password === secpassword) {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    } else {
      e.preventDefault();
      setError("Password are not same");
    }
  };

  const emailVerify = async () => {
    emailVerification().then(() => {
      console.log("verified");
    });
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <h2>Register</h2>
        <div className="signup-p-4-box">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="signup-form-class" onSubmit={handleSubmit}>
            <Form.Group className="signup-mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="signup-mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="signup-mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => setSecPassword(e.target.value)}
              />
            </Form.Group>

            <div className="signup-d-grid">
              <Button
                className="signup-d-grid-button"
                variant="primary"
                type="Submit"
              >
                Sign up
              </Button>
            </div>
          </Form>
        </div>
        <div className="signup-p-4 box mt-3 text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
        <button onClick={emailVerify}>verufy</button>
      </div>
    </div>
  );
};

export default Signup;

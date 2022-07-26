import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";

import { db, storedb } from "../../firebase";
import { set, ref, onValue } from "firebase/database";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";

const oldSignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [secpassword, setSecPassword] = useState("");
  const { signUp, emailVerification, user } = useUserAuth();
  let navigate = useNavigate();
  console.log(auth);
  const handleSubmit = async (e) => {
    if (password === secpassword) {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        // set(ref(db, "users/"), {
        //   username: username,
        //   email: email,
        //   userid: auth.currentUser.uid,
        // });
        // await addDoc(collection(storedb, "users"), {
        //   username: username,
        //   email: email,
        //   userid: auth.currentUser.uid,
        // });
        await setDoc(doc(storedb, "users", `${email}`), {
          username: username,
          email: email,
          userid: auth.currentUser.uid,
        });
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

  console.log(user);

  return (
    <div className="signup-body">
      {user ? (
        <div>
          <h3>You are already logged in</h3>
        </div>
      ) : (
        <div className="signup-container">
          <h2>Register</h2>
          <div className="signup-p-4-box">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="signup-form-class" onSubmit={handleSubmit}>
              <Form.Group className="signup-mb-3" controlId="formBasicUsername">
                <Form.Control
                  type="name"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
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
          {/* <button onClick={emailVerify}>verufy</button> */}
        </div>
      )}
    </div>
  );
};

export default oldSignUp;

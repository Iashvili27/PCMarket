import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useUserAuth } from "../../context/UserAuthContext";

import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await logIn(values.email, values.password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div className="login-body">
          <div className="login-container">
            <h1 className="login-h1">Login</h1>
            <Form className="login-form">
              <div className="login-card-inputs">
                <TextField
                  label="Email"
                  holder={"user@mail.com"}
                  name="email"
                  type="email"
                />
                <TextField
                  label="Password"
                  styling={"logininp"}
                  holder={"******"}
                  name="password"
                  type="password"
                />
              </div>
              <div className="login-button">
                <button type="submit">Login</button>
              </div>
              <div className="login-card-signup">
                Don't have an account?
                <Link
                  style={{ color: "blue", textDecoration: "none" }}
                  to="/signup"
                >
                  Sign up
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;

import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Login.css";
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
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Login</h1>
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="password" name="password" type="password" />
            <button className="btn btn-dark mt-3" type="submit">
              Login
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Reset
            </button>
            <div className="p-4 box mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;

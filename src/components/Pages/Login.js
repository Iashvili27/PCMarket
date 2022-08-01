import React from "react";
import { Formik, Form } from "formik";
import { LoginTextField } from "./LoginTextField";
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
        <section className="min-h-screen flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image"
                />
              </div>
              <div className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 ">
                <Form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">
                      Log In
                    </p>
                  </div>

                  <div className="mb-6">
                    <LoginTextField
                      holder={"Email address"}
                      name="email"
                      type="email"
                    />
                  </div>

                  <div className="mb-6">
                    <LoginTextField
                      holder={"Password"}
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck2"
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="exampleCheck2"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-gray-800">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Login
                    </button>
                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                      Don't have an account?
                      <Link
                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                        to="/signup"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};

export default Login;

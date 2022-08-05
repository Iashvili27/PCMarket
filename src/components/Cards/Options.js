import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { OptionsField } from "../TextFields/OptionsField";
import { useUserAuth } from "../../context/UserAuthContext";

function Options() {
  const { user, updateUserPassword } = useUserAuth();
  console.log(user);
  const validate = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        updateUserPassword(values.password);
      }}
    >
      {(formik) => (
        <div
          className="flex
         flex-col  w-full min-h-[50%] items-center justify-center"
        >
          <h3 className="p-4 font-bold text-2xl">Change Password</h3>
          <Form className="flex flex-col justify-center items-center">
            <OptionsField
              styling={"logininp"}
              label="Email"
              holder={`${user.email}`}
              name="email"
              type="email"
              disabled
            />
            <OptionsField
              styling={"optionfieldinputstyle"}
              label="Write New Password"
              holder={"******"}
              name="password"
              type="password"
            />
            <OptionsField
              styling={"optionfieldinputstyle"}
              holder={"******"}
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
            />

            <button
              className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
            >
              Change Password
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Options;

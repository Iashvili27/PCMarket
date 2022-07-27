import React from "react";
import "./Options.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { OptionsField } from "./OptionsField";
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
        <div className="optionscontainer">
          <Form>
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
            <div className="login-button">
              <button type="submit">Change Password</button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Options;

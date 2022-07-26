import React from "react";
import { ErrorMessage, useField } from "formik";
import "./TextField.css";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <h3 htmlFor={field.name}>{label}</h3>
      <div className="inputstyle">
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          // className={`form-control shadow-none ${
          //   meta.touched && meta.error && "is-invalid"
          // }`}
          {...field}
          {...props}
          autoComplete="off"
          placeholder={props.holder}
        />
      </div>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};

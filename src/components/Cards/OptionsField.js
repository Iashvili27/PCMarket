import React from "react";
import { ErrorMessage, useField } from "formik";

export const OptionsField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="optionfieldcontainer">
      <h3 htmlFor={field.name}>{label}</h3>
      <div className={props.styling}>
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

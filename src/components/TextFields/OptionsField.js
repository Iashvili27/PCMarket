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
          }${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}`}
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

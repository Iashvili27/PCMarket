import React from "react";
import { ErrorMessage, useField } from "formik";

export const AddItemTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="w-[90%]">
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }${" bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl"}`}
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
    </>
  );
};

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcCancel } from "react-icons/fc";
import { Input } from "antd";

const fileTypes = ["JPG", "PNG", "GIF"];
// Ant Inputs
const { TextArea } = Input;

const AddItem = () => {
  const [file, setFile] = useState([]);

  function uploadSingleFile(e) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
    console.log("file", file);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="p-1 w-full flex items-center justify-center border-b-2">
        <h3 className=" font-bold  text-2xl">Add new item</h3>
      </div>
      <form
        className="flex flex-col p-3 w-full items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex m-2 w-full flex-col border-2 border-indigo-700 h-52 justify-center rounded-2xl items-center">
          <h3 className="p-4">Choose item category</h3>
          <select className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl">
            <option selected>Choose Category</option>
            <option value="PC">PC</option>
            <option value="Components">Components</option>
            <option value="Laptops">Laptops</option>
            <option value="Consoles">Consoles</option>
            <option value="Monitors">Monitors</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div className="flex m-2 w-full  flex-col border-2 border-indigo-700 min-h-min rounded-2xl items-center">
          <div className="w-[90%] h-[50%] border-dashed border-2 border-indigo-600 m-2 rounded-md">
            <label
              className="md:cursor-pointer w-full h-[200px] flex justify-center items-center flex-col"
              htmlFor="images-upload"
            >
              <svg
                className="fill-current w-12 h-12 mb-3 text-blue-700"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
              <p className="text-lg text-blue-700">Choose your images</p>
            </label>
            <input
              onChange={uploadSingleFile}
              disabled={file.length === 5}
              type="file"
              name="images-upload"
              id="images-upload"
              className="visually hidden"
            />
          </div>
          <div className="w-[90%] h-[50%]  flex flex-col items-center">
            <div className="flex flex-row w-full items-center justify-center">
              {file.length > 0 &&
                file.map((item, index) => {
                  return (
                    <div className="flex w-[80px] h-[80px] p-2" key={item}>
                      <img
                        className="w-full h-full rounded-xl object-cover"
                        src={item}
                        alt=""
                      />
                      <button
                        className="absolute"
                        type="button"
                        onClick={() => deleteFile(index)}
                      >
                        <FcCancel size={30} />
                      </button>
                    </div>
                  );
                })}
            </div>
            <button
              onClick={upload}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="flex m-2 w-full flex-col border-2 border-indigo-700 h-96 justify-center rounded-2xl items-center">
          <TextArea
            className="w-[90%] h-[90%]"
            rows={4}
            placeholder="Write item description. Maximum 250 letters."
            maxLength={250}
          />
        </div>
        <div className="flex  m-2 w-full flex-col border-2 border-indigo-700 h-52 justify-center rounded-2xl items-center">
          <div className="p-4">Enter Item Price</div>
          <div className="flex flex-row w-[90%] ">
            <input
              className="w-[80%] bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5  rounded-2xl"
              type="number"
              placeholder="Enter price"
            />
            <select className="w-[20%] bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl">
              <option selected value="GEL">
                GEL
              </option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="flex m-2 w-full flex-col border-2 border-indigo-700 h-52 justify-center rounded-2xl items-center">
          <div className="w-[90%]">
            <label htmlFor="sellername">Enter Seller Name</label>
            <input
              id="sellername"
              className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl"
              type="text"
              placeholder="Seller Name"
            />
          </div>
          <div className="w-[90%]">
            <label htmlFor="sellernumber">Enter Phone Number</label>
            <input
              id="sellernumber"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl"
              type="number"
              placeholder="Seller Number"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;

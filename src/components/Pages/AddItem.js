import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { AddItemTextField } from "./AddItemTextField";
import { useDataContext } from "../../context/DataContext";
import { FcCancel } from "react-icons/fc";
import ItemAddedModal from "../Modal/ItemAddedModal";

function Previews(props) {
  const { imageFiles, setImageFiles, uploadImage } = useDataContext();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".heic", ".jpg", ".heif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setImageFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 5,
    multiple: true,
  });

  const remove = (file) => {
    const newFiles = [...imageFiles]; // make a var for the new array
    newFiles.splice(file, 1); // remove the file from the array
    setImageFiles(newFiles); // update the state
  };

  const thumbs = imageFiles.map((file, i) => (
    <div
      className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative m-2"
      key={file.name}
    >
      <img
        className="w-full h-full object-cover rounded-lg"
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button
        className="absolute right-0 top-0"
        type="button"
        onClick={() => remove(i)}
      >
        <FcCancel size={30} />
      </button>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="min-h-[50%] w-[90%] flex-col flex items-center">
      <div
        {...getRootProps({
          className:
            "w-[90%] h-[50%] border-dashed border-2 border-indigo-600 m-2 rounded-md",
        })}
      >
        <input {...getInputProps()} />
        <div className="md:cursor-pointer w-full h-[200px] flex justify-center items-center flex-col">
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
          <p className="text-sm text-blue-700  ">Max 5 img.</p>
        </div>
      </div>

      <aside className="w-[90%] h-[50%]  flex flex-wrap items-center justify-center">
        {thumbs}
      </aside>
    </section>
  );
}

// Ant Inputs
const { TextArea } = Input;

const AddItem = () => {
  const [openModal, setOpenModal] = useState(false);
  const { changeHandler } = useDataContext();

  const validate = Yup.object({
    category: Yup.string().required("Required"),
    itemName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    sellerNumber: Yup.number().required("Number is required"),
    sellerName: Yup.string()
      .max(10, "Name must be max 10 charaters")
      .required("Name is required"),
    itemPrice: Yup.number().required("itemPrice is required"),
    currency: Yup.string().required("Currency is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          category: "",
          itemName: "",
          sellerNumber: "",
          sellerName: "",
          itemPrice: "",
          currency: "",
          description: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          changeHandler(values);
          console.log("hello");
          setOpenModal(true);
        }}
      >
        {(formik) => (
          <div className="min-h-[50vh] flex flex-col items-center p-4">
            <Form
              className="flex flex-col p-3 w-full items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex m-2 w-full md:w-2/4 xl:w-2/4 flex-col  border-2 border-gray-200 h-52 justify-center rounded-2xl items-center">
                <h3 className="p-4 font-bold text-xl">Choose item category</h3>
                <Field
                  as="select"
                  name="category"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl"
                >
                  <option defaultValue>Choose Category</option>
                  <option value="PC">PC</option>
                  <option value="Components">Components</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Consoles">Consoles</option>
                  <option value="Monitors">Monitors</option>
                  <option value="Peripherals">Peripherals</option>
                  <option value="Accessories">Accessories</option>
                </Field>
              </div>
              <div className="flex m-2 w-full md:w-2/4 xl:w-2/4   flex-col border-2 border-gray-200 min-h-min rounded-2xl items-center">
                <Previews />
              </div>
              <div className="flex m-2 w-full md:w-2/4 xl:w-2/4  flex-col border-2 border-gray-200 h-96 justify-center rounded-2xl items-center">
                <h3 className="font-bold text-xl p-4">Item Name</h3>
                <AddItemTextField
                  name="itemName"
                  holder={"Item name"}
                  type="itemName"
                />

                <h3 className="font-bold text-xl p-4">Description</h3>
                <TextArea
                  autoSize
                  name="description"
                  className="w-[90%] h-[50%] p-4"
                  rows={4}
                  placeholder="Write item description. Maximum 250 letters."
                  maxLength={250}
                  bordered
                  onChange={(value) =>
                    formik.setFieldValue("description", value.target.value)
                  }
                />
              </div>
              <div className="flex  m-2 w-full md:w-2/4 xl:w-2/4 flex-col border-2 border-gray-200 h-52 justify-center rounded-2xl items-center">
                <div className="p-4 font-bold text-xl">Enter Item Price</div>
                <div className="flex flex-row w-[90%] ">
                  <AddItemTextField
                    name="itemPrice"
                    holder={"Enter Price"}
                    type="itemPrice"
                  />

                  <Field
                    as="select"
                    name="currency"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-2xl"
                  >
                    <option value="none" defaultValue>
                      Choose Currency
                    </option>
                    <option value="GEL">GEL</option>
                    <option value="USD">USD</option>
                  </Field>
                </div>
              </div>
              <div className="flex m-2 w-full md:w-2/4 xl:w-2/4 flex-col border-2 border-gray-200 h-52 justify-center rounded-2xl items-center">
                <>
                  <label htmlFor="sellername">Enter Seller Name</label>
                  <AddItemTextField
                    name="sellerName"
                    holder={"Seller name"}
                    type="sellerName"
                  />
                </>
                <>
                  <label htmlFor="sellernumber">Enter Phone Number</label>
                  <AddItemTextField
                    name="sellerNumber"
                    holder={"Phone number"}
                    type="phoneNumber"
                  />
                </>
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Add Item
              </button>
            </Form>
          </div>
        )}
      </Formik>
      {openModal && (
        <ItemAddedModal openModal={openModal} closeModal={setOpenModal} />
      )}
    </>
  );
};

export default AddItem;

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { AddItemTextField } from "../TextFields/AddItemTextField";
import { useDataContext } from "../../context/DataContext";
import { FcCancel } from "react-icons/fc";
import ItemAddedModal from "../Modal/ItemAddedModal";
import { useParams } from "react-router-dom";

function Previews(props) {
  const { imageFiles, setImageFiles } = useDataContext();
  let { id } = useParams();
  const { items } = useDataContext();
  const filterItems = items.filter((item) => item.uuid === id)[0];

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
        alt=""
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

  const thumbs1 = useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-[50%] w-[90%] flex flex-wrap items-center justify-center">
      {filterItems.images.map((image, index) => (
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative m-2">
          <img
            className="w-full h-full object-cover rounded-lg"
            alt=""
            src={image}
          ></img>
          <button className="absolute right-0 top-0" type="button">
            <FcCancel size={30} />
          </button>
        </div>
      ))}
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

const EditItem = () => {
  let { id } = useParams();
  const { items } = useDataContext();
  const filterItems = items.filter((item) => item.uuid === id);
  console.log(filterItems);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editItem } = useDataContext();

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
      {filterItems.length > 0 ? (
        <Formik
          initialValues={{
            category: filterItems[0].category,
            itemName: filterItems[0].itemName,
            sellerNumber: filterItems[0].sellerNumber,
            sellerName: filterItems[0].sellerName,
            itemPrice: filterItems[0].itemPrice,
            currency: filterItems[0].currency,
            description: filterItems[0].description,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log("clicked");
            editItem(filterItems[0].uuid, values);
          }}
        >
          {(formik) => (
            <div className="min-h-[50vh] flex flex-col items-center p-4">
              <Form
                className="flex flex-col p-3 w-full items-center"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex m-2 w-full md:w-2/4 xl:w-2/4 flex-col  border-2 border-gray-200 h-52 justify-center rounded-2xl items-center">
                  <h3 className="p-4 font-bold text-xl">
                    Choose item category
                  </h3>
                  <Field
                    as="select"
                    name="category"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5     rounded-2xl"
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
                    maxLength={500}
                    bordered
                    defaultValue={filterItems[0].description}
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
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5  ark:text-white  rounded-2xl"
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
                {loading ? (
                  <button
                    disabled
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    <svg
                      role="status"
                      class="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Edit Item
                  </button>
                )}
              </Form>
            </div>
          )}
        </Formik>
      ) : null}

      {openModal && (
        <ItemAddedModal
          loading={setLoading}
          openModal={openModal}
          closeModal={setOpenModal}
        />
      )}
    </>
  );
};

export default EditItem;

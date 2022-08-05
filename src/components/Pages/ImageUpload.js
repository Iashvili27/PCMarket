import React, { useState, useEffect } from "react";
import { FcCancel } from "react-icons/fc";
import { useDataContext } from "../../context/DataContext";

const ImageUpload = () => {
  const { imageUpload, setImageUpload, uploadImage } = useDataContext();
  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file, index) => {
      return URL.createObjectURL(file);
    });
    setImageUpload((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    e.target.value = "";
  };

  function deleteHandler(image) {
    setImageUpload(imageUpload.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <>
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
          className="visually hidden"
          disabled={imageUpload.length === 5}
          type="file"
          name="images-upload"
          id="images-upload"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </div>
      {imageUpload.length > 0 &&
        (imageUpload.length > 5 ? (
          <p className="error">
            You can't upload more than 5 images! <br />
            <span>
              please delete <b> {imageUpload.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button className="upload-btn" onClick={uploadHandler}>
            UPLOAD {imageUpload.length} IMAGE
            {imageUpload.length === 1 ? "" : "S"}
          </button>
        ))}
      <div className="w-[90%] h-[50%]  flex flex-wrap items-center justify-center">
        <>
          {imageUpload &&
            imageUpload.map((image, index) => {
              return (
                <div key={image} className="w-[150px] h-[150px] relative m-2">
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg"
                    alt="upload"
                  />
                  <button
                    className="absolute right-0 top-0"
                    onClick={() => deleteHandler(image)}
                  >
                    <FcCancel size={30} />
                  </button>
                  {index === 0 ? (
                    <p className="absolute bottom-1 left-1 text-white">
                      Main Picture
                    </p>
                  ) : (
                    <p className="absolute bottom-1 left-1 text-white">
                      {index}
                    </p>
                  )}
                </div>
              );
            })}
        </>
      </div>
      <button
        onClick={uploadImage}
        type="button"
        className="text-white bg-blue-700 m-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Upload
      </button>
    </>

    // <section className="min-h-[300px]">
    //   <label className="">
    //     + Add Images
    //     <input
    //       className="hidden"
    //       type="file"
    //       name="images"
    //       onChange={onSelectFile}
    //       multiple
    //       accept="image/png , image/jpeg, image/webp"
    //     />
    //   </label>

    //   {selectedImages.length > 0 &&
    //     (selectedImages.length > 5 ? (
    //       <p className="error">
    //         You can't upload more than 5 images! <br />
    //         <span>
    //           please delete <b> {selectedImages.length - 10} </b> of them{" "}
    //         </span>
    //       </p>
    //     ) : (
    //       <button
    //         className="upload-btn"
    //         onClick={() => {
    //           console.log(selectedImages);
    //         }}
    //       >
    //         UPLOAD {selectedImages.length} IMAGE
    //         {selectedImages.length === 1 ? "" : "S"}
    //       </button>
    //     ))}

    // <div className="images">
    //   {selectedImages &&
    //     selectedImages.map((image, index) => {
    //       return (
    //         <div key={image} className="image">
    //           <img src={image} height="200" alt="upload" />
    //           <button onClick={() => deleteHandler(image)}>
    //             delete image
    //           </button>
    //           <p>{index + 1}</p>
    //         </div>
    //       );
    //     })}
    // </div>
    // </section>
  );
};

export default ImageUpload;

import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

function UserNotLoggedIn() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] bg-[#F8F8F8] flex justify-center items-center ">
      <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-700"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                You are not logged in.
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please Log in to continue.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserNotLoggedIn;

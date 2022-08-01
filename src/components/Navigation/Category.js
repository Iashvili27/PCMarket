import React, { useState, Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  IoArrowForwardCircle,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Category() {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="">
      <div className="hidden md:flex h-[50px] w-full justify-center items-center">
        <button className="mx-2 inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          PC
        </button>
        <Menu as="div" className="relative inline-block text-left mx-2 ">
          <div>
            <Menu.Button className="inline-flex rounded-md justify-center w-full  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Components
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-[100%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      CPU
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      GPU
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Motherboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Power Supply
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      RAM
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Case
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Fans
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Drives
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Other
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <button className="mx-2 inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Laptops
        </button>
        <button className="mx-2 inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Consoles
        </button>
        <button className="mx-2 inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Monitors
        </button>
        <Menu as="div" className="relative inline-block text-left mx-2">
          <div>
            <Menu.Button className="inline-flex justify-center rounded-md w-full r  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Peripherals
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-50  origin-top-right absolute right-0 mt-2 w-[100%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Mouse
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Keyboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Speakers
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Headset
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Chair
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Other
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="flex md:hidden h-[50px] w-full justify-end items-center p-1">
        <div
          onClick={handleNav}
          className=" flex flex-row border-2 rounded-lg w-[180px] justify-center"
        >
          <p className="text-lg mr-1 font-semibold">Categories</p>
          <AiOutlineMenu size={30} />
        </div>
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[100%] border-r bg-white border-r-gray-900 h-full z-50"
            : "hidden"
        }
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-between border-b-2 w-[100%]">
            <h3 className="p-4">Categories</h3>
            <div onClick={handleNav} className="p-4">
              <AiOutlineClose size={30} className="" />
            </div>
          </div>
          <ul className="flex flex-col w-[80%] h-full ">
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>PC</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Components</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Laptops</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Consoles</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Monitors</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Peripherals</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
            <li className="border-b-2 p-5 flex justify-between">
              <button className="w-[80%] flex justify-between items-center">
                <p>Accessories</p>
                <IoArrowDownCircleOutline size={25} />
              </button>
              <button>
                <IoArrowForwardCircle size={25} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;

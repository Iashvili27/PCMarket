import React from "react";
import ImageMonitor from "../../Assets/monitor.png";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserPage() {
  const navigation = [
    { name: "Add Item", to: "/additem", current: false },
    { name: "My Products", to: "/myproducts", current: false },
    { name: "Settings", to: "/options", current: false },
    { name: "Verify", to: "/verify", current: false },
  ];
  return (
    <>
      <div className="min-h-[80vh]">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src={ImageMonitor}
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      as="a"
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="min-h-[50vh]">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
            {/* Replace with your content */}

            <div className="border-4 border-dashed border-gray-200 rounded-lg  min-h-[50vh] flex justify-around flex-col">
              <Outlet />
            </div>

            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
    // <div className="userpage-container">
    //   <div className="userpage-menubox">
    //     <Link className="userpage-link" to="/additem">
    //       Add Item
    //     </Link>
    //     <Link className="userpage-link" to="/myproducts">
    //       My Items
    //     </Link>
    //     <Link className="userpage-link" to="/options">
    //       Options
    //     </Link>
    //   </div>
    //   <div className="userpage-itembox">
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default UserPage;

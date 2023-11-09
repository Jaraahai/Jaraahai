import React, { Fragment, useState, useEffect } from "react";
import "../App.css";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAddProfileData } from "../hooks/useAddProfile";
// import useAuthState from "../hooks/useAuthState";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import profilePic from "../img/profile.png";
import logoPic from "../img/hexa.png";

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AuthNavbar() {
  const navigate = useNavigate();
  // const { user } = useAuthState();

  // if (location.pathname === "/auth" || user) {
  //   return null;
  // }
  const { userInfo, db } = useAddProfileData();
  const [name, setName] = useState(userInfo.name || "");
  const [photoURL, setPhotoURL] = useState(userInfo.photoURL || "");

  async function fetchData() {
    const res = await getDoc(doc(db, "profile", userInfo.userID));
    if (res.exists()) {
      const userData = res.data(doc);
      setName(userData.name);
      setPhotoURL(userData.photoURL);
    } else {
      console.log("Document does not exist.");
    }
  }
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Disclosure as="nav" className="tw-bg-[#1f1f1f]">
      {({ open }) => (
        <>
          <div className="tw-mx-auto tw-max-w-7xl tw-px-2 sm:tw-px-6 lg:tw-px-8">
            <div className="tw-p-4 tw-flex tw-h-16 tw-items-center tw-justify-between">
              {/* <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-sm:hidden"> */}
              {/* Mobile menu button*/}
              {/* <Disclosure.Button className="tw-relative tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-p-2 tw-text-gray-400 tw-hover:bg-gray-700 tw-hover:text-white tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-inset tw-focus:ring-white">
                  <span className="tw-absolute tw--inset-0.5" />
                  <span className="tw-sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="tw-block tw-h-6 tw-w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="tw-block tw-h-6 tw-w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button> */}
              {/* </div> */}
              <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center ">
                <div className="tw-space-x-2 tw-flex tw-flex-shrink-0 tw-items-center">
                  <a href="/dashboard">
                    <img
                      className="tw-h-10 tw-w-auto"
                      src={logoPic}
                      alt="Your Company"
                    />
                  </a>
                </div>
                {/* <div className="tw-hidden sm:tw-ml-6 sm:tw-block">
                  <div className="tw-flex tw-space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "tw-bg-gray-900 tw-text-white"
                            : "tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white",
                          "tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="tw-space-x-2 tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <div className="tw-text-white tw-tracking-[0.02em] tw-text-sm tw-font-normal tw-leading-5">
                  <p>{name}</p>
                </div>
                <Menu as="div" className="tw-relative tw-ml-3">
                  <div>
                    <Menu.Button className="tw-relative tw-flex tw-rounded-full tw-bg-gray-800 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800">
                      <span className="tw-absolute tw--inset-1.5" />
                      <span className="tw-sr-only">Open user menu</span>
                      <img
                        className="tw-h-8 tw-w-8 tw-rounded-full"
                        src={photoURL || profilePic}
                        alt=""
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
                    <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-48 tw-origin-top-right tw-rounded-md tw-bg-white tw-py-1 tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? "tw-bg-gray-100" : "",
                              "tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(
                              active ? "tw-bg-gray-100" : "",
                              "tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700"
                            )}
                            onClick={signUserOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="tw-sm:hidden">
            <div className="tw-space-y-1 tw-px-2 tw-pb-3 tw-pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "tw-bg-gray-900 tw-text-white"
                      : "tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white",
                    "tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-base tw-font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default AuthNavbar;

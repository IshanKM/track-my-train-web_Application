import React, { useState, useEffect } from "react";
import logo from "../../assets/logo4.png"; // Import logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu visibility
  const [currentTime, setCurrentTime] = useState(new Date()); // State to keep track of current time

  // Function to toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <nav className="fixed top-0 z-20 w-full h-24 bg-white border-b border-gray-200 dark:bg-gray-900 start-0 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between p-4 mx-auto max-w-screen-2xl">
          {/* Logo and title */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-16" alt="Flowbite Logo" />
            {/* Hide the title on mobile view */}
            <span className="self-center hidden text-2xl font-semibold md:inline whitespace-nowrap dark:text-white"></span>
          </a>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {/* Time and date display */}
            <div
              className="flex content-center justify-center p-4 m-auto text-lg text-white text-gray-900 rounded-md w-60 md:m-auto md:bg-orange-600"
              style={{ backgroundColor: "#0a314a" }}
            >
              {currentTime.toLocaleTimeString()} -{" "}
              {currentTime.toLocaleDateString()}
            </div>
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* Navbar links */}
          <div
            className={`items-center justify-between ${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

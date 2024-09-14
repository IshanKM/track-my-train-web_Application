import React, { useState, useEffect } from "react";
import logo from "../../assets/logo4.png"; //

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
    <nav className="top-0 z-20 w-full h-24 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-600">
      <div className="flex items-center justify-between p-4 mx-auto max-w-screen-2xl">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} className="h-16" alt="Logo" />
        </a>

        {/* Time and date display (hidden in mobile view) */}
        <div
          className="items-center hidden p-4 text-lg text-white rounded-md md:flex md:items-center md:justify-center"
          style={{ backgroundColor: "#0a314a" }}
        >
          {currentTime.toLocaleTimeString()} -{" "}
          {currentTime.toLocaleDateString()}
        </div>

        {/* Mobile view - Centered logo */}
        <div
          className={`fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <img src={logo} className="h-16" alt="Logo" />
        </div>

        {/* Navbar links */}
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Us
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
  );
};

export default Navbar;

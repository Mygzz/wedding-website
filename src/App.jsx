import React, { useState, useRef, useEffect } from "react";
import logo from "./assets/B&M-logo.png";
import backgroundImage from "./assets/HomeBG.jpg";


const App = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Common menu items for consistency
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "photo", label: "Photo" },
    { id: "theme", label: "Theme" },
    { id: "maps", label: "Maps" },
    { id: "rsvp", label: "RSVP" },
  ];

  const closeAllMenus = () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#221024] min-h-screen">
      {/* Header */}
      <header className="bg-transparent border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="B&M Logo"
                className="h-12 w-12 md:h-16 md:w-16"
              />
            </div>

            {/* Right side with dropdown - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              {/* User Dropdown with swap button */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="btn btn-circle swap swap-rotate text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  {/* Hamburger icon */}
                  <svg
                    className={`${
                      isUserDropdownOpen ? "hidden" : "block"
                    } fill-white`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* Close icon */}
                  <svg
                    className={`${
                      isUserDropdownOpen ? "block" : "hidden"
                    } fill-white`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon
                      points="400 145.49 366.51 112 256 222.51 
                        145.49 112 112 145.49 222.51 256 
                        112 366.51 145.49 400 256 289.49 
                        366.51 400 400 366.51 289.49 256 
                        400 145.49"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 z-50 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg transform transition-all duration-200 ease-out ${
                    isUserDropdownOpen
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }`}
                >
                  {/* Menu Items */}
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={closeAllMenus}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button - Visible only on mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeAllMenus}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <section
          id="home"
          className="relative h-screen bg-cover bg-center md:bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-white"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center  text-white px-4">
            {/* Top Text */}
            <div className="mb-4 md:mb-8 w-60 max-w-md sm:w-80  ">
              <p className="text-sm md:text-lg lg:text-xl text-[#C587CD] font-['Poppins'] text-shadow-lg tracking-widest leading-relaxed">
                With hearts entwined and families united
              </p>
            </div>

            {/* Main Names - Mobile Optimized */}
            <div className="flex flex-col items-center justify-center mb-4 md:mb-8 px-2">
              {/* Benson */}
              <h2 className="text-8xl sm:text-9xl md:text-9xl lg:text-8xl xl:text-9xl font-['Kapakana'] text-shadow-sm text-shadow-white text-[#49284D] tracking-tight md:tracking-wider leading-tight">
                Benson
              </h2>

              {/* Ampersand */}
              <h2 className="text-8xl sm:text-9xl md:text-9xl lg:text-7xl xl:text-8xl font-['Kapakana'] text-shadow-lg text-[#49284D] my-1 md:my-2">
                &
              </h2>

              {/* Mich Rogene */}
              <h2 className="text-8xl sm:text-9xl md:text-9xl lg:text-8xl  xl:text-9xl font-['Kapakana'] text-shadow-sm text-shadow-white text-[#49284D] tracking-tight md:tracking-wider leading-tight">
                Mich Rogene
              </h2>
            </div>

            {/* Bottom Text */}
            <div className="mt-4 md:mt-8 w-full max-w-md">
              <p className="text-sm md:text-lg lg:text-xl text-[#C587CD] font-['Poppins'] text-shadow-lg tracking-widest leading-relaxed">
                Graciously invite you to share in the joy of their wedding day
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section - Simple Row Layout */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-8 md:mb-12">
              Wedding Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Date & Time */}
              <div className="text-center md:text-right space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-[#49284D]">
                  Thursday, October 30
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-['Poppins'] font-medium text-[#C587CD]">
                  3:00 PM
                </p>
              </div>

              {/* Vertical Line */}
              <div className="hidden md:flex justify-center">
                <div className="w-px h-20 bg-[#C587CD]"></div>
              </div>

              {/* Horizontal Line for Mobile */}
              <div className="md:hidden flex justify-center">
                <div className="w-32 h-px bg-[#C587CD] my-4"></div>
              </div>

              {/* Venue Info */}
              <div className="text-center md:text-left space-y-2">
                <p className="font-['Poppins'] font-bold text-lg sm:text-xl md:text-2xl text-[#49284D]">
                  PARISH OF THE IMMACULATE HEART OF MARY
                </p>
                <div className="font-['Poppins'] text-base sm:text-lg md:text-xl text-gray-700">
                  <p>Daang Bakal Road, Brgy. Dela Paz,</p>
                  <p>Antipolo City</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Section */}
        <section id="photo" className="py-12 md:py-16 bg-[#F5F4F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
              Photo Gallery
            </h2>
            <p className="text-gray-600 text-center md:text-left">
              Cherished moments and beautiful memories from our journey
              together.
            </p>
          </div>
        </section>

        {/* Theme Section */}
        <section id="theme" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
              Wedding Theme
            </h2>
            <p className="text-gray-600 text-center md:text-left">
              Discover the elegant theme and style that will make our special
              day unforgettable.
            </p>
          </div>
        </section>

        {/* Maps Section */}
        <section id="maps" className="py-12 md:py-16 bg-[#F5F4F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
              Venue & Location
            </h2>
            <p className="text-gray-600 text-center md:text-left">
              Find your way to our wedding venue with detailed maps and
              directions.
            </p>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
              RSVP
            </h2>
            <p className="text-gray-600 text-center md:text-left">
              Please let us know if you'll be able to join us in celebrating our
              special day!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

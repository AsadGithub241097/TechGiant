import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../icons/techgiant";

gsap.registerPlugin(ScrollTrigger);

// Memoized dropdown item component
const DropdownItem = memo(({ 
  title, 
  description, 
  bgColor, 
  hoverColor, 
  onClick 
}: { 
  title: string; 
  description: string; 
  bgColor: string; 
  hoverColor: string; 
  onClick: () => void; 
}) => (
  <div
    onClick={onClick}
    className={`flex flex-col justify-between p-2 sm:p-4 lg:p-8 ${bgColor} hover:${hoverColor} transition-colors text-white hover:text-black duration-300 cursor-pointer`}
  >
    <div className="mb-2 sm:mb-4 lg:mb-8">
      <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 lg:mb-4 break-words">
        {title}
      </h3>
      <p className="text-xs sm:text-sm lg:text-base whitespace-normal font-sans">
        {description}
      </p>
    </div>
    <div className="text-right">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <path
          d="M16 7L21 12M21 12L16 17M21 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
));

// Memoized mobile menu component
const MobileMenu = memo(({ 
  isOpen, 
  onClose, 
  onServiceClick 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onServiceClick: (path: string) => void; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed inset-y-0 right-0 w-64 bg-white p-4">
        <button onClick={onClose} className="absolute top-4 right-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block py-2" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => onServiceClick("/Vapt")}
                className="block w-full text-left py-2"
              >
                VAPT
              </button>
            </li>
            <li>
              <button
                onClick={() => onServiceClick("/Development")}
                className="block w-full text-left py-2"
              >
                Development
              </button>
            </li>
            <li>
              <button
                onClick={() => onServiceClick("/Marketing")}
                className="block w-full text-left py-2"
              >
                Marketing
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
});

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleMouseEnter = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  }, [timeoutId]);

  const handleMouseLeave = useCallback(() => {
    timeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  }, [timeoutId]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      (!mobileDropdownRef.current || !mobileDropdownRef.current.contains(event.target as Node))
    ) {
      setIsDropdownOpen(false);
      setIsMobileDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: isDropdownOpen ? 180 : 0,
        duration: 0.3,
      });
    }
  }, [isDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) {
      setIsMobileDropdownOpen(false);
    }
  };

  const closeAllMenus = useCallback(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  }, []);

  const handleMobileServiceClick = (path: string) => {
    closeAllMenus();
    navigate(path);
  };

  const toggleMobileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileDropdownOpen(prev => !prev);
  };

  const services = [
    {
      title: "VAPT.",
      description: "Handcraft the\nuser experience.",
      bgColor: "bg-[#9B7EBD]",
      hoverColor: "bg-[#D4BEE4]",
      path: "/Vapt"
    },
    {
      title: "Development.",
      description: "Leverage the\npower of code.",
      bgColor: "bg-[#674188]",
      hoverColor: "bg-[#C8A1E0]",
      path: "/Development"
    },
    {
      title: "Marketing.",
      description: "Creative strategies\nfor brands.",
      bgColor: "bg-[#61318b]",
      hoverColor: "bg-[#BC7FCD]",
      path: "/Marketing"
    }
  ];

  return (
    <div className="wrap" id="headerContainer">
      <header className="fixed z-20 px-4 md:px-20 py-2 top-0 left-0 w-full text-black h-[var(--header-height)] bg-navBg shadow-sm font-doto font-bold">
        <div className="flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <Icon height={60} width={100} />
          </div>

          <button
            className="md:hidden text-black focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // strokeLinecap="round"
                // strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <nav className="hidden md:block">
            <ul className="flex space-x-10 md:space-x-16 items-center">
              <li>
                <Link to="/" className="text-white hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 text-white hover:text-blue-600">
                  Services
                  <svg
                    ref={arrowRef}
                    className="w-4 h-4 transform transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute mt-6 pt-4 left-[-500%] transform -translate-x-1/2 w-screen max-w-6xl"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent shadow-lg rounded-lg overflow-hidden">
                      {services.map((service) => (
                        <DropdownItem
                          key={service.title}
                          title={service.title}
                          description={service.description}
                          bgColor={service.bgColor}
                          hoverColor={service.hoverColor}
                          onClick={() => handleMobileServiceClick(service.path)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {isMobileMenuOpen && (
            <div 
              className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
              onClick={closeAllMenus}
            >
              <nav 
                className="absolute top-0 right-0 w-4/5 h-full bg-[#ADB2D4] p-4 shadow-lg overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6 w-full ">
                  <div 
                    onClick={() => {
                      navigate("/");
                      closeAllMenus();
                    }} 
                    className="cursor-pointer"
                  >
                    <Icon height={40} width={80} />
                  </div>
                  <button
                    className="text-black focus:outline-none"
                    onClick={closeAllMenus}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <ul className="flex flex-col space-y-4">
                  <li>
                    <button
                      onClick={() => handleMobileServiceClick("/")}
                      className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                    >
                      Home
                    </button>
                  </li>
                  <li className="relative">
                    <button
                      className="flex items-center justify-between w-full py-2 text-left text-black hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                      onClick={toggleMobileDropdown}
                    >
                      <span>Services</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          isMobileDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </button>
                    {isMobileDropdownOpen && (
                      <div 
                        ref={mobileDropdownRef}
                        className="pl-4 mt-2 space-y-2 "
                      >
                        <button
                          onClick={() => handleMobileServiceClick("/Vapt")}
                          className="block w-full text-left py-2 text-black hover:text-white hover:bg-navBg pl-3 rounded-xl hover:font-sans"
                        >
                          VAPT
                        </button>
                        <button
                          onClick={() => handleMobileServiceClick("/Development")}
                          className="block w-full text-left py-2 text-gray-800 hover:text-white hover:bg-navBg pl-3 rounded-xl hover:font-sans"
                        >
                          Development
                        </button>
                        <button
                          onClick={() => handleMobileServiceClick("/Marketing")}
                          className="block w-full text-left py-2 text-gray-800 hover:text-white hover:bg-navBg pl-3 rounded-xl hover:font-sans"
                        >
                          Marketing
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeAllMenus}
        onServiceClick={handleMobileServiceClick}
      />
    </div>
  );
};

export default memo(Header);
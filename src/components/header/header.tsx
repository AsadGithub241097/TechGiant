import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../icons/techgiant";
import { useAuth } from "../../contexts/FirebaseAuthContext";

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



const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  let timeoutId: number | null = null;

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
      <header className="fixed z-20 px-4 sm:px-6 md:px-12 lg:px-20 py-2 top-0 left-0 w-full text-black h-[var(--header-height)] bg-navBg shadow-sm font-doto font-bold">
        <div className="flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <Icon height={40} width={80} className="sm:h-12 sm:w-20 md:h-16 md:w-24 lg:h-20 lg:w-28" />
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
              <li>
                <Link to="/about" className="text-white hover:text-blue-600">
                  About Us
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-white hover:text-blue-600">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={async () => {
                        await logout();
                        navigate('/');
                      }}
                      className="text-white hover:text-red-400 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="text-white hover:text-blue-600">
                    Login
                  </Link>
                </li>
              )}
              {/* Temporarily hidden - keeping code for future use
              <li>
                <Link to="/LMS" className="text-white hover:text-blue-600">
                  LMS
                </Link>
              </li>
              <li>
                <Link to="/3d-animation" className="text-white hover:text-blue-600">
                  3D Animation
                </Link>
              </li>
              */}
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
                className="absolute top-0 right-0 w-4/5 sm:w-3/5 md:w-2/5 h-full bg-[#ADB2D4] p-4 sm:p-6 shadow-lg overflow-y-auto"
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
                  <li>
                    <button
                      onClick={() => handleMobileServiceClick("/about")}
                      className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                    >
                      About Us
                    </button>
                  </li>
                  {isAuthenticated ? (
                    <>
                      <li>
                        <button
                          onClick={() => handleMobileServiceClick("/dashboard")}
                          className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                        >
                          Dashboard
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={async () => {
                            await logout();
                            closeAllMenus();
                            navigate('/');
                          }}
                          className="block w-full text-left py-2 text-red-600 rounded-sm hover:text-white hover:bg-red-600 hover:rounded-xl pl-3 pr-3 hover:font-sans"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        onClick={() => handleMobileServiceClick("/login")}
                        className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                      >
                        Login
                      </button>
                    </li>
                  )}
                  {/* Temporarily hidden - keeping code for future use
                  <li>
                    <button
                      onClick={() => handleMobileServiceClick("/LMS")}
                      className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                    >
                      LMS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMobileServiceClick("/3d-animation")}
                      className="block w-full text-left py-2 text-black rounded-sm hover:text-white hover:bg-navBg hover:rounded-xl pl-3 pr-3 hover:font-sans"
                    >
                      3D Animation
                    </button>
                  </li>
                  */}
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


    </div>
  );
};

export default memo(Header);
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Icon from "../../icons/techgiant";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { isAdmin } from "../../utils/adminUtils";

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
  const location = useLocation();
  const { isAuthenticated, logout, appUser } = useAuth();
  const userIsAdmin = appUser ? isAdmin(appUser.email) : false;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (path: string) =>
    location.pathname.toLowerCase() === path.toLowerCase();

  const navLinkClass = (path: string) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive(path) ? "text-carousel3" : "text-gray-200 hover:text-white"
    }`;

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;

    if (mobileMenuButtonRef.current?.contains(target)) {
      return;
    }

    if (mobileMenuRef.current?.contains(target)) {
      return;
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target) &&
      (!mobileDropdownRef.current || !mobileDropdownRef.current.contains(target))
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: isDropdownOpen ? 180 : 0,
        duration: 0.3,
      });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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

  const mobileLinkClass =
    "block w-full text-left py-2.5 px-3 rounded-lg text-gray-200 transition-colors duration-200 hover:bg-white/10 hover:text-white font-sans";

  const mobileMenu = isMobileMenuOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeAllMenus}
          role="presentation"
        >
          <nav
            ref={mobileMenuRef}
            className="absolute top-0 right-0 h-full w-4/5 overflow-y-auto border-l border-white/10 bg-navBg/95 p-4 shadow-2xl backdrop-blur-xl sm:w-3/5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className="mb-6 flex w-full items-center justify-between">
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
                type="button"
                className="text-white focus:outline-none"
                onClick={closeAllMenus}
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
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

            <ul className="flex flex-col space-y-2">
              <li>
                <button type="button" onClick={() => handleMobileServiceClick("/")} className={mobileLinkClass}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleMobileServiceClick("/about")} className={mobileLinkClass}>
                  About Us
                </button>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <button type="button" onClick={() => handleMobileServiceClick("/dashboard")} className={mobileLinkClass}>
                      Dashboard
                    </button>
                  </li>
                  {userIsAdmin && (
                    <li>
                      <button
                        type="button"
                        onClick={() => handleMobileServiceClick("/admin")}
                        className="block w-full rounded-lg px-3 py-2.5 text-left font-sans font-semibold text-carousel4 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                      >
                        Admin Portal
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={async () => {
                        await logout();
                        closeAllMenus();
                        navigate("/");
                      }}
                      className="block w-full rounded-lg px-3 py-2.5 text-left font-sans text-red-400 transition-colors duration-200 hover:bg-red-500/20 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : null}
              <li className="relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-sans text-gray-200 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  onClick={toggleMobileDropdown}
                >
                  <span>Services</span>
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
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
                  <div ref={mobileDropdownRef} className="mt-1 space-y-1 pl-4">
                    <button
                      type="button"
                      onClick={() => handleMobileServiceClick("/Vapt")}
                      className="block w-full rounded-lg py-2 pl-3 text-left text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      VAPT
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMobileServiceClick("/Development")}
                      className="block w-full rounded-lg py-2 pl-3 text-left text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      Development
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMobileServiceClick("/Marketing")}
                      className="block w-full rounded-lg py-2 pl-3 text-left text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      Marketing
                    </button>
                  </div>
                )}
              </li>
              {!isAuthenticated && (
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleMobileServiceClick("/login")}
                    className="block w-full rounded-full bg-gradient-to-r from-carousel2 to-carousel1 px-3 py-3 text-center font-sans font-semibold text-white shadow-lg shadow-carousel2/20 transition-all duration-300 hover:shadow-carousel2/40"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
    <div className="wrap" id="headerContainer">
      <header
        className={`fixed top-0 left-0 z-50 w-full px-4 py-3 font-doto font-bold transition-all duration-300 sm:px-6 md:px-12 lg:px-20 ${
          scrolled
            ? "border-b border-white/10 bg-bgColor/80 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <Icon height={32} width={64} className="sm:h-10 sm:w-16 md:h-12 md:w-20 lg:h-14 lg:w-24" />
          </div>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="relative z-[101] text-white focus:outline-none md:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8 lg:space-x-12">
              <li>
                <Link to="/" className={navLinkClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={navLinkClass("/about")}>
                  About Us
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                      Dashboard
                    </Link>
                  </li>
                  {userIsAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        className="text-sm font-semibold tracking-wide text-carousel4 transition-colors duration-300 hover:text-white"
                      >
                        Admin Portal
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      onClick={async () => {
                        await logout();
                        navigate('/');
                      }}
                      className="text-sm font-medium tracking-wide text-gray-300 transition-colors duration-300 hover:text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : null}
              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-gray-200 transition-colors duration-300 hover:text-white">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent shadow-2xl rounded-2xl overflow-hidden">
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
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-carousel2 to-carousel1 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-carousel2/20 transition-all duration-300 hover:scale-105 hover:shadow-carousel2/40"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>

        </div>
      </header>
    </div>
    {mobileMenu}
    </>
  );
};

export default memo(Header);

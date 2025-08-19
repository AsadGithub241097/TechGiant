import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/heroFooter";
import ConnectWithUsSection from "./services/vapt/contactUs";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";
import SEOHead from "./components/SEO/SEOHead";
import { getPageSEO } from "./data/seoConfig";

// Lazy load components
const HomePage = lazy(() => import("./components/Home/homePage"));
const AboutUs = lazy(() => import("./components/aboutUs/AboutUs"));
const VaptContaner = lazy(() => import("./services/vaptContanar"));
const DevContaner = lazy(() => import("./services/development/devContaner"));
const MarketingPage = lazy(() => import("./services/markating/markating"));
const LMSDashboard = lazy(() => import("./components/LMS/Dashboard"));
const Login = lazy(() => import("./components/auth/Login"));
const CourseCategories = lazy(() => import("./components/courses/CourseCategories"));
const CourseListing = lazy(() => import("./components/courses/CourseListing"));
const CourseDetail = lazy(() => import("./components/courses/CourseDetail"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  // Check if current path is LMS, Login, or Courses to conditionally render footer
  const isLMSPage = location.pathname === '/LMS';
  const isLoginPage = location.pathname === '/login';
  const isCoursePage = location.pathname.startsWith('/course');
  const isAboutPage = location.pathname === '/about';

  // Get SEO configuration for current page
  const currentPageSEO = getPageSEO(location.pathname);

  return (
    <div className="bg-bgColor overflow-x-hidden">
      {/* SEO Head Component */}
      <SEOHead 
        title={currentPageSEO.title}
        description={currentPageSEO.description}
        keywords={currentPageSEO.keywords}
        ogImage={currentPageSEO.ogImage}
        structuredData={currentPageSEO.structuredData}
      />
      {/* Hover trigger zone for LMS page */}
      {isLMSPage && <div className="lms-hover-trigger"></div>}
      
      {/* Header with conditional styling for LMS page */}
      <div className={isLMSPage ? "lms-header-container" : ""}>
        {!isLoginPage && !isCoursePage && !isAboutPage && <Header />}
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <div className={isLMSPage ? "lms-page-content" : ""}>
          <Routes key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/Vapt" element={<VaptContaner />} />
            <Route path="/Development" element={<DevContaner />} />
            <Route path="/Marketing" element={<MarketingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/LMS" element={<LMSDashboard />} />
            <Route path="/courses" element={<CourseCategories />} />
            <Route path="/courses/:category" element={<CourseListing />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
          </Routes>
        </div>
      </Suspense>
      {!isLMSPage && !isLoginPage && !isCoursePage && !isAboutPage && <ConnectWithUsSection />}
      {!isLMSPage && !isLoginPage && !isCoursePage && !isAboutPage && <Footer />}
      
      {/* WhatsApp Float Button - Show on all pages */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/heroFooter";
import ConnectWithUsSection from "./services/vapt/contactUs";

// Lazy load components
const HomePage = lazy(() => import("./components/Home/homePage"));
const VaptContaner = lazy(() => import("./services/vaptContanar"));
const DevContaner = lazy(() => import("./services/development/devContaner"));
const MarketingPage = lazy(() => import("./services/markating/markating"));

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

  return (
    <div className="bg-bgColor overflow-x-hidden">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Vapt" element={<VaptContaner />} />
          <Route path="/Development" element={<DevContaner />} />
          <Route path="/Marketing" element={<MarketingPage />} />
        </Routes>
      </Suspense>
      <ConnectWithUsSection />
      <Footer />
    </div>
  );
}

export default App;
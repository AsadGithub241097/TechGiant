import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE } from '../../constants/mediaUrls';
import { siteUrl } from '../../constants/siteConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Tech Giant - Leading IT Services Company | Web Development, QA, Digital Marketing & Training",
  description = "Tech Giant is India's premier IT services company specializing in innovative web development, quality assurance, digital marketing, and professional training. Founded by industry experts Sameer and Ibrahim, we deliver cutting-edge technology solutions to startups, SMEs, and enterprises worldwide.",
  keywords = "tech giant, tech giant company, IT services, web development, digital marketing, quality assurance, training placement, software solutions, technology company, web development company, SEO services, app development",
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  structuredData
}) => {
  const location = useLocation();
  const currentUrl = siteUrl(location.pathname);
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Update Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:site_name', 'Tech Giant');
    
    // Update Twitter tags
    updateMetaProperty('twitter:title', title);
    updateMetaProperty('twitter:description', description);
    updateMetaProperty('twitter:image', ogImage);
    updateMetaProperty('twitter:card', 'summary_large_image');
    
    // Update canonical link
    updateCanonicalLink(canonicalUrl);
    
    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }
    
    // Add breadcrumb structured data for pages
    addBreadcrumbStructuredData();
    
  }, [title, description, keywords, ogImage, canonicalUrl, structuredData, location.pathname]);

  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateMetaProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateCanonicalLink = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  };

  const addStructuredData = (data: object) => {
    // Remove existing structured data for this page
    const existingScript = document.querySelector('script[data-page-structured-data]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-structured-data', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const addBreadcrumbStructuredData = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    
    if (pathSegments.length === 0) return; // Homepage, no breadcrumb needed
    
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Tech Giant",
        "item": siteUrl('/')
      }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = getPageName(segment);
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": siteUrl(currentPath)
      });
    });
    
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
    
    addStructuredData(breadcrumbData);
  };

  const getPageName = (segment: string): string => {
    const pageNames: { [key: string]: string } = {
      'about': 'About Tech Giant',
      'Development': 'Web Development Services',
      'Vapt': 'VAPT & Security Testing',
      'Marketing': 'Digital Marketing Services',
      'LMS': 'Learning Management System',
      'courses': 'Training Courses',
      'login': 'Login'
    };
    
    return pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return null; // This component doesn't render anything
};

export default SEOHead;

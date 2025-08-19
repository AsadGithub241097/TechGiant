export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  structuredData?: object;
}

export const seoConfig: { [key: string]: PageSEO } = {
  '/': {
    title: "Tech Giant - Leading IT Services Company | Web Development, QA, Digital Marketing & Training",
    description: "Tech Giant is India's premier IT services company specializing in innovative web development, quality assurance, digital marketing, and professional training. Founded by industry experts Sameer and Ibrahim, we deliver cutting-edge technology solutions to startups, SMEs, and enterprises worldwide.",
    keywords: "tech giant, tech giant company, IT services, web development, digital marketing, quality assurance, training placement, software solutions, technology company, web development company, SEO services, app development, India IT company, software development, tech solutions",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "Tech Giant",
      "description": "Leading IT services company providing comprehensive technology solutions",
      "url": "https://techgiant.com",
      "logo": "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
      "slogan": "Empowering the future through innovative software solutions",
      "foundingDate": "2023",
      "founders": [
        {
          "@type": "Person",
          "name": "Sameer"
        },
        {
          "@type": "Person",
          "name": "Ibrahim"
        }
      ]
    }
  },
  '/about': {
    title: "About Tech Giant - Leading IT Company | Founded by Industry Experts Sameer & Ibrahim",
    description: "Learn about Tech Giant, India's premier IT services company founded by Sameer and Ibrahim. Discover our mission to empower businesses with cutting-edge web development, QA, digital marketing, and training solutions.",
    keywords: "about tech giant, tech giant company history, Sameer Ibrahim founders, IT company India, technology leadership, software development company, tech giant team, IT services provider",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Tech Giant",
      "description": "Learn about Tech Giant's mission, vision, and team",
      "url": "https://techgiant.com/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Tech Giant",
        "founder": [
          {
            "@type": "Person",
            "name": "Sameer",
            "jobTitle": "Co-Founder"
          },
          {
            "@type": "Person",
            "name": "Ibrahim", 
            "jobTitle": "Founder"
          }
        ]
      }
    }
  },
  '/Development': {
    title: "Web Development Services by Tech Giant | Custom Software & Website Development",
    description: "Tech Giant offers professional web development services including custom websites, web applications, e-commerce solutions, and software development. Expert team delivering scalable, modern solutions for businesses.",
    keywords: "web development services, custom website development, software development, web application development, e-commerce development, tech giant development, website design, full stack development, React development, Node.js development",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/website.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "description": "Professional web development and software solutions",
      "provider": {
        "@type": "Organization",
        "name": "Tech Giant"
      },
      "serviceType": "Web Development",
      "areaServed": "Global"
    }
  },
  '/Vapt': {
    title: "VAPT Services by Tech Giant | Vulnerability Assessment & Penetration Testing",
    description: "Tech Giant provides comprehensive VAPT (Vulnerability Assessment and Penetration Testing) services to secure your digital infrastructure. Expert cybersecurity testing and security operations services.",
    keywords: "VAPT services, vulnerability assessment, penetration testing, cybersecurity testing, security audit, tech giant security, IT security services, security operations, cyber security consultant",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/securitytesting.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "VAPT Security Services",
      "description": "Vulnerability Assessment and Penetration Testing services",
      "provider": {
        "@type": "Organization",
        "name": "Tech Giant"
      },
      "serviceType": "Cybersecurity",
      "areaServed": "Global"
    }
  },
  '/Marketing': {
    title: "Digital Marketing Services by Tech Giant | SEO, Social Media & Online Marketing",
    description: "Tech Giant offers comprehensive digital marketing services including SEO, social media marketing, PPC advertising, and content marketing. Boost your online presence with our expert marketing team.",
    keywords: "digital marketing services, SEO services, social media marketing, online marketing, tech giant marketing, PPC advertising, content marketing, digital advertising, search engine optimization",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Digital Marketing Services", 
      "description": "Comprehensive digital marketing and SEO services",
      "provider": {
        "@type": "Organization",
        "name": "Tech Giant"
      },
      "serviceType": "Digital Marketing",
      "areaServed": "Global"
    }
  },
  '/LMS': {
    title: "Learning Management System by Tech Giant | Online Training Platform",
    description: "Access Tech Giant's comprehensive Learning Management System (LMS) with industry-aligned training courses, skill development programs, and placement assistance. Start your tech career today.",
    keywords: "learning management system, tech giant LMS, online training platform, IT training courses, skill development, tech training, placement assistance, coding bootcamp, technology education",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Tech Giant LMS",
      "description": "Online learning platform for technology education",
      "url": "https://techgiant.com/LMS",
      "provider": {
        "@type": "Organization",
        "name": "Tech Giant"
      }
    }
  },
  '/courses': {
    title: "Tech Training Courses by Tech Giant | Programming, Web Development & IT Skills",
    description: "Explore Tech Giant's comprehensive training courses in web development, programming, digital marketing, and IT skills. Industry-expert instructors, hands-on projects, and placement assistance.",
    keywords: "tech training courses, programming courses, web development training, IT skills courses, tech giant courses, coding bootcamp, technology education, placement training",
    ogImage: "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Tech Giant Training Courses",
      "description": "Comprehensive technology training and placement programs",
      "provider": {
        "@type": "Organization", 
        "name": "Tech Giant"
      }
    }
  }
};

export const getPageSEO = (pathname: string): PageSEO => {
  return seoConfig[pathname] || seoConfig['/'];
};

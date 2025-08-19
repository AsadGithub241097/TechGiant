// SEO Utility Functions for Tech Giant Website

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substr(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substr(0, lastSpace) + '...' : truncated + '...';
};

export const generateKeywords = (baseKeywords: string[], pageSpecific: string[] = []): string => {
  const techGiantKeywords = [
    'tech giant',
    'tech giant company', 
    'tech giant india',
    'tech giant IT services',
    'tech giant solutions'
  ];
  
  const allKeywords = [...techGiantKeywords, ...baseKeywords, ...pageSpecific];
  return [...new Set(allKeywords)].join(', ');
};

export const generateStructuredData = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tech Giant",
    "alternateName": ["Tech Giant Company", "Tech Giant India", "TechGiant"],
    "url": "https://techgiant.com",
    "logo": "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    "description": "Tech Giant is India's premier IT services company specializing in web development, quality assurance, digital marketing, and professional training.",
    "foundingDate": "2023",
    "founders": [
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
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Asad",
        "jobTitle": "Lead Developer"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/techgiant",
      "https://twitter.com/techgiant",
      "https://www.facebook.com/techgiant"
    ],
    "knowsAbout": [
      "Web Development",
      "Software Development", 
      "Quality Assurance",
      "Digital Marketing",
      "SEO Services",
      "Technology Training",
      "IT Consulting",
      "VAPT Services",
      "Cybersecurity"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development Services",
          "description": "Custom web development and software solutions"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Quality Assurance Services",
          "description": "Comprehensive QA and testing services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Digital Marketing Services",
          "description": "SEO, social media marketing, and digital advertising"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Training & Placement Services", 
          "description": "Industry-aligned technical training and job placement"
        }
      }
    ]
  }),

  website: (url: string = "https://techgiant.com") => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tech Giant - Leading IT Services Company",
    "alternateName": "Tech Giant",
    "url": url,
    "description": "Tech Giant offers comprehensive IT services including web development, quality assurance, digital marketing, and professional training programs.",
    "publisher": {
      "@type": "Organization",
      "name": "Tech Giant"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Tech Giant"
    }
  }),

  localBusiness: () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tech Giant",
    "image": "https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png",
    "description": "Premier IT services company providing web development, QA, digital marketing, and training services.",
    "url": "https://techgiant.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday", 
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }),

  breadcrumb: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
};

export const optimizeImageSEO = (src: string, alt: string, title?: string) => ({
  src,
  alt: alt || 'Tech Giant - Premium IT Services',
  title: title || alt,
  loading: 'lazy' as const,
  decoding: 'async' as const
});

export const generateCanonicalUrl = (pathname: string, baseUrl: string = "https://techgiant.com"): string => {
  // Remove trailing slashes and ensure clean URLs
  const cleanPath = pathname.replace(/\/+$/, '') || '';
  return `${baseUrl}${cleanPath}`;
};

export const extractTextContent = (htmlString: string): string => {
  // Remove HTML tags and extract clean text for meta descriptions
  return htmlString
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Keywords ranking priority for Tech Giant
export const keywordPriority = {
  primary: [
    'tech giant',
    'tech giant company',
    'tech giant india',
    'tech giant IT services'
  ],
  secondary: [
    'web development company',
    'IT services company',
    'software development',
    'quality assurance services',
    'digital marketing services',
    'technology training'
  ],
  longTail: [
    'tech giant web development services',
    'tech giant digital marketing solutions', 
    'best IT company in India',
    'professional web development tech giant',
    'tech giant training and placement',
    'tech giant cybersecurity services'
  ]
};

export const socialMediaMeta = {
  openGraph: (title: string, description: string, image: string, url: string) => ({
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'website',
    'og:site_name': 'Tech Giant',
    'og:locale': 'en_US'
  }),
  
  twitter: (title: string, description: string, image: string) => ({
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:creator': '@techgiant',
    'twitter:site': '@techgiant'
  })
};

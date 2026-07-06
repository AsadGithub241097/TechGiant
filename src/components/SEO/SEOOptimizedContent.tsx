import React from 'react';
import { siteUrl } from '../../constants/siteConfig';

// SEO-optimized content components for better keyword ranking

export const SEOHomePageContent: React.FC = () => {
  return (
    <>
      {/* Hidden SEO content for search engines */}
      <div className="sr-only">
        <h1>Tech Giant - India's Leading IT Services Company</h1>
        <p>
          Tech Giant is India's premier IT services company founded by industry experts Sameer and Ibrahim. 
          We specialize in cutting-edge web development, comprehensive quality assurance, innovative digital marketing, 
          and professional training & placement services. As a trusted Tech Giant in the technology sector, 
          we empower businesses with scalable software solutions and bridge the skills gap through 
          industry-aligned training programs.
        </p>
        <h2>Tech Giant Services</h2>
        <ul>
          <li>Custom Web Development by Tech Giant experts</li>
          <li>Comprehensive Quality Assurance Testing</li>
          <li>Advanced Digital Marketing & SEO Services</li>
          <li>Professional Training & Placement Programs</li>
          <li>VAPT & Cybersecurity Solutions</li>
          <li>Software Development & IT Consulting</li>
        </ul>
        <h3>Why Choose Tech Giant?</h3>
        <p>
          Tech Giant stands out as a leading technology company with a proven track record 
          of delivering exceptional results. Our team of skilled professionals at Tech Giant 
          ensures quality, innovation, and client satisfaction in every project.
        </p>
      </div>
      
      {/* Semantic HTML structure for better SEO */}
      <main itemScope itemType="https://schema.org/Organization">
        <span itemProp="name" className="sr-only">Tech Giant</span>
        <link itemProp="url" href={siteUrl('/')} />
        <span itemProp="description" className="sr-only">
          Leading IT services company specializing in web development, QA, digital marketing, and training
        </span>
      </main>
    </>
  );
};

export const SEOServiceSection: React.FC<{
  serviceName: string;
  description: string;
  keywords: string[];
}> = ({ serviceName, description, keywords }) => {
  return (
    <section itemScope itemType="https://schema.org/Service">
      <div className="sr-only">
        <h2 itemProp="name">Tech Giant {serviceName}</h2>
        <p itemProp="description">
          Tech Giant offers professional {serviceName.toLowerCase()} services. {description}
        </p>
        <div itemProp="keywords">
          {keywords.map(keyword => `tech giant ${keyword}`).join(', ')}
        </div>
        <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">Tech Giant</span>
        </span>
      </div>
    </section>
  );
};

export const SEOBreadcrumb: React.FC<{
  items: Array<{ name: string; url: string }>
}> = ({ items }) => {
  return (
    <nav 
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
      className="sr-only"
      aria-label="Breadcrumb navigation"
    >
      <ol>
        {items.map((item, index) => (
          <li 
            key={index}
            itemScope 
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <a 
              href={item.url}
              itemProp="item"
              itemType="https://schema.org/WebPage"
            >
              <span itemProp="name">Tech Giant - {item.name}</span>
            </a>
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const SEOPageHeader: React.FC<{
  title: string;
  subtitle?: string;
  description: string;
}> = ({ title, subtitle, description }) => {
  return (
    <header className="sr-only">
      <h1>Tech Giant - {title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <p>{description}</p>
      <address>
        <span>Tech Giant Company</span>
        <span>Leading IT Services Provider</span>
        <span>Founded by Sameer and Ibrahim</span>
      </address>
    </header>
  );
};

// Enhanced heading component with SEO optimization
export const SEOHeading: React.FC<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  includeTechGiant?: boolean;
}> = ({ level, children, className = '', includeTechGiant = false }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={className}>
      {includeTechGiant && level === 1 && 'Tech Giant - '}
      {children}
    </Tag>
  );
};

// Content wrapper with semantic HTML
export const SEOSection: React.FC<{
  children: React.ReactNode;
  sectionType?: 'main' | 'article' | 'section' | 'aside';
  className?: string;
  schemaType?: string;
}> = ({ 
  children, 
  sectionType = 'section', 
  className = '',
  schemaType 
}) => {
  const Tag = sectionType as keyof JSX.IntrinsicElements;
  const props = schemaType ? {
    itemScope: true,
    itemType: `https://schema.org/${schemaType}`
  } : {};
  
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};

// Keywords density component for natural keyword placement
export const KeywordOptimizedText: React.FC<{
  text: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  className?: string;
}> = ({ text, primaryKeyword, secondaryKeywords, className = '' }) => {
  // Calculate optimal keyword density (2-3% for primary, 1-2% for secondary)
  const words = text.split(' ');
  const totalWords = words.length;
  
  const optimizeText = (originalText: string) => {
    let optimized = originalText;
    
    // Ensure primary keyword appears naturally
    if (!optimized.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      optimized = `${primaryKeyword} ${optimized}`;
    }
    
    // Add secondary keywords if density is low
    secondaryKeywords.forEach(keyword => {
      const keywordCount = (optimized.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      const density = (keywordCount / totalWords) * 100;
      
      if (density < 1 && Math.random() > 0.5) {
        optimized = optimized.replace(/\. /, `. ${keyword} `);
      }
    });
    
    return optimized;
  };
  
  return (
    <div className={className}>
      {optimizeText(text)}
    </div>
  );
};

export default {
  SEOHomePageContent,
  SEOServiceSection,
  SEOBreadcrumb,
  SEOPageHeader,
  SEOHeading,
  SEOSection,
  KeywordOptimizedText
};

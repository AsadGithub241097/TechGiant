import { IMAGE_URLS } from "../../constants/mediaUrls";

const SupportDev = () => {
  const clients = [
    { id: 1, logo: IMAGE_URLS.partners.falahzar, alt: "UBS" },
    { id: 2, logo: IMAGE_URLS.partners.forest, alt: "Babbel" },
    { id: 3, logo: IMAGE_URLS.partners.imflux, alt: "Solaris" },
    { id: 4, logo: IMAGE_URLS.partners.iStaff, alt: "Moonfare" },
    { id: 5, logo: IMAGE_URLS.partners.keyCube, alt: "KW" },
    { id: 6, logo: IMAGE_URLS.partners.prayas, alt: "Merck" },
  ];

  return (
    <section className="bg-navBg text-white py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-2 font-sans">
              Why seek support with{' '}
              <span className="text-carousel2 font-sans">web development?</span>
            </h2>
            
            <p className="mt-6 text-white font-sans">
              Businesses that we've worked with reported faster time-to-market, premium user experience, 
              and flawless performance. We build web solutions for:
            </p>
          </div>
          
          {/* <div className="flex justify-end">
            <a 
              href="#clients" 
              className="border border-white rounded-md font-sans py-2 px-4 flex items-center hover:bg-gray-800 transition-colors"
            >
              See our clients
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </a>
          </div> */}
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center font-sans">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-center">
              <img 
                src={client.logo} 
                alt={client.alt} 
                className="h-8 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportDev;
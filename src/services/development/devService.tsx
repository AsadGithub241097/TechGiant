const DevServices = () => {
  return (
    <div className="bg-navBg text-white py-32 px-4">
      {/* top-[-400px] max-h-[100vh] */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-2">
              Achieve your business goals
              <br />
              with{" "}
              <span className="text-carousel2">web development solutions</span>
            </h2>
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-300">
              Our battle-tested developers specialize in a wide range of web
              development services. Here's what we deliver.
            </p>
          </div>
        </div>

        {/* Services - Arranged in three columns exactly as specified */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* First Column - Websites and Ecommerce */}
          <div className=" flex flex-col gap-4 ">
            {/* Websites */}

            <div className="relative rounded overflow-hidden">
              <div className="absolute inset-0 bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/wave.jpg')] bg-cover bg-fixed filter blur-[2px] z-0" />
              <div className="relative z-10 p-6 rounded backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-bold font-doto">
                    Websites
                  </h3>
                  <div className="bg-gray-900 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-white font-sans">
                  A well-designed website is a powerful marketing and
                  communication tool that helps build trust and generate leads.
                  It acts as your brand’s digital face, offering 24/7
                  accessibility and boosting credibility across the globe.
                </p>
              </div>
            </div>

            {/* Ecommerce */}
            <div className="bg-bgColor p-6 rounded ">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white font-doto">
                  Ecommerce
                </h3>
                <div className="bg-gray-900 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-white font-sans">
                With eCommerce solutions, businesses can operate 24/7, reach
                customers in any time zone, and scale globally with ease. These
                platforms simplify inventory, payment, and customer management
                to boost sales and efficiency.
              </p>
            </div>
            {/* bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/wave.jpg')]  blur-md scale-105  bg-fixed transition-all */}
            <div className="relative rounded overflow-hidden">
              {/* Blurred background image layer */}
              <div className="absolute inset-0 bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/wave.jpg')] bg-cover bg-fixed filter blur-[2px] z-0" />

              {/* Foreground content */}
              <div className="relative z-10 p-6 rounded backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white font-doto">
                    Web Applications
                  </h3>
                  <div className="bg-gray-900 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-white font-sans">
                  Build powerful and interactive web applications that engage
                  users and reach a global audience, designed to keep users
                  hooked and boost your online presence. Optimized for speed,
                  responsiveness, and seamless user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Second Column - Web Applications and Content Management Systems */}
          <div className="md:w-1/3 flex flex-col gap-4">
            {/* Web Applications */}

            {/* Content Management Systems */}
            <div className="bg-bgColor p-6 rounded h-full ">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white font-doto">
                  Content Management Systems
                </h3>
                <div className="bg-gray-900 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-white font-sans">
                Get a custom-built CMS tailored to your business, making it easy
                to manage content, streamline workflows, and maintain full
                control over your website. Easily scalable to grow with your
                business and integrate with third-party tools.
              </p>
            </div>
          </div>

          {/* Third Column - Low-Code Development */}
          <div className="md:w-1/3 flex flex-col">
            {/* Low-Code Development */}


             <div className="relative rounded overflow-hidden h-full">
              <div className="absolute inset-0 bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/wave.jpg')] bg-cover bg-fixed filter blur-[2px] z-0" />
              <div className="relative z-10 p-6 rounded backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-bold font-doto">
                  Low-Code Development
                </h3>
                <div className="bg-gray-900 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-white font-sans">
                Accelerate your digital transformation with low-code and no-code
                solutions — a scalable, modular way to build modern apps quickly
                and efficiently. Reduce development time and empower teams with
                minimal coding knowledge.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevServices;

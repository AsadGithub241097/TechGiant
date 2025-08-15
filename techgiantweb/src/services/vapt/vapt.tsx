import adaptiveImg from "../../assets/adaptive.png";
const TGCyberDefense = () => {
  return (
    <div className="w-full bg-bgColor text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-white">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-white">
          {/* Left content section */}
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <div className="border-t-2 border-carousel2 w-8 mb-2"></div>
              <p className="text-sm text-white font-medium">What we do</p>
            </div>

            <h1 className="text-3xl md:text-4xl font-light leading-tight font-sans text-white">
              Build an adaptive, flexible and scalable cyber defense
            </h1>

            <p className="text-white font-sans leading-relaxed text-sm md:text-base mt-6">
              Tech Giant Security Operations and Response Services offer
              businesses a flexible, modular and open approach to streamline and
              strengthen their cybersecurity and incident response capabilities.
              Powered by AI and automation, our comprehensive cyber resilience
              services enable us to assess, advise, implement and deliver
              consulting and managed services that help customers anticipate,
              protect against, withstand, and recover from any cyber outages.
            </p>

            <p className="leading-relaxed text-sm md:text-base mt-4 text-white">
              With Tech Giant's Security Operations and Response Services,
              businesses can choose the tools and operating models they need to
              address various challenges and requirements across different
              regions. This approach ensures data is processed in compliance
              with regional mandates and{" "}
              <span className="text-blue-600 cursor-pointer">
                cyber regulations
              </span>
              .
            </p>
          </div>

          {/* Right content - Image with play button */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded overflow-hidden shadow-md">
              <img
                src={adaptiveImg}
                alt="Tech giant security dashboard with graph data"
                className="w-full h-full object-cover"
              />

              {/* <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                <button className="border border-white bg-black bg-opacity-20 hover:bg-bgColor transition-all px-4 py-2 rounded">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">Play video</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="relative mt-32 md:mt-48"></div>
      </div>
      <div className="text-carousel3 text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] font-bold tracking-widest opacity-20 flex justify-center font-doto">
        How Tech Giant Helps
      </div>
    </div>
  );
};

export default TGCyberDefense;

import React from "react";
import ScrollDown from "../../icons/scrollDown";

const SecurityOperationsHero: React.FC = () => {
  return (
    <div className="w-full relative h-screen md:h-[66rem] mt-[58px]">
      {/* Background image container */}
      <div className="absolute inset-0 w-full h-[80%]">
        <img
          src="./src/assets/vaptBG.png"
          alt="Security operations background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-center flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 flex pb-[15rem]">
          {/* Left content overlay - dark gradient with text */}
          <div className="w-full md:w-5/12 lg:w-5/12 bg-gradient-to-r from-carousel1 to-transparent p-6 md:p-10">
            <div className="space-y-4">
              {/* Top red line and "Cyber resilience" label */}
              <div>
                <div className="border-t-2 border-carousel2 w-8 mb-2"></div>
                <p className="text-sm text-gray-300 font-medium">
                  Cyber resilience
                </p>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl text-white font-light leading-tight">
                Security operations
                <br />
                and response
              </h1>

              {/* Subheading */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4 max-w-md">
                Modernize cybersecurity with a dynamic, modular approach for
                robust protection and swift response
              </p>
            </div>
          </div>

          {/* Right side - intentionally left empty to show the person in the image */}
          <div className="hidden md:block md:w-7/12 lg:w-8/12">
            {/* This area intentionally left empty to show the image of the person */}
          </div>
        </div>
        <div className="absolute bottom-[14rem]">
        <ScrollDown/>
        </div>
        
      </div>
    </div>
  );
};

export default SecurityOperationsHero;

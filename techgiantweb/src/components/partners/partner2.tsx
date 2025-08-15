import React from "react";
import testLogo from "../../assets/logo.svg";
import axis from "../../assets/ourPartners/axis.svg";
import falahzar from "../../assets/ourPartners/falahzar.png";
import imflux from "../../assets/ourPartners/imflux.png";
import istaff from "../../assets/ourPartners/iStaff.png";
import forest from "../../assets/ourPartners/forest.webp";
import keycube from "../../assets/ourPartners/keycube.png";

const images = [testLogo, axis, falahzar, imflux, istaff, forest, keycube];

const SliderRow: React.FC<{ reverse?: boolean }> = ({ reverse }) => {
  const animationClass = reverse ? "animate-scrollReverse" : "animate-scroll";
  return (
    <div className="slider w-full h-[100px] md:h-[80px] sm:h-[60px] xs:h-[40px] shadow-lg overflow-hidden relative">
      {/* Fading gradients on sides */}
      <div className="absolute top-0 left-0 h-full w-[200px] md:w-[150px] sm:w-[100px] xs:w-[50px] bg-gradient-to-r from-bgColor to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-[200px] md:w-[150px] sm:w-[100px] xs:w-[50px] bg-gradient-to-l from-bgColor to-transparent z-10"></div>

      {/* Image strip */}
      <div className={`flex gap-[15rem] md:gap-[10rem] sm:gap-[5rem] xs:gap-[2rem] ${animationClass}`}>
        {[...images, ...images].map((src, index) => (
          <div
            key={`${reverse ? "rev" : "fwd"}-${index}`}
            className="w-full max-w-[250px] h-[100px] flex-shrink-0 
              md:max-w-[150px] md:h-[50px] 
              sm:max-w-[150px] sm:h-[60px] 
              xs:max-w-[100px] xs:h-[40px]"
          >
            <img
              src={src}
              alt={`Partner ${index}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageSlider: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-4 pt-[120px] pb-[120px] xs:pt-[60px] xs:pb-[60px] max-w-[105rem] mx-auto">
    <div className="text-center px-4 sm:px-6 md:px-8 mb-20">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
    Our{" "}
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
      Partners
    </span>
  </h1>

  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-4 max-w-3xl mx-auto leading-relaxed">
    What drives our passion for excellence and innovation in everything we do
  </p>
</div>

      <SliderRow />
      <SliderRow reverse />
    </div>
  );
};

export default ImageSlider;

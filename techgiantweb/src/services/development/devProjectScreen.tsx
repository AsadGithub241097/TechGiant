import React from "react";
import LaptopScreen from "../../assets/laptopScreen.png";

interface DevProjectScreenProps {
  src: string;
}

const DevProjectScreen: React.FC<DevProjectScreenProps> = ({ src }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[800px] h-auto">
        {/* Laptop Image */}
        <img
          src={LaptopScreen}
          alt="Laptop"
          className="w-full h-full object-contain"
        />

        {/* Video inside laptop screen */}
        <div
          className="absolute overflow-hidden rounded-tl-[9px] rounded-tr-[9px]"
          style={{
            top: "27%",
            left: "16.1%",
            width: "68%",
            height: "44%",
          }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DevProjectScreen;

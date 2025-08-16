import React from "react";
import { IMAGE_URLS } from "../../constants/mediaUrls";
import { LoadingImage } from "../../components/ui/LoadingImage";
import { LoadingVideo } from "../../components/ui/LoadingVideo";

interface DevProjectScreenProps {
  src: string;
}

const DevProjectScreen: React.FC<DevProjectScreenProps> = ({ src }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[800px] h-auto">
        {/* Laptop Image */}
        <LoadingImage
          src={IMAGE_URLS.laptopScreen}
          alt="Laptop"
          className="w-full h-full object-contain"
          skeletonClassName="w-full h-full"
          aspectRatio="aspect-auto"
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
          <LoadingVideo
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            skeletonClassName="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DevProjectScreen;

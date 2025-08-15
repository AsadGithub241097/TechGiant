// import React, { useState, useEffect, useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// type CarouselItemProps = {
//   location: string;
//   country: string;
//   tagline: string;
//   isActive: boolean;
//   bg: string;
//   className?: string;
// };

// const CarouselItem: React.FC<CarouselItemProps> = ({
//   location,
//   country,
//   tagline,
//   isActive,
//   bg,
//   className = "",
// }) => {
//   const cardRef = useRef<HTMLDivElement | null>(null);

//   useGSAP(() => {
//     gsap.set(cardRef.current, { transformPerspective: 1000 });
//   }, []);

//   useEffect(() => {
//     const card = cardRef.current;
//     if (!card) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       const { left, top, width, height } = card.getBoundingClientRect();
//       const x = (e.clientX - left - width / 2) / 15;
//       const y = (e.clientY - top - height / 2) / 15;

//       gsap.to(card, {
//         rotationY: x,
//         rotationX: -y,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     };

//     const handleMouseLeave = () => {
//       gsap.to(card, {
//         rotationY: 0,
//         rotationX: 0,
//         duration: 0.5,
//         ease: "power2.out",
//       });
//     };

//     card.addEventListener("mousemove", handleMouseMove);
//     card.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       card.removeEventListener("mousemove", handleMouseMove);
//       card.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className={`w-72 h-[448px] relative mx-4 rounded-xl shadow-lg transition-all duration-500 ${
//         isActive ? " w-[122rem] h-[50rem] z-10 scale-105" : " w-72 opacity-70"
//       }${className}`}
//       style={{ backgroundColor: bg }}
//     >
//       {isActive && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//           <h2 className="text-4xl font-bold tracking-widest">{location}</h2>
//           <h3 className="text-xl font-light tracking-wider mt-2">{country}</h3>
//           <p className="text-sm mt-4 italic">{tagline}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const ImageSlider = () => {
//   const destinations = [
//     {
//       id: 1,
//       location: "Innovation",
//       country: "FRANCE",
//       tagline: "Evolving with tech.",
//       bg: "#500073",
//     },
//     {
//       id: 2,
//       location: "MACHU PICCHU",
//       country: "PERU",
//       tagline: "Discover wonders.",
//       bg: "#FF5733",
//     },
//     {
//       id: 3,
//       location: "DOLOMITES",
//       country: "ITALY",
//       tagline: "Alpine majesty.",
//       bg: "#33A1FF",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const goToPrevious = () => {
//     if (!isTransitioning) {
//       setIsTransitioning(true);
//       setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const goToNext = () => {
//     if (!isTransitioning) {
//       setIsTransitioning(true);
//       setCurrentIndex((prevIndex) =>
//         prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [currentIndex]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <div
//         className="absolute inset-0 blur-3xl opacity-50 transition-all duration-1000"
//         style={{ backgroundColor: destinations[currentIndex].bg }}
//       />
//       <div className="flex items-center justify-center h-full relative">
//         <CarouselItem
//           {...destinations[
//             (currentIndex - 1 + destinations.length) % destinations.length
//           ]}
//           isActive={false}
//         />
//         <CarouselItem
//           {...destinations[currentIndex]}
//           isActive={true}
//           className=" "
//         />
//         <CarouselItem
//           {...destinations[(currentIndex + 1) % destinations.length]}
//           isActive={false}
//         />
//       </div>
//       <button
//         className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition-opacity"
//         onClick={goToPrevious}
//       >
//         &#10094;
//       </button>
//       <button
//         className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition-opacity"
//         onClick={goToNext}
//       >
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;

// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { useLayoutEffect, useRef } from "react";
// import ManPower from "../../icons/manpower";
// import DevDoodle from "../../icons/developerDoodle";
// // import { TypewriterEffectSmoothDemo } from "../../components/carousel/TypeWritterAnimation";
// // import TypingEffect from "../OurSolution/OurServiceTextAnimation";

// gsap.registerPlugin(ScrollTrigger);

// export default function OurService() {
//   const component = useRef<HTMLDivElement | null>(null);
//   const slider = useRef<HTMLDivElement | null>(null);

//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       const panels = gsap.utils.toArray(".panel") as HTMLElement[];
//       if (slider.current) {
//         gsap.to(panels, {
//           xPercent: -100 * (panels.length - 1),
//           ease: "none",
//           scrollTrigger: {
//             trigger: slider.current,
//             pin: true,
//             scrub: 1,
//             snap: 1 / (panels.length - 1),
//             end: () => "+=" + slider.current!.offsetWidth,
//             markers: false, // Set to false in production
//           },
//         });
//       }
//     }, component);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="App overflow-hidden" ref={component}>
//       <div
//         className="flex flex-col justify-center items-center bg-navBg h-[100px] animate-text"
//         style={{
//           background:
//             "linear-gradient(0deg, rgba(118,60,172,1) 0%, rgba(15,4,32,1) 55%)",
//         }}
//       >
//         <div className="flex px-3 text-white gap-[11rem]">
//           <div className="flex flex-col  ">
//             <h1 className="text-center text-3xl font-bold text-white">5500+</h1>
//             <span>Global Team</span>
//           </div>
//           <div className="flex flex-col  ">
//             <h1 className="text-center text-3xl font-bold text-white">300+</h1>
//             <span>Success Stories</span>
//           </div>
//           <div className="flex flex-col  ">
//             <h1 className="text-center text-3xl font-bold text-white">25+</h1>
//             <span>Technology Accelerators</span>
//           </div>
//           <div className="flex flex-col  ">
//             <h1 className="text-center text-3xl font-bold text-white">23+</h1>
//             <span>Locations</span>
//           </div>
//         </div>
//       </div>
//       <div ref={slider} className="flex w-[600vw] h-screen flex-wrap">
//         <div className="panel w-screen h-screen bg-bgColor text-black flex items-center justify-center p-12">
//           <div className="flex rounded-lg border-spacing-1 w-full p-[120px] bg-white">
//             <div className="flex flex-row gap-10">
//               <div className="flex">
//                 <DevDoodle className="h-[500px] w-[500px]" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="panel w-screen h-screen bg-bgColor text-white flex items-center p-[120px] justify-center">
//           <div className="flex rounded-lg border-spacing-1 w-full p-[120px] bg-white text-black">
//             Empower your career with our specialized software training in the
//             ever-evolving landscape
//             <ManPower height={700} width={700} />
//           </div>
//         </div>
//         <div className="panel w-screen h-screen bg-carousel2 text-white flex items-center justify-center">
//           Empower your career with our specialized software training in the
//           ever-evolving landscape
//         </div>
//         <div className="panel w-screen h-screen bg-carousel3 text-white flex items-center justify-center">
//           Elevate your online presence with our expert social media management
//         </div>
//       </div>
//       <div className="flex h-screen bg-carousel4 items-center justify-center">
//         <p className="text-lg">Last Container</p>
//       </div>
//     </div>
//   );
// }

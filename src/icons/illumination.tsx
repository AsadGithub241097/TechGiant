const TechGiantText: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[120px] h-[30vw] max-h-[250px] overflow-hidden font-doto px-2">
      <div className="h-[2px] w-full bg-white"></div>
      <div className="w-full max-w-[90%] md:max-w-[700px] h-full flex items-center justify-center">
        <svg
          viewBox="0 0 900 150"
          width="100%"
          height="100%"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="tech-text"
            textLength="820"
            lengthAdjust="spacingAndGlyphs"
          >
            TECH GIANT
          </text>
        </svg>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');

          .tech-text {
            font-family: 'League Gothic', sans-serif;
            stroke-width: 3px;
            stroke-dasharray: 80;
            stroke-linecap: round;
            fill: transparent;
            animation: follow 1.8s linear infinite;
            transition: all 2.1s;
            letter-spacing: 1vw;
            font-size: 8vw;
            max-font-size: 110px;
            min-font-size: 32px;
          }

          @keyframes follow {
            0% {
              stroke-dashoffset: 0;
              stroke: #726EFF;
              filter: drop-shadow(0px 0px 8px #726EFF);
            }
            50% {
              stroke: #AA60C8;
              filter: drop-shadow(0px 0px 8px #AA60C8);
            }
            100% {
              stroke-dashoffset: 160;
              stroke: #ffffff;
              filter: drop-shadow(0px 0px 8px #726EFF);
            }
          }

          .tech-text:hover {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
            stroke-width: 2px;
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .tech-text {
              font-size: 6vw;
              letter-spacing: 0.7vw;
            }
          }
          @media (max-width: 768px) {
            .tech-text {
              font-size: 4.5vw;
              letter-spacing: 0.5vw;
            }
          }
          @media (max-width: 480px) {
            .tech-text {
              font-size: 3vw;
              letter-spacing: 0.2vw;
            }
          }
          @media (max-width: 350px) {
            .tech-text {
              font-size: 2vw;
              letter-spacing: 0.1vw;
            }
          }
        `}
        </style>
      </div>
      <div className="h-[2px] w-full bg-white"></div>
    </div>
  );
};

export default TechGiantText;

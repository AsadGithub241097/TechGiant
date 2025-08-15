const TechGiantText: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-[250px] sm:h-[200px] xs:h-[180px] bg-bgColor overflow-hidden font-doto">
      <div className="h-[2px] w-screen bg-white"></div>
      <div className="w-full max-w-[90%] md:max-w-[700px] h-[150px] sm:h-[120px] xs:h-[100px]">
        <svg
          viewBox="0 0 700 150"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="tech-text"
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
            letter-spacing: 20px;
            font-size: 130px;
          }

          @keyframes follow {
            0% {
              stroke-dashoffset: 0;
              stroke: skyblue;
              filter: drop-shadow(0px 0px 5px purple);
            }
            50% {
              stroke: hotpink;
              filter: drop-shadow(0px 0px 5px skyblue);
            }
            100% {
              stroke-dashoffset: 160;
              stroke: white;
              filter: drop-shadow(0px 0px 5px hotpink);
            }
          }

          .tech-text:hover {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
            stroke-width: 2px;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .tech-text {
              font-size: 100px;
              letter-spacing: 15px;
            }
          }

          @media (max-width: 480px) {
            .tech-text {
              font-size: 60px;
              letter-spacing: 10px;
            }
          }

          @media (max-width: 320px) {
            .tech-text {
              font-size: 50px;
              letter-spacing: 5px;
            }
          }
        `}
        </style>
      </div>
      <div className="h-[2px] w-screen bg-white"></div>
    </div>
  );
};

export default TechGiantText;

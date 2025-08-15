import DevelopmentHero from "./developmentHero";
import DevServices from "./devService";
import WDP from "./WDP";
import SupportDev  from "./supportDev";
import ProjectsContaner from "./projectsContaner";

export default function DevContaner() {
  return (
    <div className="bg-bgColor">
      <DevelopmentHero />
      <div className="relative flex  flex-col">
        {/* //top-[-400px] */}
        <DevServices />
        <WDP />
        <SupportDev/>
        <ProjectsContaner />
      </div>
    </div>
  );
}

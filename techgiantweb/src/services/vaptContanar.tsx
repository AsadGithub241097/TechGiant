import TGCyberDefense from "./vapt/vapt";
import SecurityOperationsHero from "./vapt/vaptHero";
import TechgiantSecurityComponent from "./vapt/tgHelp";
import WhyWorkWithUsSection from "./vapt/whyWorkWithTG";

export default function VaptContaner() {
  return (
    <div className="bg-bgColor">
      <SecurityOperationsHero />
      <TGCyberDefense />
      <TechgiantSecurityComponent />
      <WhyWorkWithUsSection />
    </div>
  );
}

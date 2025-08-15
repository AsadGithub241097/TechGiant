import React from "react";

import { StreamlineThreatBrowser1 } from "../../icons/threat";
import {SecurityOprations} from "../../icons/securityOprations";
import {ProtectionIcon} from "../../icons/protectionIcon";

interface SecurityBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SecurityBenefit: React.FC<SecurityBenefitProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center font-sans">
      <div className="mb-6">{icon}</div>
      <h2 className="text-2xl mb-4 text-carousel2 font-sans">{title}</h2>
      <p className="text-white font-sans">{description}</p>
    </div>
  );
};

const WhyWorkWithUsSection: React.FC = () => {
  const securityBenefits = [
    {
      icon: <StreamlineThreatBrowser1 className="w-10 h-10 text-carousel2 stroke-1" />,
      //<ShieldBan className="w-12 h-12 text-white stroke-1" />,
      title: "24/7 threat defense",
      description:
        "Get continuous threat detection and faster response with advanced threat intelligence and proactive threat hunting.",
    },
    {
      icon: <SecurityOprations className="w-12 h-12 text-carousel2 stroke-1" />,
      title: "Simplified security operations",
      description:
        "Improve productivity and efficiency with SIEM, SOAR, MDR and EDR capabilities.",
    },
    {
      icon: <ProtectionIcon className="w-12 h-12 text-carousel2 stroke-1" />,
      title: "Comprehensive protection",
      description:
        "Integrate existing security tools into a single platform for cohesive threat management and better ROI.",
    },
  ];

  return (
    <div className="w-full bg-bgColor py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl text-white font-sans mb-20 text-center md:text-left">
          Why work with us?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {securityBenefits.map((benefit, index) => (
            <SecurityBenefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyWorkWithUsSection;

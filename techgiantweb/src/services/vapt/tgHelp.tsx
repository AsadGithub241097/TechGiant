import React from "react";
import center from "../../assets/opratiobcenter.jpg";
import detection from "../../assets/detectionandresponse.jpg";
import patch from "../../assets/patchmanagement.jpg";
import risponce from "../../assets/ResponseAndForensics.jpg";
import security from "../../assets/SecurityOperations .jpg";
import SecurityTesting from "../../assets/securitytesting.jpg";

interface SecurityCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

const SecurityCard: React.FC<SecurityCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col w-full">
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      <h2 className="text-xl font-medium mt-4 mb-2">{title}</h2>
      <div className="w-12 h-1 bg-carousel2 mb-4"></div>
      <p className="text-white mb-4 font-sans">{description}</p>
      {/* <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
        {buttonText} &gt;
      </a> */}
    </div>
  );
};

const TechgiantSecurityComponent: React.FC = () => {
  const securityCards = [
    {
      title: "Security Operations Center",
      description:
        "Tech Giant Security Operations Center provides comprehensive support and protection throughout the entire lifecycle of cyber threats using AI, machine learning and integrated automation systems. Our hybrid model allows businesses to integrate their existing security teams with Tech Giant's cybersecurity experts or fully outsource their cybersecurity operations to us.",
      buttonText: "Explore Security Operations Center",
      imageUrl: center, // Replace with actual URL
    },
    {
      title: "Security Operations as a platform",
      description:
        "Security Operations as a platform provides a secure infrastructure that integrates key components of modern security, including SOAR, SIEM, endpoint detection response, and vulnerability management. Tech giant supports customers at any stage of their cyber resilience journey, offering centralized insights to quickly detect threats and automate responses.",
      buttonText: "Explore Security Operations as a platform",
      imageUrl: security, // Replace with actual URL
    },
    {
      title: "Cybersecurity Incident Response and Forensics",
      description: `Tech Giant's Cybersecurity Incident Response and Forensics (CSIRF) service offers preventive and proactive threat detection and incident response to enhance security operations. During a cyber disruption, such as ransomware, the CSIRF team can provide on-demand, hands-on support to identify, investigate, and resolve threats to a customer's business.`,
      buttonText: "Explore Security Operations as a platform",
      imageUrl: risponce, // Replace with actual URL
    },
    {
      title: "Vulnerability and patch management",
      description: `Tech Giant's Vulnerability and Patch Management services mitigate cybersecurity risks across environments by prioritizing critical assets and enhancing compliance. Our streamlined approach helps minimize response times to threats, ensuring business continuity and protecting critical data.`,
      buttonText: "Explore Security Operations as a platform",
      imageUrl: patch, // Replace with actual URL
    },
    {
      title: "Threat detection and response",
      description: `Tech Giant's Threat Detection and Response Services enable effective security incident management through incident triage, threat intelligence, and compliance monitoring. Our comprehensive solution includes Managed Detection and Response, SIEM, offensive testing, AI, and focuses on key areas like Endpoint Detection and Response and OT Security Management.`,
      buttonText: "Explore Security Operations as a platform",
      imageUrl: detection, // Replace with actual URL
    },
    {
      title: "Offensive security testing",
      description: `Tech Giant's offensive security testing services enhance visibility into network threats and vulnerabilities by offering threat intelligence and advanced attack simulations. Our services focus on real-world cyberattack responses and include testing for hardware, devices, and IoT, using frameworks like MITRE ATT&CK.`,
      buttonText: "Explore Security Operations as a platform",
      imageUrl: SecurityTesting, // Replace with actual URL
    },
  ];

  return (
    <div className="w-full bg-bfColor bg-opacity-100 py-16 pt-28">
      <div className="bottom-0 left-0 w-full relative top-[-98px] md:top-[-204px] overflow-hidden">
        {/* <div className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-widest opacity-20">
          how Tech Giant helps
        </div> */}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {securityCards.map((card, index) => (
            <SecurityCard
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechgiantSecurityComponent;

// htgfhgfytgh
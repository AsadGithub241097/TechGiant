import React from 'react';
import {
  openDevelopmentConsultationEmail,
  type DevelopmentEmailSection,
} from '../../utils/emailUtils';

type DevelopmentConsultationButtonProps = {
  section: DevelopmentEmailSection;
  projectName?: string;
  className?: string;
  children: React.ReactNode;
};

const DevelopmentConsultationButton: React.FC<DevelopmentConsultationButtonProps> = ({
  section,
  projectName,
  className,
  children,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openDevelopmentConsultationEmail(section, projectName);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default DevelopmentConsultationButton;

import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface CourseFeatureProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CourseFeature = ({
  title = "Learn Python",
  subtitle = "within 30 Days",
  description = "Time to become advance then others with this course",
  primaryAction = "Join Trial Class",
  secondaryAction = "Skip",
  onPrimaryClick,
  onSecondaryClick
}: CourseFeatureProps) => {
  return (
    <Card className="p-8 bg-dashboard-stats-bg border-border shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            {title}
            <br />
            {subtitle}
          </h2>
          <p className="text-dashboard-sidebar-text mt-3">{description}</p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            onClick={onPrimaryClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
          >
            {primaryAction}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onSecondaryClick}
            className="text-dashboard-sidebar-text hover:text-foreground px-6 py-2"
          >
            {secondaryAction}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseFeature;
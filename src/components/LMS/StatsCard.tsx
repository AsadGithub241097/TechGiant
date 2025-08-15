import { Card } from "../ui/card";
import { cn } from "../../lib/util";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard = ({ title, value, icon, className }: StatsCardProps) => {
  return (
    <Card className={cn("p-6 bg-dashboard-stats-bg border-border shadow-[var(--shadow-card)]", className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <p className="text-dashboard-sidebar-text text-sm">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
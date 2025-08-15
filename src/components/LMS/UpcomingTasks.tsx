import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  color?: "blue" | "orange" | "green";
}

interface UpcomingTasksProps {
  tasks?: Task[];
  onViewAll?: () => void;
}

const defaultTasks: Task[] = [
  { id: "1", title: "Environment Discuss", time: "01:00 PM - 02:00 PM", color: "blue" },
  { id: "2", title: "Fitness Training", time: "02:00 PM - 03:00 PM", color: "orange" },
  { id: "3", title: "Reading time", time: "03:00 PM - 04:00 PM", color: "green" },
];

const colorClasses = {
  blue: "border-l-primary",
  orange: "border-l-orange-500",
  green: "border-l-green-500",
};

const UpcomingTasks = ({ tasks = defaultTasks, onViewAll }: UpcomingTasksProps) => {
  return (
    <Card className="p-6 bg-dashboard-stats-bg border-border shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Upcoming Task</h3>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border-l-4 bg-background rounded-r-lg ${
              colorClasses[task.color || "blue"]
            }`}
          >
            <h4 className="font-semibold text-foreground text-sm">{task.title}</h4>
            <p className="text-xs text-dashboard-sidebar-text mt-1">{task.time}</p>
          </div>
        ))}
      </div>
      
      <Button 
        variant="ghost" 
        onClick={onViewAll}
        className="w-full mt-6 text-primary hover:text-primary/80 hover:bg-primary/5 justify-center gap-2"
      >
        View all Tasks
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Card>
  );
};

export default UpcomingTasks;
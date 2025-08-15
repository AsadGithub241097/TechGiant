import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Star, Book } from "lucide-react";

interface Course {
  id: string;
  title: string;
  author: string;
  progress: number;
  rating: number;
}

interface CourseCardProps {
  course: Course;
  onViewCourse?: (courseId: string) => void;
}

const CourseCard = ({ course, onViewCourse }: CourseCardProps) => {
  return (
    <Card className="p-4 bg-dashboard-stats-bg border-border shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Book className="w-5 h-5 text-orange-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm">{course.title}</h4>
          <p className="text-xs text-dashboard-sidebar-text mb-3">By {course.author}</p>
          
          <div className="space-y-3">
            <Progress value={course.progress} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs font-medium text-foreground">{course.rating}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewCourse?.(course.id)}
                className="text-xs px-3 py-1 h-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View Course
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
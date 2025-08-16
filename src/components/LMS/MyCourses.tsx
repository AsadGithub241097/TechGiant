// import { Card } from "../ui/card"; // Removed unused import
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  author: string;
  progress: number;
  rating: number;
}

interface MyCoursesProps {
  courses?: Course[];
  onViewAll?: () => void;
  onViewCourse?: (courseId: string) => void;
}

const defaultCourses: Course[] = [
  { id: "1", title: "History of India", author: "Random Author", progress: 75, rating: 4.3 },
  { id: "2", title: "Importance of Water", author: "Random Author", progress: 60, rating: 3.9 },
  { id: "3", title: "Sun & Solar System", author: "Alex Wayne", progress: 45, rating: 4.2 },
];

const MyCourses = ({ 
  courses = defaultCourses, 
  onViewAll, 
  onViewCourse 
}: MyCoursesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">My Courses</h3>
        <div className="flex gap-4 text-sm">
          <button className="text-primary font-medium">All</button>
          <button className="text-dashboard-sidebar-text hover:text-foreground">Ongoing</button>
          <button className="text-dashboard-sidebar-text hover:text-foreground">Completed</button>
        </div>
      </div>
      
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onViewCourse={onViewCourse}
          />
        ))}
      </div>
      
      <Button 
        variant="ghost" 
        onClick={onViewAll}
        className="w-full text-primary hover:text-primary/80 hover:bg-primary/5 justify-center gap-2"
      >
        View all
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MyCourses;
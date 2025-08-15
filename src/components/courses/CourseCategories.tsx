import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, TrendingUp, Users } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
  courseCount: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  hoverColor,
  courseCount,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-2xl ${bgColor} hover:${hoverColor} transition-all duration-300 cursor-pointer group`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative p-8 h-80 flex flex-col justify-between">
        <div>
          <div className="mb-6 p-4 bg-white/20 rounded-xl w-fit group-hover:bg-white/30 transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-black transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/90 text-lg group-hover:text-black/80 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-white/80 group-hover:text-black/70 transition-colors duration-300" />
            <span className="text-white/80 group-hover:text-black/70 transition-colors duration-300">
              {courseCount} Courses
            </span>
          </div>
          <motion.div
            className="w-12 h-12 bg-white/20 group-hover:bg-black/20 rounded-full flex items-center justify-center transition-all duration-300"
            whileHover={{ rotate: 45 }}
          >
            <svg
              className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCategories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "QA Testing",
      description: "Master Quality Assurance, testing methodologies, automation tools, and best practices.",
      icon: <Users className="w-8 h-8 text-white" />,
      bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
      hoverColor: "from-blue-300 to-blue-500",
      courseCount: 12,
      path: "/courses/qa"
    },
    {
      title: "Development",
      description: "Learn programming languages, frameworks, and software development practices.",
      icon: <Code className="w-8 h-8 text-white" />,
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
      hoverColor: "from-purple-300 to-purple-500",
      courseCount: 18,
      path: "/courses/development"
    },
    {
      title: "Marketing",
      description: "Digital marketing strategies, SEO, social media, and brand management.",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      bgColor: "bg-gradient-to-br from-green-600 to-green-800",
      hoverColor: "from-green-300 to-green-500",
      courseCount: 15,
      path: "/courses/marketing"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive course categories and start your journey to becoming an expert in your field.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                bgColor={category.bgColor}
                hoverColor={category.hoverColor}
                courseCount={category.courseCount}
                onClick={() => navigate(category.path)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">45+</div>
            <div className="text-gray-300">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">1200+</div>
            <div className="text-gray-300">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300">Expert Instructors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseCategories;


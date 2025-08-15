import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Award, Play } from 'lucide-react';
import { getCoursesByCategory, Course } from '../../data/coursesData';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group border hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            course.level === 'Beginner' ? 'bg-green-500' :
            course.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {course.level}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.students})</span>
          </div>
          {course.certificateIncluded && (
            <Award className="w-5 h-5 text-blue-500" />
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Instructor</p>
            <p className="font-medium text-gray-900">{course.instructor}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">${course.price}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CourseListing: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  
  const courses = category ? getCoursesByCategory(category as 'qa' | 'development' | 'marketing') : [];
  
  const categoryNames = {
    qa: 'QA Testing',
    development: 'Development',
    marketing: 'Marketing'
  };

  const categoryColors = {
    qa: 'from-blue-600 to-blue-800',
    development: 'from-purple-600 to-purple-800',
    marketing: 'from-green-600 to-green-800'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  if (!category || !courses.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} py-20`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/courses')}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {categoryNames[category as keyof typeof categoryNames]} Courses
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Discover our comprehensive collection of {categoryNames[category as keyof typeof categoryNames].toLowerCase()} courses designed to advance your skills and career.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard
                course={course}
                onClick={() => navigate(`/course/${course.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have advanced their careers with our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Enroll in All Courses
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Browse Other Categories
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseListing;


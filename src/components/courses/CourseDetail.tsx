import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  Award, 
  BookOpen, 
  CheckCircle, 
  User,
  Calendar,
  Globe,
  Download,
  Heart,
  Share2
} from 'lucide-react';
import { getCourseById } from '../../data/coursesData';

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  
  const course = courseId ? getCourseById(courseId) : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const categoryColors = {
    qa: 'from-blue-600 to-blue-800',
    development: 'from-purple-600 to-purple-800',
    marketing: 'from-green-600 to-green-800'
  };

  const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
    <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden">
      {!isVideoPlaying ? (
        <div 
          className="absolute inset-0 bg-cover bg-center cursor-pointer group"
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
          onClick={() => setIsVideoPlaying(true)}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-700 transition-colors"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );

  const TabButton = ({ tab, label }: { tab: typeof activeTab, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
        activeTab === tab 
          ? 'text-blue-600 border-blue-600' 
          : 'text-gray-600 border-transparent hover:text-blue-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-br ${categoryColors[course.category]} py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/courses/${course.category}`)}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {course.category.charAt(0).toUpperCase() + course.category.slice(1)} Courses</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <YouTubeEmbed videoId={course.videoId} />
            </motion.div>

            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  course.level === 'Beginner' ? 'bg-green-500' :
                  course.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {course.level}
                </span>
                {course.certificateIncluded && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Certificate Included</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-gray-600 text-lg mb-6">
                {course.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-500 text-sm">({course.students} students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{course.students} enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">English</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex border-b border-gray-200 overflow-x-auto">
                <TabButton tab="overview" label="Overview" />
                <TabButton tab="curriculum" label="Curriculum" />
                <TabButton tab="instructor" label="Instructor" />
                <TabButton tab="reviews" label="Reviews" />
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Course Content</h3>
                    <div className="space-y-4">
                      {[
                        'Introduction and Setup',
                        'Core Concepts',
                        'Hands-on Practice',
                        'Advanced Techniques',
                        'Real-world Projects',
                        'Final Assessment'
                      ].map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <BookOpen className="w-5 h-5 text-gray-400" />
                              <span className="font-medium text-gray-900">Section {index + 1}: {section}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {Math.floor(Math.random() * 5) + 3} lectures
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                        <p className="text-gray-600">Senior {course.category.charAt(0).toUpperCase() + course.category.slice(1)} Expert</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>⭐ 4.9 Instructor Rating</span>
                          <span>👥 15,000+ Students</span>
                          <span>📚 25 Courses</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {course.instructor} is a seasoned professional with over 10 years of experience in {course.category}. 
                      They have worked with top companies and have trained thousands of students worldwide.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-600">{course.students} reviews</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        { name: 'John Doe', rating: 5, comment: 'Excellent course! Very comprehensive and well-structured.' },
                        { name: 'Jane Smith', rating: 4, comment: 'Great content and instructor. Would recommend to anyone.' },
                        { name: 'Mike Johnson', rating: 5, comment: 'Perfect for beginners. Clear explanations and good examples.' }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">${course.price}</div>
                <p className="text-gray-500">One-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">{course.certificateIncluded ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="font-medium text-gray-900 mb-3">Share this course</h4>
                <div className="flex space-x-3">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


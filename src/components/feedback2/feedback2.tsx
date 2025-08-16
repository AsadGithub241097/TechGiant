import ProfilePic from "../../icons/profileIcon";
import { Star, Quote } from "lucide-react";

interface FeedbackCardProps {
  author: React.ReactNode;
  feedback: string;
  rating: number; // New prop for rating
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  author,
  feedback,
  rating,
}) => {
  // Function to render modern star icons based on rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-all duration-300 ${
          i < rating 
            ? "text-yellow-400 fill-yellow-400 scale-110" 
            : "text-gray-500/50 hover:text-yellow-300"
        }`}
      />
    ));
  };

  return (
    <div className="group relative cursor-pointer overflow-hidden bg-gradient-to-br from-gray-900/90 via-bgColor to-gray-900/90 backdrop-blur-sm border border-carousel2/30 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-carousel2/25">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-carousel2/10 via-transparent to-carousel1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Quote className="w-8 h-8 text-carousel2" />
      </div>
      
      <div className="relative z-10 p-8">
        {/* Header with profile and rating */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Modern Profile Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-carousel2 to-carousel1 p-0.5 group-hover:from-carousel1 group-hover:to-carousel3 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-bgColor flex items-center justify-center">
                  <ProfilePic
                    className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300"
                    fill="url(#profileGradient)"
                  />
                </div>
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-carousel2/30 animate-pulse group-hover:border-carousel1 transition-colors duration-300"></div>
            </div>

            {/* Profile Name */}
            <div>
              <div className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-carousel3 group-hover:to-carousel2 transition-all duration-300 font-sans">
                {author}
              </div>
              <p className="text-sm text-gray-400">Verified Customer</p>
            </div>
          </div>
        </div>

        {/* Star Rating with modern design */}
        <div className="flex items-center space-x-1 mb-6">
          {renderStars(rating)}
          <span className="ml-2 text-sm text-gray-400 font-medium">
            {rating}.0 out of 5
          </span>
        </div>

        {/* Feedback Text with modern typography */}
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors duration-300 font-sans">
            "{feedback}"
          </p>
        </div>

        {/* Bottom gradient line */}
        <div className="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-carousel2/50 to-transparent group-hover:via-carousel1 transition-all duration-500"></div>
      </div>

      {/* SVG gradient definitions */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AA60C8" />
            <stop offset="100%" stopColor="#500073" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const FeedbackApp: React.FC = () => {
  const feedbackData = [
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 "
        >
          Devika G
        </a>
      ),
      feedback:
        "The training program exceeded my expectations. The instructors were highly knowledgeable, and the hands-on approach helped me solidify my skills in software testing.",
      rating: 5, // Pass rating value
    },
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 group-hover:text-white"
        >
          Sowmya D
        </a>
      ),
      feedback:
        "Thanks to the placement support, I secured a job at a leading software company within weeks of completing the training. The guidance and resources provided were invaluable.",
      rating: 4,
    },
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 group-hover:text-white"
        >
          Ifham M
        </a>
      ),
      feedback:
        "The placement community was a fantastic resource for networking and job leads. I received personalized guidance and support throughout the placement process, which made a significant difference in my job search.",
      rating: 5,
    },
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 group-hover:text-white"
        >
          Asad M
        </a>
      ),
      feedback:
        "I highly recommend this training program. The comprehensive curriculum, industry-experienced instructors, and strong placement support make it a standout choice for anyone looking to pursue a career in software testing.",
      rating: 3,
    },
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 group-hover:text-white"
        >
          Sameeuddin 
        </a>
      ),
      feedback:
        "I gained a solid foundation in software testing and feel more confident in my skills.",
      rating: 4,
    },
    {
      author: (
        <a
          href="#"
          className="text-white transition-all duration-300 group-hover:text-white"
        >
          Kashif J
        </a>
      ),
      feedback:
        "Fantastic course structure with well-paced modules and interactive assignments.",
      rating: 5,
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      {/* Modern heading section */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex justify-center items-center pb-4 gap-[1rem] font-sans">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 animate-pulse">
            Satisfied
          </span>
          <span className="text-white">
            Customer
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
          Discover what our students say about their transformative learning experience with TechGiant
        </p>
        
        {/* Decorative line */}
        <div className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-carousel2 to-carousel1 rounded-full"></div>
      </div>
      
      {/* Modern Grid Layout with better spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {feedbackData.map((item, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <FeedbackCard
                author={item.author}
                feedback={item.feedback}
                rating={item.rating}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgColor to-transparent"></div>
    </div>
  );
};

export default FeedbackApp;


// max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center
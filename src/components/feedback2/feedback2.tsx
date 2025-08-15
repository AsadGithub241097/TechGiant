import ProfilePic from "../../icons/profileIcon";

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
  // Function to render star icons based on rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="group relative cursor-pointer overflow-hidden bg-bgColor px-6 pt-10 pb-8 shadow-xl ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-[33rem] sm:rounded-lg sm:px-10 border border-carousel2 rounded-lg">
      <span className="absolute top-10 z-0 h-[70px] w-[70px] rounded-full bg-carousel2 transition-all duration-1000 group-hover:scale-[20]"></span>
      <div className="relative z-10 mx-auto max-w-md">
        <div className="flex flex-row items-center">
          {/* Profile Icon */}
          <span className="grid h-[70px] w-[70px] place-items-center rounded-full bg-carousel2 transition-all duration-300 group-hover:bg-carousel1">
            <ProfilePic
              className="h-10 w-10 text-white transition-all"
              fill="white"
            />
          </span>

          {/* Profile Name and Rating */}
          <div className=" pl-4">
            <div className="text-base font-semibold leading-7 text-white font-sans">{author}</div>
            <div className="flex text-lg mt-1">{renderStars(rating)}</div>{" "}
            {/* Star Ratings */}
          </div>
        </div>

        {/* Feedback Text */}
        <div className="space-y-6 pt-5 text-base leading-7 text-white font-sans transition-all duration-300 group-hover:text-white/90">
          <p>{feedback}</p>
        </div>
      </div>
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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-40 ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white flex justify-center items-center pb-20 gap-[1rem]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 h-auto">
          Satisfied{""}
          </span>
        
          Coustomer
        </h1>
      {/* Grid Layout: 3 cards per row on large screens */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 lg:px-16 justify-items-center ">
        {feedbackData.map((item, index) => (
          <FeedbackCard
            key={index}
            author={item.author}
            feedback={item.feedback}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackApp;


// max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center
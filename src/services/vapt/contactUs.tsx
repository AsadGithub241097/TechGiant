import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ConnectWithUsSection: React.FC = () => {
  // Define your company's email and optional subject/body
  const companyEmail = "Info@tech-giant.in";
  const emailSubject = "Request for Consultation";
  const emailBody = "Hello, I would like to request a consultation about your services.";

  // Construct the mailto link
  const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleClick = () => {
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-800 rounded-full opacity-20"></div>
        <div className="absolute -right-10 -bottom-20 w-80 h-80 bg-indigo-800 rounded-full opacity-20"></div>
        <div className="absolute left-1/4 bottom-0 w-40 h-40 bg-white rounded-full opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex items-center">
        <div className="w-full md:w-1/2 z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to strengthen your cyber resilience?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-blue-100 text-lg mb-10 max-w-lg"
          >
            Talk to our experts about taking the next step in your cybersecurity journey. 
            We'll help you build a robust defense strategy tailored to your needs.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onClick={handleClick}
            className="group bg-bgColor hover:bg-carousel1 text-white font-medium py-4 px-8 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Request a consultation</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>

        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUsSection;
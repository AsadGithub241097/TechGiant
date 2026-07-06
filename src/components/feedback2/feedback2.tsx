import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import {
  SectionBackground,
  Eyebrow,
  GradientText,
  SpotlightCard,
} from "../ui/sectionDecor";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  rating: number;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Devika G",
    role: "QA Engineer",
    feedback:
      "The training program exceeded my expectations. The instructors were highly knowledgeable, and the hands-on approach helped me solidify my skills in software testing.",
    rating: 5,
    accent: "from-fuchsia-500 to-violet-600",
  },
  {
    name: "Sowmya D",
    role: "Software Tester",
    feedback:
      "Thanks to the placement support, I secured a job at a leading software company within weeks of completing the training. The guidance and resources were invaluable.",
    rating: 5,
    accent: "from-sky-500 to-cyan-600",
  },
  {
    name: "Ifham M",
    role: "Automation Engineer",
    feedback:
      "The placement community was a fantastic resource for networking and job leads. I received personalized guidance throughout the process, which made a real difference.",
    rating: 5,
    accent: "from-emerald-500 to-green-600",
  },
  {
    name: "Asad M",
    role: "SDET",
    feedback:
      "I highly recommend this program. The comprehensive curriculum, experienced instructors and strong placement support make it a standout choice for a testing career.",
    rating: 5,
    accent: "from-amber-500 to-orange-600",
  },
  {
    name: "Sameeuddin",
    role: "Manual Tester",
    feedback:
      "I gained a solid foundation in software testing and feel far more confident in my skills and my ability to deliver quality work.",
    rating: 4,
    accent: "from-rose-500 to-pink-600",
  },
  {
    name: "Kashif J",
    role: "QA Analyst",
    feedback:
      "Fantastic course structure with well-paced modules and interactive assignments. Everything felt practical and directly relevant to real projects.",
    rating: 5,
    accent: "from-indigo-500 to-purple-600",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-700/40 text-gray-700/40"
        }`}
      />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <SpotlightCard className="flex h-full flex-col p-7">
    <Quote className="absolute right-6 top-6 h-8 w-8 text-carousel2/20" />
    <Stars rating={item.rating} />
    <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-300">
      “{item.feedback}”
    </p>
    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} text-sm font-bold text-white`}
      >
        {initials(item.name)}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-gray-500">{item.role}</p>
      </div>
    </div>
  </SpotlightCard>
);

const FeedbackApp: React.FC = () => {
  const avg = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow icon={MessageSquareHeart}>Testimonials</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Loved by our <GradientText>learners</GradientText>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 inline-flex items-center gap-3 rounded-full glass-panel px-5 py-2"
          >
            <Stars rating={5} />
            <span className="text-sm font-semibold text-white">{avg}/5</span>
            <span className="text-sm text-gray-500">
              from {testimonials.length}+ reviews
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <TestimonialCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackApp;

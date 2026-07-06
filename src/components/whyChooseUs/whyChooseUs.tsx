import React from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Clock,
  Target,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  SectionBackground,
  Eyebrow,
  GradientText,
  SpotlightCard,
} from "../ui/sectionDecor";

const features = [
  {
    icon: Crown,
    title: "Industry Leaders",
    description:
      "Learn directly from seasoned experts shaping software testing in Hyderabad.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: Clock,
    title: "Learn At Your Pace",
    description:
      "Flexible, self-paced modules designed to fit around your schedule.",
    accent: "from-sky-400 to-cyan-500",
  },
  {
    icon: Target,
    title: "Placement Community",
    description:
      "Tap into a thriving network of mentors, peers and hiring partners.",
    accent: "from-emerald-400 to-green-500",
  },
  {
    icon: RefreshCw,
    title: "Hands-on Projects",
    description:
      "Build real-world confidence with practical projects and live case studies.",
    accent: "from-fuchsia-400 to-violet-500",
  },
];

const benefits = [
  "Expert-led training that bridges theory and practice",
  "Proven track record of successful placements",
  "Unparalleled expertise in software training in Hyderabad",
];

const stats = [
  { value: "500+", label: "Students Placed" },
  { value: "95%", label: "Success Rate" },
  { value: "1000+", label: "Graduates" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow icon={Sparkles}>Why Choose Us</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              The smart way to <GradientText>level up</GradientText> your career
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-400">
              We pair industry-grade curriculum with real mentorship and a
              community that has your back — long after the course ends.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-carousel3" />
                  <span className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Stat strip */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl glass-panel p-4 text-center"
                >
                  <div className="bg-gradient-to-r from-carousel4 to-carousel2 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-gray-500 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — feature bento */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <SpotlightCard className="h-full p-6">
                    <div
                      className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.accent} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">
                        {feature.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-carousel3" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

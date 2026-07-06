import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import {
  SectionBackground,
  Eyebrow,
  GradientText,
  SpotlightCard,
} from "../../components/ui/sectionDecor";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "Info@tech-giant.in",
    accent: "from-sky-400 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8008771893",
    accent: "from-emerald-400 to-green-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    accent: "from-fuchsia-400 to-violet-500",
  },
];

const assurances = [
  "Free 30-minute consultation",
  "No-obligation security assessment",
  "Response within 24 hours",
];

const ConnectWithUsSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — message */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow icon={Shield}>Cyber Security Experts</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to strengthen your{" "}
              <GradientText>cyber resilience?</GradientText>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Partner with our cybersecurity experts to build a robust defense
              strategy — comprehensive solutions tailored to your business and
              threat landscape.
            </p>

            <ul className="mt-7 space-y-3">
              {assurances.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="flex items-center gap-3 text-sm text-gray-300 sm:text-base"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-carousel3" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — contact + trust */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <SpotlightCard key={info.label} className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${info.accent} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {info.label}
                      </p>
                      <p className="font-semibold text-white">{info.value}</p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm">
                <div className="bg-gradient-to-r from-carousel4 to-carousel2 bg-clip-text text-3xl font-extrabold text-transparent">
                  24/7
                </div>
                <div className="mt-1 text-xs text-gray-500">Expert Support</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm">
                <div className="bg-gradient-to-r from-carousel4 to-carousel2 bg-clip-text text-3xl font-extrabold text-transparent">
                  500+
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Clients Protected
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <Shield className="h-4 w-4 text-carousel3" />
            Trusted by{" "}
            <span className="font-semibold text-carousel3">enterprises</span>{" "}
            worldwide
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-carousel2/60 sm:block" />
          <span>
            <span className="font-semibold text-carousel3">ISO 27001</span>{" "}
            certified
          </span>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUsSection;

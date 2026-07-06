import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, MapPin, ArrowRight, Shield, Code, Globe } from "lucide-react";

const services = [
  { name: "Cybersecurity (VAPT)", to: "/Vapt", icon: Shield },
  { name: "Development", to: "/Development", icon: Code },
  { name: "Marketing", to: "/Marketing", icon: Globe },
];

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "VAPT", to: "/Vapt" },
  { name: "Development", to: "/Development" },
  { name: "Marketing", to: "/Marketing" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "Info@tech-giant.in", href: "mailto:Info@tech-giant.in" },
  { icon: Phone, label: "Phone", value: "+91 8008771893", href: "tel:+918008771893" },
  { icon: MapPin, label: "Address", value: "Hyderabad, India", href: "#" },
];

const socials = [
  { icon: FaInstagram, href: "https://www.instagram.com/itstechgiant?igsh=MW9nd3Y2N2VkaGFn", label: "Instagram", hover: "hover:text-pink-400" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/tech-giant-9a42b3284", label: "LinkedIn", hover: "hover:text-blue-400" },
  { icon: FaTwitter, href: "#", label: "Twitter", hover: "hover:text-sky-400" },
  { icon: FaFacebook, href: "#", label: "Facebook", hover: "hover:text-blue-500" },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bgColor">
      {/* Subtle blueprint grid + brand glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(170,96,200,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,96,200,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-carousel1/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Company */}
          <div className="space-y-6">
            <div>
              <h2 className="bg-gradient-to-r from-carousel4 via-carousel3 to-carousel2 bg-clip-text font-sans text-2xl font-bold text-transparent">
                Tech Giant
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Empowering businesses with cutting-edge technology, cybersecurity
                expertise and innovative digital transformation services.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur-sm">
                <div className="text-lg font-bold text-carousel3">500+</div>
                <div className="text-xs text-gray-500">Clients</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur-sm">
                <div className="text-lg font-bold text-carousel3">5+</div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <Link
                      to={service.to}
                      className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-carousel2 transition-colors duration-300 group-hover:text-carousel3" />
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <ArrowRight className="h-3 w-3 text-carousel2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-start gap-3 text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors duration-300 group-hover:border-carousel2/50">
                      <Icon className="h-4 w-4 text-carousel3" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-500">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-carousel2/60"
                    >
                      <Icon className={`h-5 w-5 text-gray-400 transition-colors duration-300 ${social.hover}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-gray-500 sm:text-left">
              &copy; {new Date().getFullYear()} Tech Giant. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-2 text-xs text-gray-500 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-carousel2" />
                ISO 27001 Certified
              </span>
              <span className="hidden sm:inline text-carousel2/50">•</span>
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

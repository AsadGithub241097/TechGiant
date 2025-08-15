import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-carousel1 text-gray-300 py-8 font-sans bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/liquid.jpg')] bg-fixed transition-all bg-cover">
      <div className="container max-w-6xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-between font-sans">
          {/* Company Info */}
          <div>
            <h2 className="text-xl text-white font-sans">Tech Giant</h2>
            <p className="mt-2 text-sm">
              Building a better web experience for everyone.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg text-white ">Quick Links</h3>
            <ul className="mt-2 space-y-4 gap-3">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg  text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/itstechgiant?igsh=MW9nd3Y2N2VkaGFn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/tech-giant-9a42b3284"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} Tech Giant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

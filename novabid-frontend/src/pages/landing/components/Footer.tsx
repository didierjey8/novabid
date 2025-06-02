import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Twitter,
  Github,
  Globe,
  FileText,
  Mail,
  MessageCircle,
  MailCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";

interface FooterProps {
  onNavigateToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onNavigateToSection(sectionId);
  };

  // Handle email support click - opens Gmail compose
  const handleContactSupport = () => {
    const email = "didierjey8@gmail.com";
    const subject = "NovaBid Support Request";
    const body = "Hello NovaBid Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you!";
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const socialLinks = [
    { icon: MailCheck , href: "#", label: "Email" },
  ];

  const productLinks = [
    { name: "Home", action: () => scrollToSection("hero") },
    { name: "Features", action: () => scrollToSection("features") },
    { name: "How it Works", action: () => scrollToSection("how-it-works") },
    { name: "Dashboard", action: () => scrollToSection("dashboard") },
  ];



  return (
    <footer id="footer" className="relative z-10 px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 mb-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Logo and Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 mb-6 cursor-pointer"
                onClick={() => scrollToSection("hero")}
              >
                <motion.img 
                  src={logo} 
                  alt="NovaBid" 
                  className="w-10 h-10"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-2xl font-bold text-white">NovaBid</span>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
              </motion.div>
              
              <p className="font-cerapro text-gray-400 leading-relaxed mb-8 max-w-md">
                The future of private governance. Experience true democracy with
                zero-knowledge technology that protects your identity while
                amplifying your voice.
              </p>

              {/* Contact Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex space-x-4"
              >
                <motion.button
                  onClick={handleContactSupport}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    boxShadow: "0 10px 20px rgba(120, 1, 232, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                  title="Email Support"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MailCheck className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-manrope text-lg font-bold text-white mb-6">
                Product
              </h3>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <motion.button
                      whileHover={{ 
                        x: 5, 
                        color: "#ffffff",
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      onClick={link.action}
                      className="font-cerapro text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-manrope text-lg font-bold text-white mb-6">
                Support
              </h3>
              
              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button
                  onClick={handleContactSupport}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(120, 1, 232, 0.2)",
                  }}
                  animate={{
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm">Text us on didierjey8@gmail.com!</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-between px-8 py-6 backdrop-blur-sm border border-white/10 rounded-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.042) 50.11%, rgba(255, 255, 255, 0.14) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center space-x-6 mb-4 lg:mb-0"
          >
            <motion.button
              onClick={handleContactSupport}
              whileHover={{ 
                color: "#ffffff",
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="font-cerapro text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Mail className="w-4 h-4" />
              </motion.div>
              <span>Contact Support</span>
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center space-x-4"
          >
            <p className="font-cerapro text-sm text-gray-400">
              © 2025 NovaBid. All rights reserved.
            </p>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400 opacity-60" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Sparkles className="w-3 h-3 text-purple-400 opacity-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Header,
  Hero,
  PrivacyRedefined,
  Dashboard,
  Features,
  HowItWorks,
  PrivacyPlatform,
  Footer,
  BackgroundEffects,
} from "./components";

const Landing: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Track active section for navigation highlighting
  const handleNavigateToSection = (section: string) => {
    setActiveSection(section);
  };

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    // Observe all sections
    const sections = ["hero", "features", "how-it-works", "footer"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Check if it's mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dashboard-inspired container variants - no animations on mobile
  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isMobile ? 0 : 0.6,
        staggerChildren: isMobile ? 0 : 0.15,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 0 : 400,
        damping: isMobile ? 0 : 25,
        duration: isMobile ? 0 : 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <motion.div 
        className="relative z-10"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Header onNavigateToSection={handleNavigateToSection} />
        </motion.div>

        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div variants={itemVariants}>
          <Dashboard />
        </motion.div>

        {/* Privacy Redefined Section */}
        <motion.div variants={itemVariants}>
          <PrivacyRedefined />
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants}>
          <Features />
        </motion.div>

        {/* How It Works Section */}
        <motion.div variants={itemVariants}>
          <HowItWorks />
        </motion.div>

        {/* Privacy Platform Section */}
        <motion.div variants={itemVariants}>
          <PrivacyPlatform />
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants}>
          <Footer onNavigateToSection={handleNavigateToSection} />
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: isMobile ? 0 : 100 }}
        animate={{ 
          opacity: activeSection !== "hero" ? 1 : 0, 
          y: 0,
          scale: activeSection !== "hero" ? 1 : 0.8,
        }}
        whileHover={isMobile ? {} : { 
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(120, 1, 232, 0.4)",
        }}
        whileTap={isMobile ? {} : { scale: 0.9 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("hero");
        }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-[#5901E8] to-[#7801E8] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
        style={{ display: activeSection === "hero" ? "none" : "flex" }}
      >
        <motion.svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={isMobile ? {} : {
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
};

export default Landing;

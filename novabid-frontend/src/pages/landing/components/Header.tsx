import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onNavigateToSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToSection }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Close menu if switching to desktop
      if (!mobile) setIsMenuOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && 
          !target.closest('.mobile-menu') && 
          !target.closest('[aria-label="Toggle menu"]')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleStartVoting = () => {
    navigate("/wallet");
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onNavigateToSection(sectionId);
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: "Home", id: "hero" },
    { name: "Features", id: "features" },
    { name: "How it works", id: "how-it-works" },
    { name: "Contact", id: "footer" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: isMobile ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0 : 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-5"
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <motion.div
            initial={{ scale: isMobile ? 1 : 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : 0.2 }}
            className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-white/20 via-white/5 to-white/20 w-full max-w-5xl"
            style={{
              height: isMobile ? "60px" : "70px",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Logo */}
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0"
              onClick={() => scrollToSection("hero")}
            >
              <motion.img 
                src={logo} 
                alt="NovaBid" 
                className="w-6 h-6 sm:w-8 sm:h-8"
                animate={isMobile ? {} : {
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-lg sm:text-xl font-bold text-white">NovaBid</span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: isMobile ? 0 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0 : 0.4, delay: isMobile ? 0 : 0.1 * index }}
                  whileHover={isMobile ? {} : { 
                    scale: 1.05, 
                    color: "#ffffff",
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white transition-colors font-medium text-sm xl:text-base"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : 0.3 }}
              whileHover={isMobile ? {} : {
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(120, 1, 232, 0.3)",
              }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              onClick={handleStartVoting}
              className="hidden sm:block bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-4 lg:px-6 py-2 lg:py-3 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm lg:text-base whitespace-nowrap"
            >
              <span className="hidden lg:inline">Start Bidding Privately</span>
              <span className="lg:hidden">Start Bidding</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="sm:hidden p-2 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mobile-menu fixed top-20 left-4 right-4 z-50 sm:hidden"
          >
            <div 
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              }}
            >
              {/* Mobile Navigation Items */}
              <div className="space-y-4 mb-6">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-white hover:text-gray-300 transition-colors font-medium rounded-lg hover:bg-white/10"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleStartVoting}
                className="w-full bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-6 py-4 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Bidding Privately
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

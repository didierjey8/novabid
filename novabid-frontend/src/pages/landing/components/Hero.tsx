import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import left_sparkle from "@assets/landing/left_sparkle.png";
import right_sparkle from "@assets/landing/right_sparkle.png";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartVoting = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative">
      {/* Background lights - Corner top left */}
      <div className="absolute top-0 left-0 w-full h-full opacity-70 z-0">
        <motion.img 
          src={left_sparkle} 
          alt="sparkle" 
          className="w-full h-full object-cover"
          animate={isMobile ? {} : {
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background lights - Corner top right */}
      <div className="absolute top-0 right-0 w-full h-full opacity-70 z-0">
        <motion.img 
          src={right_sparkle} 
          alt="sparkle" 
          className="w-full h-full object-cover"
          animate={isMobile ? {} : {
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <section id="hero" className="relative z-10 px-6 pt-24 pb-8 lg:pt-32 lg:pb-16">
        {/* Tag Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.2 }}
          className="max-w-7xl mx-auto flex justify-center mb-8"
        >
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.02 }}
            className="inline-flex items-center space-x-3 rounded-[12px] px-4 py-3"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.042) 50.11%, rgba(255, 255, 255, 0.14) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            animate={isMobile ? {} : {
              boxShadow: [
                "0 0 0 0 rgba(120, 1, 232, 0)",
                "0 0 0 4px rgba(120, 1, 232, 0.1)",
                "0 0 0 0 rgba(120, 1, 232, 0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={isMobile ? {} : {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div className="w-px h-6 bg-white/30"></div>
            <motion.span
              className="text-sm font-medium bg-gradient-to-r from-white via-white/40 to-white bg-clip-text text-transparent"
              animate={isMobile ? {} : {
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              The Future of Private Governance
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.3 }}
            className="font-manrope font-bold text-white mb-8 text-4xl sm:text-5xl lg:text-6xl leading-tight"
            style={{
              letterSpacing: "-1.12px",
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.5 }}
            >
              Govern in the Shadows,
            </motion.span>
            <br className="block" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.7 }}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
            >
              Lead in the Light
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.6 }}
            className="font-cerapro text-gray-400 mb-10 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed px-4"
            style={{
              letterSpacing: "0.5px",
            }}
          >
            The first zero-knowledge platform for decentralized governance and
            auctions.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.9 }}
              className="text-white font-medium"
            >
              Your identity stays private. Your voice matters.
            </motion.span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.8 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={isMobile ? {} : {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(120, 1, 232, 0.4)",
              }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              onClick={handleStartVoting}
              className="bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center space-x-2 group"
            >
              <span>Start Bidding Privately</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={isMobile ? {} : { x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Particles */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles
                  className={`w-${3 + Math.floor(Math.random() * 3)} h-${
                    3 + Math.floor(Math.random() * 3)
                  } text-purple-400 opacity-30`}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;

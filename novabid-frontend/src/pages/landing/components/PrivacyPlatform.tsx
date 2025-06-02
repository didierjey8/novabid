import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Zap,
  BarChart3,
  TrendingUp,
  Link2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import dashboard_image from "@/assets/landing/dashboard_image.png";

const PrivacyPlatform: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      // Use Gmail web interface like the footer
      const recipient = "didierjey8@gmail.com";
      const subject = "Early Access Request - NovaBid Privacy Platform";
      const body = `Hello NovaBid Team,\n\nI'm interested in getting early access to the privacy platform.\n\nEmail: ${email}\n\nPlease let me know about the next steps.\n\nBest regards`;
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open Gmail compose in new tab
      window.open(gmailUrl, '_blank');
    }
    
    // Clear the email field
    setEmail("");
  };

  const features = [
    {
      icon: Shield,
      title: "Zero-Knowledge Privacy",
      description:
        "Your votes and bids are completely private using advanced cryptographic protocols. No one can see your choices or track your activity.",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "hover:border-purple-400/50",
      iconBorderColor: "border-purple-500",
      iconColor: "text-purple-500",
      backgroundGradient: "from-purple-500/5 via-transparent to-purple-500/5",
    },
    {
      icon: FileText,
      title: "Private Governance",
      description:
        "Participate in community decisions without revealing your identity. Create and vote on proposals with complete anonymity.",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "hover:border-blue-400/50",
      iconBorderColor: "border-blue-500",
      iconColor: "text-blue-500",
      backgroundGradient: "from-blue-500/5 via-transparent to-blue-500/5",
    },
    {
      icon: TrendingUp,
      title: "Anonymous Auctions",
      description:
        "Bid on exclusive items without exposing your identity or bidding patterns. Only the final winner is revealed.",
      borderColor: "border-green-500/30",
      hoverBorderColor: "hover:border-green-400/50",
      iconBorderColor: "border-green-500",
      iconColor: "text-green-500",
      backgroundGradient: "from-green-500/5 via-transparent to-green-500/5",
    },
    {
      icon: BarChart3,
      title: "Transparent Results",
      description:
        "See aggregated results and statistics without compromising individual privacy. Trust through transparency.",
      borderColor: "border-orange-500/30",
      hoverBorderColor: "hover:border-orange-400/50",
      iconBorderColor: "border-orange-500",
      iconColor: "text-orange-500",
      backgroundGradient: "from-orange-500/5 via-transparent to-orange-500/5",
    },
    {
      icon: Zap,
      title: "Instant Settlements",
      description:
        "Fast and secure settlement of auctions and governance decisions with automated smart contract execution.",
      borderColor: "border-pink-500/30",
      hoverBorderColor: "hover:border-pink-400/50",
      iconBorderColor: "border-pink-500",
      iconColor: "text-pink-500",
      backgroundGradient: "from-pink-500/5 via-transparent to-pink-500/5",
    },
    {
      icon: Link2,
      title: "VaultToken Economy",
      description:
        "Use our private ERC-20 token for all platform interactions. Your balance is encrypted and only visible to you.",
      borderColor: "border-violet-500/30",
      hoverBorderColor: "hover:border-violet-400/50",
      iconBorderColor: "border-violet-500",
      iconColor: "text-violet-500",
      backgroundGradient: "from-violet-500/5 via-transparent to-violet-500/5",
    },
  ];

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
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 },
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
    <section className="relative z-10 px-6 py-20 overflow-hidden">
      {/* Section Gradient Effects */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4 }}
            className="absolute top-10 left-10 w-64 h-64 pointer-events-none"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: 1 }}
            className="absolute top-1/3 right-0 w-48 h-80 pointer-events-none"
            animate={{
              opacity: [0.15, 0.35, 0.15],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.1) 60%, transparent 100%)",
              filter: "blur(35px)",
            }}
          />
        </>
      )}

      <div className="max-w-7xl mx-auto relative">
        {/* Ready to Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isMobile ? 0 : 0.8 }}
          className="mb-20"
        >
          {/* Main Card */}
          <motion.div
            className="relative rounded-[40px] border border-white/15 overflow-hidden w-full"
            style={{
              maxWidth: "1320px",
              minHeight: isMobile ? "auto" : "500px",
              margin: "0 auto",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.1) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start h-full p-6 md:p-8 lg:p-16 gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left w-full lg:max-w-none">
                <motion.h2
                  className="text-white mb-4 md:mb-6 font-manrope"
                  style={{
                    fontWeight: 500,
                    fontSize: isMobile ? "32px" : "48px",
                    lineHeight: isMobile ? "40px" : "60px",
                    letterSpacing: "-1.6%",
                  }}
                >
                  Ready to Experience<br className='hidden sm:block' />
                  <span className='sm:block'>Private Governance?</span>
                </motion.h2>

                <motion.p
                  className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Join thousands of users who are already participating in private
                  governance and auctions
                </motion.p>

                {/* Email Form */}
                <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start max-w-2xl mx-auto lg:mx-0">
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="text-white placeholder-gray-400 px-4 md:px-6 py-3 rounded-full border border-white/15 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 flex-1 min-w-0"
                    style={{
                      height: "56px",
                      background: "#FFFFFF3B",
                      backdropFilter: "blur(8.6px)",
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={isMobile ? {} : { scale: 0.98 }}
                    className="bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-6 md:px-8 py-4 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center justify-center space-x-2 group whitespace-nowrap h-[56px] min-w-fit"
                  >
                    <span>Get Early Access</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </form>

                <p className="text-gray-500 text-sm mt-4 text-center lg:text-left">
                  No spam, unsubscribe at any time.
                </p>
              </div>

              {/* Right Content - Dashboard Preview */}
              <div className='flex-1 w-full flex justify-center lg:justify-end'>
                <motion.div
                  className='w-full max-w-lg lg:max-w-2xl aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/10] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/20'
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    backdropFilter: "blur(10px)",
                  }}
                  animate={isMobile ? {} : {
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img 
                    src={dashboard_image} 
                    alt="Privacy Platform Dashboard Preview" 
                    className='w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105'
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Sparkles */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="w-3 h-3 text-purple-400 opacity-30" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PrivacyPlatform;
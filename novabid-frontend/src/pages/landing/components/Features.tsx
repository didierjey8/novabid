import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Vote,
  Zap,
  Eye,
  Users,
  Lock,
  Sparkles,
} from "lucide-react";

const Features: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
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
      icon: Vote,
      title: "Private Governance",
      description:
        "Participate in community decisions without revealing your identity. Create and vote on proposals with complete anonymity.",
      borderColor: "border-green-500/30",
      hoverBorderColor: "hover:border-green-400/50",
      iconBorderColor: "border-green-500",
      iconColor: "text-green-500",
      backgroundGradient: "from-green-500/5 via-transparent to-green-500/5",
    },
    {
      icon: Zap,
      title: "Anonymous Auctions",
      description:
        "Bid on exclusive items without exposing your identity or bidding patterns. Only the final winner is revealed.",
      borderColor: "border-orange-500/30",
      hoverBorderColor: "hover:border-orange-400/50",
      iconBorderColor: "border-orange-500",
      iconColor: "text-orange-500",
      backgroundGradient: "from-orange-500/5 via-transparent to-orange-500/5",
    },
    {
      icon: Eye,
      title: "Transparent Results",
      description:
        "See aggregated results and statistics without compromising individual privacy. Trust through transparency.",
      borderColor: "border-cyan-500/30",
      hoverBorderColor: "hover:border-cyan-400/50",
      iconBorderColor: "border-cyan-500",
      iconColor: "text-cyan-500",
      backgroundGradient: "from-cyan-500/5 via-transparent to-cyan-500/5",
    },
    {
      icon: Users,
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
      icon: Lock,
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
    <section id="features" className="relative z-10 px-6 py-20 overflow-hidden">
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isMobile ? 0 : 0.8 }}
          className="text-center mb-16"
        >
          {/* Tag Badge */}
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0 : 0.6 }}
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
                duration: 3,
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
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              <div className="w-px h-6 bg-white/30"></div>
              <motion.span
                className="text-sm font-medium bg-gradient-to-r from-white via-white/40 to-white bg-clip-text text-transparent"
                animate={isMobile ? {} : {
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Features of NovaBid
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.2 }}
            className="font-manrope text-4xl lg:text-5xl font-bold text-white mb-6 relative"
            style={{ letterSpacing: "-1.12px" }}
          >
            Revolutionary{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Privacy
            </span>
            {/* Title Gradient Effect */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute -inset-x-4 -inset-y-2 pointer-events-none"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(ellipse, rgba(147, 51, 234, 0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.3 }}
            className="font-cerapro text-xl text-gray-400 max-w-3xl mx-auto"
            style={{ letterSpacing: "0.5px" }}
          >
            Experience the future of governance with cutting-edge
            zero-knowledge technology
          </motion.p>
        </motion.div>

        {/* Features Grid - Dashboard-inspired cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={isMobile ? {} : { 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className={`${feature.borderColor} ${feature.hoverBorderColor} rounded-2xl p-6 transition-all cursor-pointer group relative overflow-hidden`}
              style={{
                background: `linear-gradient(135deg, ${feature.backgroundGradient})`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Card Gradient Overlay */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.iconColor.replace('text-', 'rgba(').replace('-500', ', 0.1)')} 0%, transparent 60%)`,
                    filter: "blur(15px)",
                  }}
                />
              )}

              {/* Icon Container - Dashboard style */}
              <motion.div
                animate={isMobile ? {} : {
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className={`w-12 h-12 border-2 ${feature.iconBorderColor} rounded-full flex items-center justify-center mb-4 relative z-10`}
              >
                <motion.div
                  animate={isMobile ? {} : {
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </motion.div>
              </motion.div>

              {/* Title */}
              <h3 className="text-white text-lg font-semibold mb-2 relative z-10">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed relative z-10">
                {feature.description}
              </p>


            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section Gradient */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: 1 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-32 pointer-events-none"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background: "linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)",
              filter: "blur(30px)",
            }}
          />
        )}

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

export default Features;

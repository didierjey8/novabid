import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wallet,
  Shield,
  Vote,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  const handleStartVoting = () => {
    navigate("/dashboard");
  };

  const steps = [
    {
      icon: Wallet,
      number: 1,
      title: "Connect Wallet",
      description:
        "Connect your preferred wallet to start participating in governance",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "hover:border-purple-400/50",
      iconBorderColor: "border-purple-500",
      iconColor: "text-purple-500",
      numberBg: "bg-purple-500",
      backgroundGradient: "from-purple-500/5 via-transparent to-purple-500/5",
    },
    {
      icon: Shield,
      number: 2,
      title: "Verify Identity",
      description:
        "Securely verify your identity using zero-knowledge proofs",
      borderColor: "border-green-500/30",
      hoverBorderColor: "hover:border-green-400/50",
      iconBorderColor: "border-green-500",
      iconColor: "text-green-500",
      numberBg: "bg-green-500",
      backgroundGradient: "from-green-500/5 via-transparent to-green-500/5",
    },
    {
      icon: Vote,
      number: 3,
      title: "Cast Your Vote",
      description:
        "Vote privately on proposals and auctions with complete anonymity",
      borderColor: "border-orange-500/30",
      hoverBorderColor: "hover:border-orange-400/50",
      iconBorderColor: "border-orange-500",
      iconColor: "text-orange-500",
      numberBg: "bg-orange-500",
      backgroundGradient: "from-orange-500/5 via-transparent to-orange-500/5",
    },
    {
      icon: CheckCircle,
      number: 4,
      title: "Track Results",
      description:
        "Monitor transparent results while maintaining your privacy",
      borderColor: "border-cyan-500/30",
      hoverBorderColor: "hover:border-cyan-400/50",
      iconBorderColor: "border-cyan-500",
      iconColor: "text-cyan-500",
      numberBg: "bg-cyan-500",
      backgroundGradient: "from-cyan-500/5 via-transparent to-cyan-500/5",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  return (
    <section id="how-it-works" className="relative z-10 px-6 py-20 overflow-hidden">
      {/* Section Gradient Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 5 }}
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.1) 50%, transparent 80%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 4, delay: 1 }}
        className="absolute bottom-1/4 left-0 w-56 h-96 pointer-events-none"
        animate={{
          opacity: [0.15, 0.3, 0.15],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "linear-gradient(45deg, rgba(249, 115, 22, 0.25) 0%, rgba(249, 115, 22, 0.1) 60%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Tag Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center space-x-3 rounded-[12px] px-4 py-3"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.042) 50.11%, rgba(255, 255, 255, 0.14) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(120, 1, 232, 0)",
                  "0 0 0 4px rgba(120, 1, 232, 0.1)",
                  "0 0 0 0 rgba(120, 1, 232, 0)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Wallet className="w-4 h-4 text-white" />
              </motion.div>
              <div className="w-px h-6 bg-white/30"></div>
              <motion.span
                className="text-sm font-medium bg-gradient-to-r from-white via-white/40 to-white bg-clip-text text-transparent"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                How NovaBid Works
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-manrope text-4xl lg:text-5xl font-bold text-white mb-6 relative"
            style={{ letterSpacing: "-1.12px" }}
          >
            Simple.{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Secure.
            </span>{" "}
            Private.
            {/* Title Gradient Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute -inset-x-4 -inset-y-2 pointer-events-none"
              animate={{
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(ellipse, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
                filter: "blur(25px)",
              }}
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cerapro text-xl text-gray-400 max-w-3xl mx-auto"
            style={{ letterSpacing: "0.5px" }}
          >
            Get started with NovaBid in just a few simple steps
          </motion.p>
        </motion.div>

        {/* Steps - Dashboard-inspired cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className={`${step.borderColor} ${step.hoverBorderColor} rounded-2xl p-6 transition-all cursor-pointer group relative overflow-hidden`}
              style={{
                background: `linear-gradient(135deg, ${step.backgroundGradient})`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Card Gradient Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 20%, ${step.iconColor.replace('text-', 'rgba(').replace('-500', ', 0.15)')} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />

              <div className="text-center relative z-10">
                {/* Icon Container - Dashboard style */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className={`w-16 h-16 border-2 ${step.iconBorderColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                  </motion.div>
                </motion.div>

                {/* Step Number */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(120, 1, 232, 0)",
                      "0 0 0 8px rgba(120, 1, 232, 0.1)",
                      "0 0 0 0 rgba(120, 1, 232, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.6,
                  }}
                  className={`inline-flex items-center justify-center w-8 h-8 ${step.numberBg} rounded-full text-white font-bold text-sm mb-4`}
                >
                  {step.number}
                </motion.div>

                {/* Title */}
                <h3 className="font-manrope text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-cerapro text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>

              {/* Arrow Connector - Only show on desktop and not for last item */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="hidden lg:block absolute top-8 -right-4 z-10"
                >
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-gray-600" />
                  </motion.div>
                </motion.div>
              )}

              {/* Individual Step Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: index * 0.8 }}
                className="absolute -top-8 -left-8 w-24 h-24 pointer-events-none"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 2,
                }}
                style={{
                  background: `radial-gradient(circle, ${step.iconColor.replace('text-', 'rgba(').replace('-500', ', 0.3)')} 0%, transparent 70%)`,
                  filter: "blur(25px)",
                }}
              />
            </motion.div>
          ))}

          {/* Central Flow Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-24 pointer-events-none hidden lg:block"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              background: "linear-gradient(90deg, rgba(147, 51, 234, 0.2) 0%, rgba(34, 197, 94, 0.2) 25%, rgba(249, 115, 22, 0.2) 75%, rgba(34, 211, 238, 0.2) 100%)",
              filter: "blur(35px)",
            }}
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center relative"
        >
          {/* CTA Background Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, delay: 3 }}
            className="absolute -inset-x-8 -inset-y-8 pointer-events-none"
            animate={{
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(ellipse, rgba(120, 1, 232, 0.3) 0%, rgba(120, 1, 232, 0.1) 50%, transparent 80%)",
              filter: "blur(30px)",
            }}
          />

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(120, 1, 232, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartVoting}
            className="bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center space-x-2 group relative z-10"
          >
            <span>Start Your Journey</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${25 + Math.random() * 50}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles
                className={`w-${3 + Math.floor(Math.random() * 2)} h-${
                  3 + Math.floor(Math.random() * 2)
                } text-purple-400 opacity-40`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

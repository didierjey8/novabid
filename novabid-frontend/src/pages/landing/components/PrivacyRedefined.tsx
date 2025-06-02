import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe } from "lucide-react";
import dashboard_feature from "@/assets/landing/dashboard_feature.png";
import { useNavigate } from "react-router-dom";

const PrivacyRedefined: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isMobile ? 0 : 0.6,
        staggerChildren: isMobile ? 0 : 0.2,
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
    <section className='relative z-10 px-6 py-20 overflow-hidden'>
      {/* Background Effects */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4 }}
            className='absolute top-1/4 left-1/4 w-96 h-96 pointer-events-none'
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 80%)",
              filter: "blur(60px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: 1 }}
            className='absolute bottom-1/4 right-1/4 w-64 h-64 pointer-events-none'
            animate={{
              opacity: [0.15, 0.4, 0.15],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 80%)",
              filter: "blur(45px)",
            }}
          />
        </>
      )}

      <div className='max-w-7xl mx-auto relative'>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isMobile ? 0 : 0.8 }}
          className='text-center mb-16'
        >
          <motion.h2
            className='font-manrope text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 relative leading-tight'
            style={{ letterSpacing: "-1.2px" }}
          >
            Privacy, Redefined with <br className='hidden sm:block' />
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent'>
              revolutionary features.
            </span>
            {/* Title Gradient Effect */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className='absolute -inset-x-4 -inset-y-2 pointer-events-none'
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(147, 51, 234, 0.2) 0%, transparent 70%)",
                  filter: "blur(25px)",
                }}
              />
            )}
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'
        >
          {/* Main Feature Card */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-2 relative rounded-3xl overflow-hidden'
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(168, 85, 247, 0.15) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className='p-8 lg:p-12 flex flex-col lg:flex-row items-center'>
              {/* Content */}
              <div className='flex-1 mb-8 lg:mb-0 lg:pr-8'>
                <motion.h3
                  className='font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight'
                  style={{ letterSpacing: "-0.8px" }}
                >
                  Eliminate voting surveillance and protect democracy
                </motion.h3>

                <motion.p
                  className='text-gray-300 text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl'
                  style={{ letterSpacing: "0.3px" }}
                >
                  Revolutionary cryptographic protocols ensure your votes remain
                  completely private while maintaining full transparency of
                  results. No one can track your voting patterns or influence
                  your decisions.
                </motion.p>

                <motion.button
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: "0 15px 35px rgba(147, 51, 234, 0.4)",
                        }
                  }
                  whileTap={isMobile ? {} : { scale: 0.98 }}
                  onClick={() => navigate("/wallet")}
                  className='bg-gradient-to-r from-[#5901E8] to-[#7801E8] px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center space-x-3 group'
                >
                  <span>Explore Privacy Tech</span>
                  <motion.div
                    animate={
                      isMobile
                        ? {}
                        : {
                            x: [0, 5, 0],
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className='w-5 h-5' />
                  </motion.div>
                </motion.button>
              </div>

              {/* Image Placeholder */}
              <div className='flex-1 lg:pl-8'>
                <motion.div
                  className='w-full h-64 lg:h-80 xl:h-96 rounded-2xl border border-white/10 flex items-center justify-center'
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    backdropFilter: "blur(10px)",
                  }}
                  animate={
                    isMobile
                      ? {}
                      : {
                          scale: [1, 1.02, 1],
                        }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img src={dashboard_feature} alt='Dashboard Feature' />
                </motion.div>
              </div>
            </div>

            {/* Card Gradient Overlay */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                  filter: "blur(20px)",
                }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-8'
        >
          {/* Lightning Settlements */}
          <motion.div
            variants={itemVariants}
            whileHover={
              isMobile
                ? {}
                : {
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }
            }
            className='relative rounded-2xl p-8 transition-all cursor-pointer group overflow-hidden border border-green-500/20'
            style={{
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.02) 50%, rgba(34, 197, 94, 0.1) 100%)",
              backdropFilter: "blur(15px)",
            }}
          >
            {/* Icon */}
            <motion.div
              animate={
                isMobile
                  ? {}
                  : {
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6'
            >
              <Zap className='w-8 h-8 text-white' />
            </motion.div>

            <motion.span
              className='text-2xl font-medium bg-gradient-to-t from-[#82f57c7e] to-white bg-clip-text text-transparent'
              animate={
                isMobile
                  ? {}
                  : {
                      opacity: [0.8, 1, 0.8],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Lightning Settlements
            </motion.span>

            <p className='text-gray-300 text-base lg:text-lg leading-relaxed'>
              Execute auctions and governance decisions 95% faster than
              traditional platforms. Automated smart contracts ensure instant,
              secure settlements.
            </p>

            {/* Card Hover Effect */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)",
                  filter: "blur(15px)",
                }}
              />
            )}
          </motion.div>

          {/* Universal Ecosystem */}
          <motion.div
            variants={itemVariants}
            whileHover={
              isMobile
                ? {}
                : {
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }
            }
            className='relative rounded-2xl p-8 transition-all cursor-pointer group overflow-hidden border border-purple-500/20'
            style={{
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.02) 50%, rgba(147, 51, 234, 0.1) 100%)",
              backdropFilter: "blur(15px)",
            }}
          >
            {/* Icon */}
            <motion.div
              animate={
                isMobile
                  ? {}
                  : {
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 relative'
            >
              <span className='text-white font-bold text-lg'>100</span>
              <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white/80 font-medium'>
                %
              </div>
            </motion.div>

            <motion.span
              className='text-2xl font-medium bg-gradient-to-t from-[#999999] to-white bg-clip-text text-transparent'
              animate={
                isMobile
                  ? {}
                  : {
                      opacity: [0.8, 1, 0.8],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Universal Ecosystem
            </motion.span>

            <p className='text-gray-300 text-base lg:text-lg leading-relaxed'>
              Seamlessly integrates with any EVM-compatible blockchain. Works
              with existing wallets, DAOs, and governance systems.
            </p>

            {/* Card Hover Effect */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 60%)",
                  filter: "blur(15px)",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyRedefined;

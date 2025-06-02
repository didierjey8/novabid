import React from "react";
import { motion } from "framer-motion";
import left_sparkle from "@assets/landing/left_sparkle.png";
import right_sparkle from "@assets/landing/right_sparkle.png";

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Original sparkle backgrounds */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <motion.img
          src={left_sparkle}
          alt="sparkle"
          className="w-full h-full object-cover"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute top-0 right-0 w-full h-full"
      >
        <motion.img
          src={right_sparkle}
          alt="sparkle"
          className="w-full h-full object-cover"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Gradient Effects Around the Page */}
      
      {/* Top Left Purple Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute -top-40 -left-40 w-80 h-80 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top Right Pink Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
        className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 80%)",
          filter: "blur(50px)",
        }}
      />

      {/* Middle Left Blue Gradient */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 4, delay: 2 }}
        className="absolute top-1/3 -left-48 w-64 h-96 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          filter: "blur(45px)",
        }}
      />

      {/* Middle Right Cyan Gradient */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 4, delay: 2.5 }}
        className="absolute top-1/2 -right-40 w-72 h-80 pointer-events-none"
        animate={{
          opacity: [0.25, 0.45, 0.25],
          x: [20, -20, 20],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          background: "radial-gradient(ellipse, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.1) 60%, transparent 90%)",
          filter: "blur(55px)",
        }}
      />

      {/* Bottom Left Green Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 4, delay: 3 }}
        className="absolute -bottom-32 -left-32 w-80 h-64 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 60%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Bottom Right Orange Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, delay: 3.5 }}
        className="absolute -bottom-40 -right-40 w-88 h-88 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(249, 115, 22, 0.15) 45%, transparent 75%)",
          filter: "blur(45px)",
        }}
      />

      {/* Center Floating Purple Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5, delay: 4 }}
        className="absolute top-1/4 left-1/3 w-40 h-40 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.4, 1],
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
          filter: "blur(35px)",
        }}
      />

      {/* Floating Rose Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5, delay: 4.5 }}
        className="absolute bottom-1/3 right-1/4 w-32 h-32 pointer-events-none"
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.3, 1],
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, rgba(244, 63, 94, 0.1) 60%, transparent 90%)",
          filter: "blur(30px)",
        }}
      />

      {/* Base overlay with subtle gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.7) 100%)",
        }}
      />

      {/* Animated overlay waves */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent via-pink-500/5 to-blue-500/5"
      />

      <motion.div
        animate={{
          opacity: [0.03, 0.12, 0.03],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent via-green-500/5 to-orange-500/5"
      />
    </div>
  );
};

export default BackgroundEffects;

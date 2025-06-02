import React from "react";
import { motion } from "framer-motion";
import dashboard from "@/assets/landing/dashboard_image.png";
import center_sparkle from "@assets/landing/center_sparkle.png";

const Dashboard: React.FC = () => {
  return (
    <section className="relative z-10 px-6 pb-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Dashboard Image with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex justify-center pt-10"
        >
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotateX: [0, 2, 0],
              rotateY: [0, -1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative group"
          >
            <motion.img
              src={dashboard}
              alt="NovaBid Dashboard"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(120, 1, 232, 0.3))",
              }}
              whileHover={{
                scale: 1.02,
                filter: "drop-shadow(0 30px 60px rgba(120, 1, 232, 0.4))",
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ zIndex: -1 }}
            />
          </motion.div>
        </motion.div>

        {/* Sparkle Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-x-0 top-0 h-[250px] z-20 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <motion.img
              src={center_sparkle}
              alt="center_sparkle"
              className="absolute top-0 w-full h-full object-cover mix-blend-screen"
              style={{
                transform: "translateY(-15%) scale(1.3)",
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1.2, 1.4, 1.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50"
          animate={{
            y: [10, -10, 10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-20 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-70"
          animate={{
            x: [-5, 5, -5],
            y: [-5, 5, -5],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
      </div>
    </section>
  );
};

export default Dashboard;

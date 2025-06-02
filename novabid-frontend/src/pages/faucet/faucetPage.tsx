import FaucetClaims from "@/components/faucet/faucetClaim";
import { motion } from "framer-motion";

const FaucetPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="md:px-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={contentVariants}
      >
        <FaucetClaims />
      </motion.div>
    </motion.div>
  );
};

export default FaucetPage;

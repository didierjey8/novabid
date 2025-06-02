import BalanceAndParticipants from "@/components/dashboard/balanceAndParticipants"
import CreatePollModal from "@/components/dashboard/createPollModal";
import DashboardCards from "@/components/dashboard/dashboardCards"
import FeaturedPoll from "@/components/dashboard/featuredPoll";
import ReceiveTokensQRModal from "@/components/dashboard/receiveTokensQRModal";
import RecentActivity from "@/components/dashboard/recentActivity";
import SendVaulTokenModal from "@/components/dashboard/sendVaulTokenModal";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState("")
    const [searchParams] = useSearchParams()
    const modal = searchParams.get("modal")
    const navigate = useNavigate()

    useEffect(() => {
        if (modal === "createpoll") {
            setModalOpen(true)
            setModalType("createpoll")
        }
        if (modal === "sendvaultoken") {
            setModalOpen(true)
            setModalType("sendvaultoken")
        }
        if (modal === "receivevaultoken") {
            setModalOpen(true)
            setModalType("receivevaultoken")
        }
    }, [modal])

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.15,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.5
            }
        }
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const handleModalClose = (type: string) => {
        setModalOpen(false);
        navigate("/dashboard");
    };

    return (
        <motion.div 
            className="p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <DashboardCards />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <BalanceAndParticipants />
            </motion.div>
            
            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-6"
                variants={gridVariants}
            >
                <motion.div variants={itemVariants}>
                    <RecentActivity />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <FeaturedPoll />
                </motion.div>
            </motion.div>

            {/* Animated Modals */}
            <AnimatePresence mode="wait">
                {modalType === "createpoll" && (
                    <motion.div
                        key="createpoll-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25,
                            duration: 0.3 
                        }}
                    >
                        <CreatePollModal 
                            isOpen={modalOpen} 
                            onClose={() => handleModalClose("createpoll")} 
                        />
                    </motion.div>
                )}
                
                {modalType === "sendvaultoken" && (
                    <motion.div
                        key="sendvaultoken-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25,
                            duration: 0.3 
                        }}
                    >
                        <SendVaulTokenModal 
                            isOpen={modalOpen} 
                            onClose={() => handleModalClose("sendvaultoken")} 
                        />
                    </motion.div>
                )}
                
                {modalType === "receivevaultoken" && (
                    <motion.div
                        key="receivevaultoken-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25,
                            duration: 0.3 
                        }}
                    >
                        <ReceiveTokensQRModal 
                            isOpen={modalOpen} 
                            onClose={() => handleModalClose("receivevaultoken")} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Dashboard;

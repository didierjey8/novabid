import { useState } from "react"
import { HelpCircle, ChevronDown, ChevronUp, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import video from "@/assets/faq/video.png"
import Card from "@/assets/faq/Card.png"

interface FAQItem {
    id: string
    question: string
    answer: string
    expanded: boolean
}

interface VideoTutorial {
    id: string
    title: string
    duration: string
    thumbnail: string
    isNew?: boolean
}

// FAQ categories for future use
const faqCategories = ["General", "Wallet & Tokens", "Polls", "Auctions", "Faucet", "Privacy & Security"]

// FAQ data with comprehensive questions and answers
const faqData: FAQItem[] = [
    {
        id: "1",
        question: "What is NovaBid?",
        answer:
            "NovaBid is a privacy-focused platform that allows users to participate in private polls and auctions using VaultTokens, a private ERC20 token. Our mission is to empower users to vote, bid, and decide—privately.",
        expanded: true,
    },
    {
        id: "2",
        question: "How does NovaBid ensure privacy?",
        answer:
            "NovaBid uses advanced cryptographic techniques and zero-knowledge proofs to ensure complete privacy in all transactions and voting activities.",
        expanded: false,
    },
    {
        id: "3",
        question: "Is NovaBid free to use?",
        answer: "Yes, NovaBid is free to use. You can participate in polls and auctions without any platform fees.",
        expanded: false,
    },
    {
        id: "4",
        question: "How do I get started with NovaBid?",
        answer:
            "Simply connect your wallet, claim some VaultTokens from our faucet, and start participating in polls and auctions.",
        expanded: false,
    },
]

// Video tutorials for help section
const videoTutorials: VideoTutorial[] = [
    {
        id: "1",
        title: "Getting Started with NovaBid",
        duration: "3:45",
        thumbnail: video,
        isNew: true,
    },
    {
        id: "2",
        title: "How to Create Your First Poll",
        duration: "3:46",
        thumbnail: video,
        isNew: true,
    },
    {
        id: "3",
        title: "Understanding Privacy Features",
        duration: "3:45",
        thumbnail: video,
        isNew: true,
    },
    {
        id: "4",
        title: "Managing Your Wallet",
        duration: "4:12",
        thumbnail: video,
    },
    {
        id: "5",
        title: "Advanced Auction Strategies",
        duration: "5:23",
        thumbnail: video,
    },
    {
        id: "6",
        title: "Token Economics Explained",
        duration: "6:15",
        thumbnail: video,
    },
]

export default function HelpFAQPage() {
    const [activeCategory, setActiveCategory] = useState("General")
    const [faqItems, setFaqItems] = useState<FAQItem[]>(faqData)

    // Handle FAQ item expansion toggle
    const toggleFAQ = (id: string) => {
        setFaqItems((items) => items.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)))
    }

    // Handle email support click - opens Gmail compose
    const handleContactSupport = () => {
        const email = "didierjey8@gmail.com"
        const subject = "NovaBid Support Request"
        const body = "Hello NovaBid Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you!"
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(gmailUrl, '_blank')
    }

    // Generate dynamic gradient backgrounds for video thumbnails
    const getThumbnailBackground = (index: number) => {
        const backgrounds = [
            "linear-gradient(135deg, #f97316 0%, #dc2626 50%, #7c2d12 100%)",
            "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
            "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1d4ed8 100%)",
            "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
            "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
            "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
        ]
        return backgrounds[index % backgrounds.length]
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
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
                damping: 25
            }
        }
    };

    const bannerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.6
            }
        }
    };

    const faqVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25
            }
        }
    };

    const faqListVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const expandVariants = {
        hidden: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.2, ease: "easeInOut" }
        },
        visible: { 
            opacity: 1, 
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <motion.div 
            className="bg-black min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Support Banner with contact email integration */}
            <motion.div 
                className="p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8 rounded-xl sm:rounded-2xl"
                style={{ background: `url(${Card}) no-repeat center center`, backgroundSize: "cover" }}
                variants={bannerVariants}
                whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
            >
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8">
                    <motion.div 
                        className="flex-1 text-center sm:text-left"
                        variants={itemVariants}
                    >
                        <motion.h1 
                            className="text-xl sm:text-2xl lg:text-3xl text-white font-bold mb-2"
                            variants={itemVariants}
                        >
                            Still need help?
                        </motion.h1>
                        <motion.p 
                            className="text-teal-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6"
                            variants={itemVariants}
                        >
                            Can't find what you're looking for? Our support team is here to help.
                        </motion.p>
                        <motion.button 
                            onClick={handleContactSupport}
                            className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm sm:text-base lg:text-lg font-semibold py-2.5 sm:py-3 lg:py-4 px-5 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            Send Email
                        </motion.button>
                    </motion.div>
                    <motion.div 
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 border-teal-500/30 rounded-full flex items-center justify-center"
                        variants={itemVariants}
                        whileHover={{ 
                            rotate: 360,
                            borderColor: "rgba(20, 184, 166, 0.6)",
                            scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div 
                className="px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12"
                variants={containerVariants}
            >
                {/* FAQ Section with improved responsive design */}
                <motion.div 
                    className="mb-8 sm:mb-12 lg:mb-16"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        FAQ
                    </motion.h2>
                    <motion.p 
                        className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-10"
                        variants={itemVariants}
                    >
                        Frequently asked questions about NovaBid
                    </motion.p>

                    {/* FAQ Content */}
                    <motion.div 
                        className="mb-8"
                        variants={faqVariants}
                    >
                        <motion.h3 
                            className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2"
                            variants={itemVariants}
                        >
                            General FAQ
                        </motion.h3>
                        <motion.p 
                            className="text-gray-400 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 lg:mb-8"
                            variants={itemVariants}
                        >
                            Frequently asked questions about general topics
                        </motion.p>

                        {/* FAQ Items with enhanced responsive behavior */}
                        <motion.div 
                            className="space-y-3 sm:space-y-4 lg:space-y-6 max-w-4xl"
                            variants={faqListVariants}
                        >
                            {faqItems.map((item, index) => (
                                <motion.div 
                                    key={item.id} 
                                    className="bg-[#191B1D] border border-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                    whileHover={{ 
                                        borderColor: "rgba(139, 92, 246, 0.4)",
                                        scale: 1.02,
                                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    layout
                                >
                                    <motion.button
                                        onClick={() => toggleFAQ(item.id)}
                                        className="w-full p-4 sm:p-6 lg:p-8 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors group"
                                        whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <motion.span 
                                            className="text-white text-sm sm:text-base lg:text-lg font-medium pr-4 group-hover:text-purple-300 transition-colors"
                                            layout
                                        >
                                            {item.question}
                                        </motion.span>
                                        <motion.div
                                            animate={{ rotate: item.expanded ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 flex-shrink-0 group-hover:text-purple-400 transition-colors" />
                                        </motion.div>
                                    </motion.button>
                                    
                                    <AnimatePresence>
                                        {item.expanded && (
                                            <motion.div
                                                variants={expandVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="overflow-hidden"
                                                layout
                                            >
                                                <motion.div 
                                                    className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

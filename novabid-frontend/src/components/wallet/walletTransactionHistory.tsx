import { useState } from "react"
import { Send, Download, ArrowUpRight, ArrowDownLeft, Clock, ChevronDown } from "lucide-react"
import balanceIcon from "@/assets/dashboard/balanceicon.png"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

interface Transaction {
    id: string
    type: "send" | "receive"
    address: string
    amount: number
    status: "Completed" | "Pending" | "Draft"
    timestamp: string
}

const transactions: Transaction[] = [
    {
        id: "1",
        type: "send",
        address: "0x8912...",
        amount: -50,
        status: "Completed",
        timestamp: "3h ago",
    },
    {
        id: "2",
        type: "receive",
        address: "0x7A3B...",
        amount: 125,
        status: "Completed",
        timestamp: "5h ago",
    },
    {
        id: "3",
        type: "send",
        address: "0x9F2E...",
        amount: -25,
        status: "Pending",
        timestamp: "1d ago",
    },
    {
        id: "4",
        type: "receive",
        address: "0x4C1D...",
        amount: 75,
        status: "Completed",
        timestamp: "2d ago",
    },
    {
        id: "5",
        type: "send",
        address: "0x6E8A...",
        amount: -100,
        status: "Draft",
        timestamp: "3d ago",
    },
    {
        id: "6",
        type: "receive",
        address: "0x2B7F...",
        amount: 200,
        status: "Pending",
        timestamp: "1w ago",
    },
    {
        id: "7",
        type: "send",
        address: "0x5D9C...",
        amount: -80,
        status: "Completed",
        timestamp: "2w ago",
    },
    {
        id: "8",
        type: "receive",
        address: "0x1A6B...",
        amount: 300,
        status: "Completed",
        timestamp: "1mo ago",
    },
    {
        id: "9",
        type: "send",
        address: "0x3F8E...",
        amount: -150,
        status: "Draft",
        timestamp: "2mo ago",
    },
    {
        id: "10",
        type: "receive",
        address: "0x8C4D...",
        amount: 500,
        status: "Completed",
        timestamp: "1yr ago",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Completed":
            return "text-green-400"
        case "Pending":
            return "text-orange-400"
        case "Draft":
            return "text-gray-400"
        default:
            return "text-gray-400"
    }
}

export default function WalletTransactionHistory() {
    const [activeTab, setActiveTab] = useState("All")
    const [timeFilter, setTimeFilter] = useState("Last Week")
    const navigate = useNavigate()

    const tabs = ["All", "Completed", "Pending", "Draft"]

    const filteredTransactions = transactions.filter(transaction => {
        const timeFilterMatch = (() => {
            switch (timeFilter) {
                case "Last Week":
                    return transaction.timestamp.includes('h ago') || transaction.timestamp.includes('d ago')
                case "Last Month":
                    return !transaction.timestamp.includes('yr ago')
                case "Last Year":
                    return true
                default:
                    return true
            }
        })()

        const statusFilterMatch = activeTab === "All" || transaction.status === activeTab

        return timeFilterMatch && statusFilterMatch
    })

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Balance Section - Optimized for small screens */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                        {/* Balance Info - Optimized for mobile */}
                        <div className="flex-1">
                            <h3 className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">Private Balance</h3>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="flex-1 min-w-0">
                                    <div className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 leading-tight">1,250.00</div>
                                    <div className="text-gray-400 text-sm sm:text-base">VaultToken</div>
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0">
                                    <img src={balanceIcon} alt="VaultToken" className="w-full h-full p-2 sm:p-3" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Improved responsive layout */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 lg:min-w-[320px] xl:min-w-[380px]">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 transition-all font-medium text-sm sm:text-base whitespace-nowrap" 
                                onClick={() => navigate("/wallet?modal=sendvaultoken")}
                            >
                                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Send Tokens</span>
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-transparent border border-gray-600 text-white py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-700/50 transition-all font-medium text-sm sm:text-base whitespace-nowrap" 
                                onClick={() => navigate("/wallet?modal=receivevaultoken")}
                            >
                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Receive Tokens</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Transaction History Section - Optimized for small screens */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Header - Improved mobile layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            <h3 className="text-white text-lg sm:text-xl font-semibold">Transaction History</h3>
                        </div>
                        <div className="relative">
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="bg-[#191B1D] border border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-gray-300 focus:outline-none focus:border-purple-500 appearance-none pr-8 sm:pr-10 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base"
                            >
                                <option value="Last Week">Last Week</option>
                                <option value="Last Month">Last Month</option>
                                <option value="Last Year">Last Year</option>
                            </select>
                            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none" />
                        </div>
                    </div>

                    {/* Tabs - Improved for small screens */}
                    <div className="flex space-x-0.5 sm:space-x-1 mb-4 sm:mb-6 bg-gray-800/50 rounded-lg p-0.5 sm:p-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap min-w-0 ${
                                    activeTab === tab
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-300 hover:bg-purple-800/30"
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-[#191B1D] via-purple-600 to-[#191B1D] rounded-md"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Transaction List - Optimized mobile layout */}
                    <div className="space-y-1">
                        <AnimatePresence mode="wait">
                            {filteredTransactions.length > 0 ? (
                                <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2 space-y-0.5 sm:space-y-1">
                                    {filteredTransactions.map((transaction, index) => (
                                        <motion.div
                                            key={transaction.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            whileHover={{ scale: 1.005, backgroundColor: "rgba(75, 85, 99, 0.1)" }}
                                            className="flex items-center justify-between py-3 sm:py-4 px-2 sm:px-3 border-b border-gray-700/50 last:border-b-0 rounded-lg cursor-pointer transition-all duration-200"
                                        >
                                            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                                                <div
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                        transaction.type === "send" ? "bg-red-600/20" : "bg-green-600/20"
                                                    }`}
                                                >
                                                    {transaction.type === "send" ? (
                                                        <ArrowDownLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-red-400" />
                                                    ) : (
                                                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-400" />
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col gap-0.5 sm:gap-1 mb-1">
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <span className="text-white font-medium text-xs sm:text-sm truncate">
                                                                {transaction.type === "send" ? "Send to" : "Receive from"} {transaction.address}
                                                            </span>
                                                            <span className={`text-xs font-medium ${getStatusColor(transaction.status)} flex-shrink-0`}>
                                                                {transaction.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-500 text-xs">
                                                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 flex-shrink-0" />
                                                        <span>{transaction.timestamp}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right flex-shrink-0 ml-2 sm:ml-4">
                                                <div className={`text-xs sm:text-sm font-semibold ${
                                                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                                                }`}>
                                                    {transaction.amount > 0 ? "+" : ""}
                                                    {transaction.amount} NovaBid
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-8 sm:py-12 text-gray-400"
                                >
                                    <Clock className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                                    <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">No Transactions Found</p>
                                    <p className="text-xs sm:text-sm">No transactions match the selected filters</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
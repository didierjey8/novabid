import { useEffect, useState } from "react"
import { Search, ArrowUpDown, Clock, Calendar, Plus } from "lucide-react"

import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {formatBalance} from '@/lib/utils'

import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { auctionManagerAbi, auctionManagerAddress } from "@/config/AuctionManager.config";

export interface Auction {
  id: bigint;
  title: string;
  description: string;
  imageUrl: string;
  owner: string;
  startingBid: bigint;
  highestBid: bigint;
  highestBidder: string;
  endTime: bigint;
  status: number;
}

const steps = [
    {
        number: "01",
        title: "Create Your Auction",
        description: "Set your item details, starting bid, and auction duration with complete flexibility.",
        color: "text-purple-400",
        dotColor: "bg-purple-500",
    },
    {
        number: "02",
        title: "Private Bidding",
        description: "Only authorized users can place bids on your auction items in a secure environment.",
        color: "text-teal-400",
        dotColor: "bg-teal-500",
    },
    {
        number: "03",
        title: "Secure Settlement",
        description: "When the auction ends, settlement is handled privately and securely through smart contracts.",
        color: "text-orange-400",
        dotColor: "bg-orange-500",
    },
]

export default function AuctionsPage({ tokenBalanceData, encryptedBalance }: { tokenBalanceData: any; encryptedBalance: any }) {
    const {address} = useAccount();
    const [activeTab, setActiveTab] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("Recent")
    const [auctionsResultsDataState, setAuctionsResultsDataState] = useState<Auction[]>([]);
      
    const { data: isClosed, isPending: isClosing, error: errorClosing, writeContract } = useWriteContract();

    const navigate = useNavigate()

    const tabs = ["All", "Active Auctions", "Completed"]


    const { data: dataAll, refetch: refetchResultsDataAll } = useReadContract({
        address: auctionManagerAddress, 
        abi: auctionManagerAbi, 
        functionName: 'getAllAuctions',
        args: []
    });
    const auctionsResultsData = dataAll as Auction[] | undefined;
    
    const { data: dataFiltered, refetch: refetchResultsDataFiltered } = useReadContract({
        address: auctionManagerAddress, 
        abi: auctionManagerAbi, 
        functionName: 'getAllAuctionsWithParticipation',
        args: []
    });
    const auctionsResultsFilteredData = dataFiltered as Auction[][] | [[],[],[]];

    useEffect(()=>{
        if (auctionsResultsData?.length) {
            setAuctionsResultsDataState(auctionsResultsData);
        }
    },[auctionsResultsData]);

    useEffect(()=>{
        if(isClosed){
            refetchResultsDataAll();
            refetchResultsDataFiltered();
        }
    },[isClosed]);

    // Filter and sort auctions
    const filteredAndSortedAuctions = auctionsResultsDataState
        .filter(auction => {
            // Status filter
            const statusMatch = (() => {
                if (activeTab === "All") return true
                if (activeTab === "Active Auctions") return auction.status === 0
                if (activeTab === "Completed") return auction.status === 1
                return true
            })()
            
            // Search filter
            const searchMatch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               auction.description.toLowerCase().includes(searchQuery.toLowerCase())
            
            return statusMatch && searchMatch
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "Recent":
                    return Number(b.id) - Number(a.id);
                case "Price":
                    return Number(b.startingBid) - Number(a.startingBid);
                default:
                    return 0;
            }
        })

    return (
        <div className="bg-black min-h-screen p-4 sm:p-6 lg:p-8 relative">
            {/* Auctions List Section */}
            <div className="mb-8 lg:mb-16">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 lg:mb-8"
                >
                    {/* Top Section with Title and Create Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Auctions List</h1>
                            <p className="text-gray-400 text-base sm:text-lg">Discover unique items and place your bids in our secure auction environment.</p>
                        </div>
                        
                        {/* Desktop Create Button */}
                        <motion.button
                            onClick={() => navigate("/auctions?modal=createauction")}
                            className="hidden lg:flex items-center space-x-2 bg-white text-black font-medium px-4 py-2.5 rounded-lg transition-all duration-300 relative hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create Auction</span>
                        </motion.button>
                    </div>

                    {/* Balances Section */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-lg text-white font-bold">Regular Token Balance:</p>
                            <p className="text-2xl text-lg font-medium text-gray-400">
                                {tokenBalanceData ? `${tokenBalanceData.formatted} ${tokenBalanceData.symbol}` : '0 NOVABID'}
                            </p>
                        </div>

                        <div>
                            <p className="text-lg text-white font-bold">Encrypted Balance:</p>
                            <p className="text-2xl text-lg font-medium text-gray-400">
                                {formatBalance(encryptedBalance.decryptedBalance)} NOVABID
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8"
                >
                    {/* Tabs */}
                    <div className="flex w-full lg:w-auto">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 lg:flex-none px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 relative ${
                                    activeTab === tab
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-300 hover:bg-purple-800/30"
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="auctionActiveTab"
                                        className="absolute inset-0 bg-gradient-to-r from-[#191B1D] via-purple-600 to-[#191B1D] rounded-lg"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Search and Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {/* Search */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative flex-1 sm:flex-none"
                        >
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search auctions..."
                                className="w-full sm:w-64 bg-[#191B1D] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </motion.div>

                        {/* Sort */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="relative flex-1 sm:flex-none"
                        >
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500 appearance-none pr-10 transition-colors"
                            >
                                <option value="Recent">Sort by Recent</option>
                                <option value="Price">Highest Price</option>
                                <option value="Bids">Most Bids</option>
                                <option value="Ending">Ending Soon</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Results count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-4 text-sm text-gray-400"
                >
                    Showing {filteredAndSortedAuctions.length} auctions
                    {searchQuery && ` matching "${searchQuery}"`}
                </motion.div>

                {/* Auctions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <AnimatePresence mode="wait">
                        {filteredAndSortedAuctions.length > 0 ? (
                            filteredAndSortedAuctions.map((auction, index) => (
                                <motion.div
                                    key={auction.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-600 transition-all cursor-pointer"
                                >
                                    {/* Image */}
                                    <div className="relative h-40 sm:h-48 overflow-hidden">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full"
                                            style={{
                                                background: `url(${auction.imageUrl}) no-repeat center center`,
                                                backgroundSize: "cover",
                                            }}
                                        >
                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    auction.status === 0 
                                                        ? "bg-purple-600 text-white" 
                                                        : "bg-green-600 text-white"
                                                }`}>
                                                    {auction.status==0?'Active':'Ended'}
                                                </span>
                                            </div>

                                            {/* Overlay content based on auction type */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                                {index % 3 === 0 && (
                                                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                                                        <div className="w-14 sm:w-16 h-14 sm:h-16 bg-white/30 rounded-full"></div>
                                                    </div>
                                                )}
                                                {index % 3 === 1 && (
                                                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/20 rounded-full border-4 border-white/30 relative">
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-5 sm:h-6 bg-white/40"></div>
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 h-1 bg-white/40"></div>
                                                    </div>
                                                )}
                                                {index % 3 === 2 && (
                                                    <div className="w-16 sm:w-20 h-10 sm:h-12 bg-white/20 rounded-lg relative">
                                                        <div className="absolute top-2 left-2 w-3 sm:w-4 h-1.5 sm:h-2 bg-white/30 rounded"></div>
                                                        <div className="absolute top-2 right-2 w-3 sm:w-4 h-1.5 sm:h-2 bg-white/30 rounded"></div>
                                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-1 bg-white/30 rounded"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 sm:p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                                            <h3 className="text-white text-base sm:text-lg font-semibold pr-2">{auction.title}</h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2">{auction.description}</p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3 sm:space-x-4">
                                                <span className="text-white text-lg sm:text-xl font-bold">${Number(auction.startingBid).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Bid Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base font-medium transition-all ${
                                                auction.status === 0
                                                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                    : "bg-gray-700 text-gray-300 cursor-not-allowed"
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (auction.status === 0&&address === auction.owner) {
                                                    writeContract({
                                                        address: auctionManagerAddress,
                                                        abi: auctionManagerAbi,
                                                        functionName: 'closeAuction',
                                                        args: [
                                                            BigInt(auction.id)
                                                        ],
                                                    });
                                                }else if (auction.status === 0) {
                                                    navigate(`/auctions/${auction.id}`, { state: { auction } })
                                                }
                                            }}
                                            disabled={auction.status !== 0}
                                        >
                                            {
                                                auction.status === 0 ? 
                                                    (
                                                        auctionsResultsFilteredData[2].some(a => a.id === auction.id) ? 
                                                        "Already Bid"
                                                        :
                                                        (
                                                            address === auction.owner ? 
                                                            "Close"
                                                            :
                                                            "Place Bid"
                                                        )
                                                    ) 
                                                : 
                                                    "Auction Ended"
                                            }
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-12 text-gray-400"
                            >
                                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-semibold mb-2">No auctions found</h3>
                                <p>Try adjusting your search terms or filters</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* How It Works Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <div className="mb-8 lg:mb-12">
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">How It Works</h2>
                    <p className="text-gray-400 text-base sm:text-lg">Simple steps to participate in our secure auction environment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={step.number} 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="relative"
                        >
                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1 left-7 w-[90%] h-px bg-gray-700 z-0"></div>
                            )}

                            {/* Step Content */}
                            <div className="relative z-10">
                                {/* Step Dot */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.9 + index * 0.2 }}
                                    className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${step.dotColor} rounded-full mb-4 sm:mb-6`}
                                ></motion.div>

                                <div className="bg-[#191B1D] rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                                    {/* Step Number */}
                                    <div className={`${step.color} text-xs sm:text-sm font-medium mb-2`}>Step {step.number}</div>

                                    {/* Step Title */}
                                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>

                                    {/* Step Description */}
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auctions?modal=createauction")}
                className="fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 lg:hidden border border-gray-200"
            >
                <Plus className="w-6 h-6" />
            </motion.button>
        </div>
    )
}

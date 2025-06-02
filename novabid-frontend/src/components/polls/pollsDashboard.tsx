import { useState } from "react"
import { Search, ArrowUpDown, Calendar, Plus } from "lucide-react"
import poll1 from "@/assets/polls/cardsBg.png"
import poll2 from "@/assets/polls/cardsBg2.png"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

interface Poll {
    id: string
    title: string
    description: string
    status: "Active" | "Completed"
    reward: number
    totalVotes: number
    endsIn: string
    options: {
        name: string
        percentage: number
        color: string
    }[]
}

const pollsData: Poll[] = [
    {
        id: "1",
        title: "Product Roadmap Priorities Q2",
        description: "Help us decide which features to focus on for the next quarter.",
        status: "Active",
        reward: 200,
        totalVotes: 121,
        endsIn: "2 days",
        options: [
            { name: "GraphQL", percentage: 40, color: "bg-cyan-500" },
            { name: "WebAssembly", percentage: 26, color: "bg-blue-500" },
        ],
    },
    {
        id: "2",
        title: "UI/UX Design Direction",
        description: "Vote on the design system we should adopt for our upcoming redesign.",
        status: "Active",
        reward: 150,
        totalVotes: 89,
        endsIn: "5 days",
        options: [
            { name: "Material Design", percentage: 55, color: "bg-green-500" },
            { name: "Ant Design", percentage: 30, color: "bg-orange-500" },
        ],
    },
    {
        id: "3",
        title: "Community Event Planning",
        description: "Choose the type of community event you'd like to see next month.",
        status: "Active",
        reward: 300,
        totalVotes: 245,
        endsIn: "1 day",
        options: [
            { name: "Hackathon", percentage: 35, color: "bg-purple-500" },
            { name: "Workshop", percentage: 45, color: "bg-pink-500" },
        ],
    },
    {
        id: "4",
        title: "Documentation Improvements",
        description: "What documentation area needs the most attention?",
        status: "Active",
        reward: 100,
        totalVotes: 67,
        endsIn: "3 days",
        options: [
            { name: "API Docs", percentage: 60, color: "bg-indigo-500" },
            { name: "Tutorials", percentage: 25, color: "bg-teal-500" },
        ],
    },
    {
        id: "5",
        title: "Security Protocol Updates",
        description: "Vote on enhanced security measures for the platform.",
        status: "Active",
        reward: 500,
        totalVotes: 156,
        endsIn: "4 days",
        options: [
            { name: "Two-Factor Auth", percentage: 70, color: "bg-red-500" },
            { name: "Biometric Login", percentage: 20, color: "bg-yellow-500" },
        ],
    },
    {
        id: "6",
        title: "Mobile App Features",
        description: "Which mobile features should we prioritize in the next release?",
        status: "Active",
        reward: 250,
        totalVotes: 198,
        endsIn: "6 days",
        options: [
            { name: "Dark Mode", percentage: 45, color: "bg-gray-500" },
            { name: "Offline Mode", percentage: 35, color: "bg-blue-600" },
        ],
    },
    {
        id: "7",
        title: "Backend Infrastructure",
        description: "Choose the cloud provider for our next infrastructure upgrade.",
        status: "Completed",
        reward: 400,
        totalVotes: 312,
        endsIn: "Ended",
        options: [
            { name: "AWS", percentage: 55, color: "bg-green-500" },
            { name: "Google Cloud", percentage: 35, color: "bg-blue-500" },
        ],
    },
    {
        id: "8",
        title: "Programming Language",
        description: "What new programming language should we adopt for microservices?",
        status: "Completed",
        reward: 350,
        totalVotes: 278,
        endsIn: "Ended",
        options: [
            { name: "Rust", percentage: 65, color: "bg-orange-500" },
            { name: "Go", percentage: 25, color: "bg-cyan-500" },
        ],
    },
    {
        id: "9",
        title: "Testing Strategy",
        description: "How should we improve our testing and quality assurance processes?",
        status: "Completed",
        reward: 200,
        totalVotes: 145,
        endsIn: "Ended",
        options: [
            { name: "E2E Testing", percentage: 50, color: "bg-purple-500" },
            { name: "Unit Testing", percentage: 40, color: "bg-green-500" },
        ],
    },
    {
        id: "10",
        title: "Database Migration",
        description: "Which database technology should we migrate to for better performance?",
        status: "Completed",
        reward: 600,
        totalVotes: 423,
        endsIn: "Ended",
        options: [
            { name: "PostgreSQL", percentage: 60, color: "bg-blue-500" },
            { name: "MongoDB", percentage: 30, color: "bg-green-500" },
        ],
    },
]

export default function PollsDashboard() {
    const [activeTab, setActiveTab] = useState("Active Polls")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("Recent")
    const navigate = useNavigate()

    const tabs = ["Active Polls", "Completed"]

    // Filter and sort polls
    const filteredAndSortedPolls = pollsData
        .filter(poll => {
            // Status filter
            const statusMatch = activeTab === "Active Polls" ? poll.status === "Active" : poll.status === "Completed"
            
            // Search filter
            const searchMatch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               poll.description.toLowerCase().includes(searchQuery.toLowerCase())
            
            return statusMatch && searchMatch
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "Recent":
                    return parseInt(a.id) - parseInt(b.id) // Assuming higher ID = more recent
                case "Votes":
                    return b.totalVotes - a.totalVotes
                case "Ending":
                    if (a.endsIn === "Ended" || b.endsIn === "Ended") return 0
                    const aDays = parseInt(a.endsIn.split(' ')[0])
                    const bDays = parseInt(b.endsIn.split(' ')[0])
                    return aDays - bDays
                case "Reward":
                    return b.reward - a.reward
                default:
                    return 0
            }
        })

    return (
        <div className="bg-black min-h-screen p-4 sm:p-6 lg:p-8 relative">
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
                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Polls Dashboard</h1>
                        <p className="text-gray-400 text-base sm:text-lg">Vote on community decisions and governance proposals.</p>
                    </div>
                    
                    {/* Desktop Create Button */}
                    <motion.button
                    onClick={() => navigate("/dashboard?modal=createpoll")}
                    className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-purple-600/90 to-purple-800/90 hover:from-purple-600 hover:to-purple-800 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-300 relative backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    {/* Coming Soon Badge */}
                    <span
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-sm z-20"
                    >
                    SOON
                    </span>
                    <Plus className="w-4 h-4" />
                    <span>Create Poll</span>
                    </motion.button>
                </div>
                
                {/* Tabs and Filters Section */}
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                    {/* Tabs */}
                    <div className="flex space-x-1 w-full sm:w-auto">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 relative ${
                                    activeTab === tab
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-300 hover:bg-purple-800/30"
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="pollActiveTab"
                                        className="absolute inset-0 bg-gradient-to-r from-[#191B1D] via-purple-600 to-[#191B1D] rounded-lg"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Search and Controls */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:items-center sm:space-x-4">
                        {/* Search */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative flex-1 sm:flex-none"
                        >
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search polls..."
                                className="w-full sm:w-64 bg-[#191B1D] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </motion.div>

                        {/* Sort */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative flex-1 sm:flex-none"
                        >
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500 appearance-none pr-10 transition-colors"
                            >
                                <option value="Recent">Sort by Recent</option>
                                <option value="Votes">Most Votes</option>
                                <option value="Ending">Ending Soon</option>
                                <option value="Reward">Highest Reward</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Results count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 text-sm text-gray-400"
            >
                Showing {filteredAndSortedPolls.length} {activeTab.toLowerCase()}
                {searchQuery && ` matching "${searchQuery}"`}
            </motion.div>

            {/* Polls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <AnimatePresence mode="wait">
                    {filteredAndSortedPolls.length > 0 ? (
                        filteredAndSortedPolls.map((poll, index) => (
                            <motion.div
                                key={`${poll.id}-${activeTab}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-gray-600 transition-all cursor-pointer"
                                style={{
                                    background: `url(${poll.status === "Active" ? poll1 : poll2})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                                onClick={() => {
                                    if (poll.status === "Active") {
                                        navigate(`/polls/${poll.id}`)
                                    } else {
                                        navigate(`/polls/results/${poll.id}`)
                                    }
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3 sm:mb-4">
                                    <h3 className="text-white text-base sm:text-lg font-semibold pr-2">{poll.title}</h3>
                                    <span className={`${poll.status === "Active" ? "bg-purple-600" : "bg-green-600"} text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap`}>
                                        {poll.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">{poll.description}</p>

                                {/* Voting Options */}
                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                    {poll.options.map((option, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                                        >
                                            <div className="flex items-center justify-between mb-1 sm:mb-2">
                                                <span className="text-gray-300 text-xs sm:text-sm">{option.name}</span>
                                                <span className="text-white text-xs sm:text-sm font-medium">{option.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${option.percentage}%` }}
                                                    transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
                                                    className={`${poll.status === "Active" ? option.color : "bg-green-500"} h-1.5 sm:h-2 rounded-full`}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Poll Info */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-0 sm:justify-between text-xs sm:text-sm text-gray-400 mb-4">
                                    <span className="text-white font-semibold">${poll.reward}</span>
                                    <span>Total votes: {poll.totalVotes}</span>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>{poll.status === "Active" ? `Ends in ${poll.endsIn}` : "Ended"}</span>
                                    </div>
                                </div>

                                {/* Vote Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-black hover:bg-gray-700 border border-gray-600 text-white py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (poll.status === "Active") {
                                            navigate(`/polls/${poll.id}`)
                                        } else {
                                            navigate(`/polls/results/${poll.id}`)
                                        }
                                    }}
                                >
                                    {poll.status === "Active" ? `Vote Now • ${poll.totalVotes}` : "View Results"}
                                </motion.button>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12 text-gray-400"
                        >
                            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">No polls found</h3>
                            <p>Try adjusting your search terms or filters</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard?modal=createpoll")}
                className="fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 lg:hidden relative border border-gray-200"
            >
                {/* Coming Soon Badge for Mobile */}
                <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-sm z-20"
                >
                    Soon
                </span>
                <Plus className="w-6 h-6" />
            </motion.button>
        </div>
    )
}

import { useState } from "react"
import { ArrowLeft, Search, Calendar, ArrowUpDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import resultImage from "@/assets/polls/resultImage.png"
import { useNavigate } from "react-router-dom"

interface CompletedPoll {
    id: string
    title: string
    votes: number
    date: string
    selected?: boolean
}

interface PollOption {
    name: string
    votes: number
    percentage: number
    color: string
    imageUrl: string
}

const completedPolls: CompletedPoll[] = [
    {
        id: "1",
        title: "Team Building Activity",
        votes: 55,
        date: "4/17/2025",
        selected: true,
    },
    {
        id: "2",
        title: "New Logo Design",
        votes: 80,
        date: "3/27/2025",
    },
    {
        id: "3",
        title: "Design System Update",
        votes: 116,
        date: "2/22/2025",
    },
    {
        id: "4",
        title: "Annual Conference Location",
        votes: 199,
        date: "1/12/2025",
    },
]

const chartData = [
    {
        name: "Escape Room",
        votes: 700,
        fill: "#06b6d4",
    },
    {
        name: "Adventure Outdoor",
        votes: 502,
        fill: "#8b5cf6",
    },
    {
        name: "Cooking Class",
        votes: 300,
        fill: "#8b5cf6",
    },
]

const optionDetails: PollOption[] = [
    {
        name: "Escape Room",
        votes: 22,
        percentage: 40,
        color: "bg-blue-500",
        imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
        name: "Outdoor Adventure",
        votes: 18,
        percentage: 33,
        color: "bg-blue-500",
        imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
        name: "Cooking Class",
        votes: 15,
        percentage: 27,
        color: "bg-blue-500",
        imageUrl: "/placeholder.svg?height=200&width=300",
    },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 shadow-lg">
                <p className="text-white text-sm font-medium">{`${payload[0].value} Vote`}</p>
            </div>
        )
    }
    return null
}

export default function PollResultsDashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("Recent")
    const [selectedPoll, setSelectedPoll] = useState("1")
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/polls")
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6 lg:mb-8"
            >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg">Back</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 sm:gap-6 lg:gap-8">
                {/* Left Side - Completed Polls */}
                <div className="bg-[#191B1D] rounded-xl sm:rounded-2xl p-4 sm:p-6 h-fit">
                    <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Completed Polls</h2>

                    {/* Search and Sort */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-[#121416] border border-gray-700 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none focus:border-purple-500 appearance-none pr-10"
                            >
                                <option value="Recent">Sort by</option>
                                <option value="Votes">Most Votes</option>
                                <option value="Date">Date</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>

                    {/* Polls List */}
                    <div className="space-y-3 sm:space-y-4">
                        {completedPolls.map((poll) => (
                            <div
                                key={poll.id}
                                onClick={() => setSelectedPoll(poll.id)}
                                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all ${poll.selected || selectedPoll === poll.id
                                    ? "bg-gradient-to-r from-[#5901E8] to-[#191B1D] border border-[#8941FF]"
                                    : "bg-[#191B1D] border border-gray-700 hover:bg-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-sm sm:text-base font-semibold mb-1">{poll.title}</h3>
                                        <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                            <span>{poll.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-white text-sm sm:text-base font-semibold">{poll.votes} votes</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Poll Results */}
                <div className="bg-[#191B1D] rounded-xl sm:rounded-2xl p-4 sm:p-6 h-fit">
                    <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Poll Results</h2>

                    {/* Bar Chart */}
                    <div className="rounded-xl sm:rounded-2xl p-2 sm:p-6 mb-6 sm:mb-8 -mx-2 sm:mx-0">
                        <ResponsiveContainer width="100%" height={250} className="text-xs sm:text-sm">
                            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: "inherit" }} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9CA3AF", fontSize: "inherit" }}
                                    domain={[0, 1000]}
                                    ticks={[0, 50, 100, 500, 1000]}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="votes" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Option Details */}
                    <div>
                        <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Option Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {optionDetails.map((option, index) => (
                                <div key={index} className="bg-[#191B1D] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700">
                                    <div className="flex items-center space-x-4 flex-col">
                                        {/* Image */}
                                        <div className="w-full aspect-video rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={resultImage} alt="Option" className="w-full h-full object-cover" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 mt-3 sm:mt-4 w-full">
                                            <h4 className="text-white text-sm sm:text-base font-semibold mb-2">{option.name}</h4>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 text-xs sm:text-sm">Votes: {option.votes}</span>
                                                <span className="text-white text-xs sm:text-sm font-medium">{option.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                                                <div
                                                    className={`${option.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                                                    style={{ width: `${option.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

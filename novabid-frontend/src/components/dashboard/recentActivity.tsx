import type React from "react"

import { Plus, Diamond, Settings, BarChart3, Clock, Calendar } from "lucide-react"

interface ActivityItem {
    id: string
    icon: React.ReactNode
    title: string
    description: string
    status: "Active" | "Completed" | "Draft"
    timestamp: string
    timestampType: "relative" | "date"
}

const activityItems: ActivityItem[] = [
    {
        id: "1",
        icon: <Plus className="w-5 h-5 text-white" />,
        title: "New Poll Created",
        description: "Product Roadmap Priorities Q3",
        status: "Active",
        timestamp: "3h ago",
        timestampType: "relative",
    },
    {
        id: "2",
        icon: <Diamond className="w-5 h-5 text-white" />,
        title: "Auction Ended",
        description: "Limited Edition NFT #023",
        status: "Completed",
        timestamp: "Aug 03",
        timestampType: "date",
    },
    {
        id: "3",
        icon: <Settings className="w-5 h-5 text-white" />,
        title: "Tokens Claimed",
        description: "Successfully claimed 100 VaultTokens",
        status: "Draft",
        timestamp: "3h ago",
        timestampType: "relative",
    },
    {
        id: "4",
        icon: <BarChart3 className="w-5 h-5 text-white" />,
        title: "Poll Results",
        description: "Community Focus Proposal",
        status: "Completed",
        timestamp: "Aug 03",
        timestampType: "date",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-purple-600 text-white"
        case "Completed":
            return "bg-green-600 text-white"
        case "Draft":
            return "bg-gray-600 text-white"
        default:
            return "bg-gray-600 text-white"
    }
}

const getIconBackground = (index: number) => {
    const colors = ["bg-purple-600", "bg-pink-600", "bg-teal-600", "bg-blue-600"]
    return colors[index % colors.length]
}

export default function RecentActivity() {
    return (
        <div className="bg-[#191B1D] border border-gray-700 rounded-2xl p-4 lg:p-6">
            <div className="flex items-center space-x-2 mb-4 lg:mb-6">
                <Clock className="w-5 h-5 text-gray-400" />
                <h2 className="text-white text-base lg:text-lg font-semibold">Recent Activity</h2>
            </div>

            <div className="space-y-3 lg:space-y-4">
                {activityItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-700 last:border-b-0 gap-2 sm:gap-4"
                    >
                        <div className="flex items-start sm:items-center space-x-3 lg:space-x-4">
                            <div className={`w-8 h-8 lg:w-10 lg:h-10 ${getIconBackground(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                {item.icon}
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-white text-sm lg:text-base font-medium">{item.title}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-xs lg:text-sm">{item.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center text-gray-500 text-xs lg:text-sm ml-11 sm:ml-0">
                            {item.timestampType === "relative" ? (
                                <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                            ) : (
                                <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                            )}
                            <span>{item.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

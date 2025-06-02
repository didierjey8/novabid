import { Plus, Settings, Gavel, BarChart3, Droplets } from "lucide-react"
import card1 from "@/assets/dashboard/card1.png"
import card2 from "@/assets/dashboard/card2.png"
import card3 from "@/assets/dashboard/card3.png"
import card4 from "@/assets/dashboard/card4.png"
import { useNavigate } from "react-router-dom"

export default function DashboardCards() {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Create Poll Card */}
            <div className="border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all cursor-pointer" style={
                {
                    background: `url(${card1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
            } onClick={() => navigate("/dashboard?modal=createpoll")}>
                <div className="w-12 h-12 border-2 border-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Create Poll</h3>
                <p className="text-gray-400 text-sm mb-6">Start a new private voting poll</p>
                <button className="w-full bg-transparent border border-purple-500/50 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-600/20 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>New Poll</span>
                </button>
            </div>

            {/* Claim Tokens Card */}
            <div className="border border-teal-500/30 rounded-2xl p-6 hover:border-teal-400/50 transition-all cursor-pointer" style={
                {
                    background: `url(${card2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
            } onClick={() => navigate("/faucet")}>
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Claim Tokens</h3>
                <p className="text-gray-400 text-sm mb-6">Get free tokens from faucet</p>
                <button className="w-full bg-transparent border border-teal-500/50 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-teal-600/20 transition-all">
                    <Droplets className="w-4 h-4" />
                    <span>Visit Faucet</span>
                </button>
            </div>

            {/* Create Auction Card */}
            <div className="border border-pink-500/30 rounded-2xl p-6 hover:border-pink-400/50 transition-all cursor-pointer" style={
                {
                    background: `url(${card3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
            } onClick={() => navigate("/auctions?modal=createauction")}>
                <div className="w-12 h-12 border-2 border-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Gavel className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Create Auction</h3>
                <p className="text-gray-400 text-sm mb-6">Launch a private auction</p>
                <button className="w-full bg-transparent border border-pink-500/50 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-pink-600/20 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>New Auction</span>
                </button>
            </div>

            {/* View Polls Card */}
            <div className="border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/50 transition-all cursor-pointer" style={
                {
                    background: `url(${card4})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
            } onClick={() => navigate("/polls")}>
                <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">View Polls</h3>
                <p className="text-gray-400 text-sm mb-6">Explore active and past polls</p>
                <button className="w-full bg-transparent border border-blue-500/50 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600/20 transition-all">
                    <BarChart3 className="w-4 h-4" />
                    <span>View Polls</span>
                </button>
            </div>
        </div>
    )
}

import { Send, Download } from "lucide-react"
import balanceIcon from "@/assets/dashboard/balanceicon.png"
import card5 from "@/assets/dashboard/card5.png"
import { useNavigate } from "react-router-dom"

export default function BalanceAndParticipants() {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Private Balance Card */}
            <div className="bg-[#191B1D] border border-gray-700 rounded-2xl p-4 lg:p-6 relative overflow-hidden">
                <h3 className="text-gray-400 text-sm mb-2">Private Balance</h3>
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div>
                        <div className="text-white text-3xl lg:text-4xl font-bold mb-1">1,250.00</div>
                        <div className="text-gray-400 text-sm">VaultToken</div>
                    </div>
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full opacity-80 relative">
                        <img src={balanceIcon} alt="balanceIcon" className="w-full h-full" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3">
                    <button
                        className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-purple-700 transition-all"
                        onClick={() => {
                            navigate("/dashboard?modal=sendvaultoken")
                        }}
                    >
                        <Send className="w-4 h-4" />
                        <span>Send tokens</span>
                    </button>
                    <button
                        className="flex-1 bg-transparent border border-gray-600 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-700/50 transition-all"
                        onClick={() => {
                            navigate("/dashboard?modal=receivevaultoken")
                        }}
                    >
                        <Download className="w-4 h-4" />
                        <span>Receive tokens</span>
                    </button>
                </div>
            </div>

            {/* Active Participants Card */}
            <div className="bg-[#191B1D] border border-gray-700 rounded-2xl p-4 lg:p-6" style={{
                background: `url(${card5})`,
                backgroundSize: "110% 110%",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-white text-base lg:text-lg font-semibold">A</span>
                        </div>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-white text-base lg:text-lg font-semibold">B</span>
                        </div>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-white text-base lg:text-lg font-semibold">C</span>
                        </div>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-gray-800 flex items-center justify-center hidden sm:flex">
                            <span className="text-white text-base lg:text-lg font-semibold">D</span>
                        </div>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">+99</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-2">Active Participants</h3>
                <div className="flex items-center space-x-2">
                    <div className="text-white text-2xl lg:text-3xl font-bold">143</div>
                    <div className="text-green-400 text-sm font-medium">+12%</div>
                </div>
            </div>
        </div>
    )
}

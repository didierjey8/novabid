import { useState } from "react"
import { ArrowLeft, ThumbsUp, Calendar, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import poll1 from "@/assets/polls/voteImage.png"
interface VotingOption {
    id: string
    title: string
    description: string
    imageUrl: string
    selected: boolean
}

export default function PollVotingPage() {
    const [selectedOption, setSelectedOption] = useState<string>("")
    const navigate = useNavigate()

    const votingOptions: VotingOption[] = [
        {
            id: "1",
            title: "Decentralized Autonomous Organization (DAO)",
            description: "A fully decentralized structure where all decisions are made through token-weighted voting.",
            imageUrl: poll1,
            selected: selectedOption === "1",
        },
        {
            id: "2",
            title: "Decentralized Autonomous Organization (DAO)",
            description: "A fully decentralized structure where all decisions are made through token-weighted voting.",
            imageUrl: poll1,
            selected: selectedOption === "2",
        },
        {
            id: "3",
            title: "Decentralized Autonomous Organization (DAO)",
            description: "A fully decentralized structure where all decisions are made through token-weighted voting.",
            imageUrl: poll1,
            selected: selectedOption === "3",
        },
    ]

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId)
    }

    const handleBack = () => {
        navigate("/polls")
    }

    const handleVote = () => {
        console.log("Vote submitted for option:", selectedOption)
        navigate("/polls/1?modal=voteSuccess")
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6 lg:mb-8"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg">Back</span>
                </button>

                {/* Title and Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">Product Roadmap Priorities</h1>
                    <span className="bg-purple-600 text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full w-fit">Active</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-base sm:text-lg lg:text-xl">Help us decide which features to focus on for the next quarter.</p>
            </div>

            {/* Voting Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
                {votingOptions.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${option.selected ? "ring-2 sm:ring-4 ring-purple-500" : "border border-gray-700 hover:border-gray-600"
                            }`}
                    >
                        {/* Content */}
                        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                            {/* Title */}
                            <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 leading-tight pr-6 sm:pr-8 flex items-start gap-2">
                                <div className="z-20">
                                    <div
                                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all ${option.selected
                                            ? "bg-[#5901E8] border-[#5901E8]"
                                            : "border-gray-400 bg-transparent hover:border-gray-300"
                                            }`}
                                    >
                                        {option.selected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                    </div>
                                </div>
                                {option.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{option.description}</p>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                            <img src={option.imageUrl} alt={option.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Voting Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <button
                    onClick={handleVote}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 bg-[#5901E8] hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                    <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Vote Privately</span>
                </button>

                <div className="flex items-center space-x-2 text-gray-400 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Voting ends in <span className="text-white">4 days</span></span>
                </div>
            </div>
        </div>
    )
}

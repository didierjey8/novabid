import { ThumbsUp, Clock } from "lucide-react"
import { Modal } from "../common"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { useEffect, useState } from "react"
import confettiSound from "@/assets/sonidos/confetti.mp3"

interface VoteSuccessModalProps {
    isOpen: boolean
    onClose: () => void
    resultsAvailableIn?: string
}

export default function VoteSuccessModal({ isOpen, onClose, resultsAvailableIn = "2 days" }: VoteSuccessModalProps) {
    const { width, height } = useWindowSize()
    const [isConfettiActive, setIsConfettiActive] = useState(false)
    useEffect(() => {
        if (isOpen) {
            setIsConfettiActive(true)
        } else {
            setIsConfettiActive(false)
        }
    }, [isOpen])
    return (
        <>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                maxWidth="md"
                height="fit"
                showCloseButton={false}
                className="text-center"
            >
                {/* Success Icon */}
                <div className="w-16 h-16 bg-transparent border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                </div>

                {/* Title */}
                <h2 className="text-white text-2xl font-bold mb-4">Vote Submitted Successfully</h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    Your vote has been privately recorded and cannot be changed.
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-[#5901E8] to-[#5901E8] hover:from-[#5901E8] hover:to-[#5901E8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mb-6"
                >
                    Close
                </button>

                {/* Additional Info */}
                <div className="space-y-3">
                    <p className="text-gray-500 text-xs leading-relaxed">
                        Thank you for participating in this poll. Results will be available when the poll ends.
                    </p>

                    <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
                        <Clock className="w-4 h-4" />
                        <span>Results available in <span className="text-white">{resultsAvailableIn}</span></span>
                    </div>
                </div>
            </Modal>
            <div className="absolute top-0 left-0 w-full z-50">
                {isConfettiActive && (
                    <Confetti
                        width={width}
                        height={height + 100}
                        numberOfPieces={100}
                    />
                )}
                {isConfettiActive && (
                    <audio autoPlay >
                        <source src={confettiSound} type="audio/mpeg" />
                    </audio>
                )}
            </div>
        </>
    )
}
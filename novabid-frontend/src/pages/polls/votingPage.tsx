import PollVotingPage from "@/components/polls/pollVotingComponent";
import VoteSuccessModal from "@/components/polls/voteSubmitted";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
const VotingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const modal = searchParams.get("modal")
    const navigate = useNavigate()
    useEffect(() => {
        if (modal === "voteSuccess") {
            setIsModalOpen(true)
        }
    }, [modal])

    return (
        <div>
            <PollVotingPage />
            <VoteSuccessModal isOpen={isModalOpen} onClose={() => {
                navigate("/polls/1")
                setIsModalOpen(false)
            }} />
        </div>
    )
}

export default VotingPage;
import type React from "react"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Modal } from "../common"

interface SendVaulTokenModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SendVaulTokenModal({ isOpen, onClose }: SendVaulTokenModalProps) {
    const [recipientAddress, setRecipientAddress] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Send Vault Token"
            height="fit"
            maxWidth="sm"
        >
            {/* Recipient Address */}
            <div className="mb-4">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Recipient Address</label>
                <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Enter your recipient address"
                    className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
            </div>

            {/* Amount */}
            <div className="mb-8">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Amount</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter your amount"
                        className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors pl-10"
                    />
                </div>
            </div>

            {/* Send Tokens Button */}
            <button className="w-full bg-[#5901E8] hover:bg-[#5901E8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                Send Tokens
            </button>
        </Modal>
    )
}
import type React from "react"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Modal } from "../common"
import qrCodeLine from "@/assets/dashboard/qr-code-line.png"

interface ReceiveTokensQRModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ReceiveTokensQRModal({ isOpen, onClose }: ReceiveTokensQRModalProps) {
    const [recipientAddress, setRecipientAddress] = useState("vault1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h...")

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Receive Tokens QR Code"
            height="fit"
        >
            {/* QR Code Display */}
            <div className="flex items-center justify-center mb-6 bg-[#191B1D] border border-gray-700 rounded-lg p-4 h-[300px] w-full">
                <img src={qrCodeLine} alt="QR Code" className="w-full h-full object-contain" />
            </div>

            {/* Recipient Address */}
            <div className="mb-4">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Recipient Address</label>
                <div className="flex items-center justify-between bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors">
                    <input
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="vault1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h..."
                        className="w-full bg-transparent text-white outline-none"
                        readOnly
                    />
                    <button
                        onClick={() => navigator.clipboard.writeText(recipientAddress)}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 ml-2"
                    >
                        <Copy className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}
import { useState, useEffect } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"

import { useWriteContract, useReadContract } from "wagmi";

import { auctionManagerAbi, auctionManagerAddress } from "@/config/AuctionManager.config";

import { useEERCContext } from '@/contexts/EERCContext'
import { parseEther, keccak256, encodePacked } from 'viem'

interface Auction {
  id: bigint;
  title: string;
  description: string;
  imageUrl: string;
  owner: string;
  startingBid: bigint;
  highestBid: bigint;
  highestBidder: string;
  endTime: bigint;
  status: number;
}

export default function AuctionDetails() {
    const [bidAmount, setBidAmount] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    
    const { encryptedBalance } = useEERCContext();

    const location = useLocation();
    const auctionData: Auction = location.state?.auction;

    const { data: isBided, isPending: isBiding, error: errorBiding, writeContract } = useWriteContract();

    const { data: auctionBiddersBiders } = useReadContract({
        address: auctionManagerAddress, 
        abi: auctionManagerAbi, 
        functionName: 'auctionBidders',
        args: []
    });

    console.log("auctionBiddersBiders");
    console.log(auctionBiddersBiders);

    const handleBack = () => {
        navigate("/auctions")
    }

    const handlePlaceBid = async () => {
        if(Number(bidAmount)<Number(auctionData.startingBid)) return;
        
        const value = BigInt(bidAmount);
        const salt = 'abc123';
        const packed = encodePacked(['uint256', 'string'], [value, salt]);
        const hashedBid = keccak256(packed);

        setLoading(true);

        const result = await encryptedBalance.privateTransfer("0x3741E1960daC952922f8dDcB4FDA685d66B04ebf",parseEther("1"));
        
        if(result?.transactionHash){
            writeContract({
                address: auctionManagerAddress,
                abi: auctionManagerAbi,
                functionName: 'placeBid',
                args: [
                    auctionData.id,
                    hashedBid
                ],
            });
        }
    }

    useEffect(()=>{
        if(isBided){
            setLoading(false);
            setBidAmount("");
            navigate("/auctions");
        }
        if(errorBiding){
            setLoading(false);
        }
    },[isBided, errorBiding]);

    return (
        <div className="bg-black min-h-screen p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
                <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-4 sm:mb-6"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg">Back</span>
                </button>

                <h1 className="text-white text-2xl sm:text-3xl font-bold">Auction Details</h1>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Left Side - Image */}
                <div className="relative">
                    <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                        <img
                            src={auctionData.imageUrl}
                            alt={auctionData.title}
                            className="w-full h-full object-cover max-h-[420px]"
                        />
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Header Info */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 w-full">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">{auctionData.title}</h2>
                                <span className={`bg-blue-600 text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full ${auctionData.status === 0 ? "bg-blue-600" : "bg-green-600"
                                    }`}>
                                    {auctionData.status === 0 ? "Active" : "Completed"}
                                </span>
                            </div>
                        </div>

                        {/*<div className="flex items-center justify-between space-x-4 sm:space-x-6 mb-4 sm:mb-6 w-full">
                            <div>
                                <span className="text-gray-400 text-xs sm:text-sm">Current Bid:</span>
                                <span className="text-white text-xl sm:text-2xl font-bold ml-1">${auctionData.currentBid}</span>
                            </div>
                            <div>
                                <span className="text-white text-sm sm:text-base font-semibold">{auctionData.totalBids} bids</span>
                                <span className="text-gray-400 text-sm sm:text-base ml-1">so far</span>
                            </div>
                        </div>*/}
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">{auctionData.description}</p>
                    </div>

                    {/* Bidding Section */}
                    <div className="bg-[#191B1D] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-start sm:space-x-20 ${auctionData.status === 0 ? "visible" : "hidden"
                            }`}>
                            <h3 className="text-white text-lg sm:text-xl font-semibold">Place a Bid</h3>
                            <div>
                                <span className="text-gray-400 text-xs sm:text-sm">Minimum bid: </span>
                                <span className="text-white text-sm sm:text-base font-semibold">${Number(auctionData.startingBid).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-0">
                            <div className={`flex-1 ${auctionData.status === 0 ? "visible" : "hidden"}`}>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        min={Number(auctionData.startingBid)}
                                        disabled={loading}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        placeholder="Enter bid amount"
                                        className="w-full bg-[#191B1D] border border-gray-700 rounded-lg sm:rounded-xl pl-8 pr-4 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className={`flex-1 ${auctionData.status === 0 ? "hidden" : "visible"}`}>
                                <p className="text-white text-base sm:text-lg font-semibold mt-4 text-red-500">This auction has ended</p>
                            </div>
                            {loading&&(<motion.div 
                                key="loading"
                                className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            />)}
                            {!loading&&(<button
                                onClick={handlePlaceBid}
                                className="w-full sm:w-auto bg-[#5901E8] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap"
                            >
                                Place Private Bid
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

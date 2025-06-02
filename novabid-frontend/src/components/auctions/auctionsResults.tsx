import { CalendarClock } from "lucide-react";
import { auctionsResultsData } from "./data/auctions";
import auctionsDetails from '@assets/auctions/details/auctions-details.png';
import card1 from "@/assets/auctions/results/card-1.png"
import customIcon from '@assets/auctions/results/custom-icon.png';

import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { auctionManagerAbi, auctionManagerAddress } from "@/config/AuctionManager.config";


const AuctionsResults = () => {

  const { data: auctionsResultsData, refetch: refetchResultsData } = useReadContract({
    address: auctionManagerAddress, 
    abi: auctionManagerAbi, 
    functionName: 'getAllAuctionsWithParticipation',
    args: []
  });

  return (
    <article className="w-full py-6">
      <h3 className="text-white text-2xl font-medium">Auction Result</h3>
      <p className="text-[#525866] text-sm font-normal mt-2">Rare Vinyl Record Collection</p>

      <section className="flex justify-center items-center md:py-14 py-8 w-full">
        {auctionsResultsData && (
          <div className="relative max-w-[560px] w-full h-[520px] p-[1px] rounded-2xl cursor-pointer group text-center">
            <div
              className="flex flex-col justify-center items-center rounded-[15px] p-4 hover:border-purple-400/50 transition-all text-center"
              style={{
                background: `url(${card1}) center/cover no-repeat`,
                position: "relative",
                zIndex: 10,
              }}
            >
              <img src={customIcon} alt="" className="mt-4 mb-2" />
              <h3 className="text-white text-2xl font-medium">You won this auction!</h3>
              <div className="flex md:flex-row flex-col items-center justify-between w-full mt-4 mb-9 px-14 text-[#99A0AE] text-sm font-normal">
                <p className="md:mb-0 mb-4">Current Bid: $400</p>
                <span className="flex items-center gap-2">
                  <CalendarClock />
                  <p>Ended on May 15, 2025 at 04:30 PM</p>
                </span>
              </div>
              <div className="relative inline-block p-[1px] rounded-lg w-full max-w-[428px] mb-9">
                <button
                  className="bg-[#042011] w-full text-white text-sm px-6 py-2 rounded-lg z-10 relative"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  Item claimed
                </button>
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, #FFFFFF, #87749900)',
                  }}
                />
              </div>
              <img
                src={auctionsDetails}
                alt={auctionsResultsData.title}
                className="w-full md:h-[240px] rounded-lg object-cover"
              />
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, #06E0616B, #06E06100, #06E06100)",
              }}
            ></div>
          </div>
        )}
      </section>
    </article>
  );

}

export default AuctionsResults;
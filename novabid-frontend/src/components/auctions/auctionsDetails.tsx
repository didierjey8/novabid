import auctionsDetails from '@assets/auctions/details/auctions-details.png';
import { auctionsDetailsData } from './data/auctions';
import { Eye } from 'lucide-react';

const AuctionsDetails = () => {
	return (
		<article className="w-full py-6">
			<h3 className="text-white text-lg font-medium">Auction Details</h3>

			<section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 md:p-14">
				<img
					src={auctionsDetails}
					alt={auctionsDetailsData.title}
					className="w-full h-auto object-cover"
				/>

				<article>
					{auctionsDetailsData && (
						<div className="flex flex-col gap-6 h-full lg:ms-6 pb-6">
							<div>
								<div className="flex items-center gap-2 pb-4">
									<h2 className="text-white text-2xl font-medium">{auctionsDetailsData.title}</h2>
									<p className="text-white text-[12px] bg-[#1FC16B] px-[8px] py-[2px] rounded-full">{auctionsDetailsData.status}</p>
								</div>
								<div className="flex items-center justify-between text-[#99A0AE] text-base font-medium border-b border-[#FFFFFF1F] pb-4">
									<p>Current Bid: <span className="text-white">{auctionsDetailsData.currentBid}</span></p>
									<p><span className="text-white">{auctionsDetailsData.count} bids</span> so far</p>
								</div>
								<p className="text-gray-400 text-sm mt-2">{auctionsDetailsData.description}</p>
							</div>
							<div className="flex items-end justify-between h-full">
								<button
									className="text-[#FB3748] text-sm font-medium"
								>
									This auction has ended
								</button>
								<button
									className="flex justify-center items-center gap- bg-[#5901E8] text-white text-sm font-medium px-14 py-[10px] rounded-lg hover:bg-purple-800 transition-colors duration-300"
								>
									<Eye />
									View Auction Result
								</button>
							</div>
						</div>
					)}
				</article>
			</section>
		</article>
	);
};

export default AuctionsDetails;

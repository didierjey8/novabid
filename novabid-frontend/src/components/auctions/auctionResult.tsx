import { Crown } from 'lucide-react';
import { Modal } from '../common';
import item from '@/assets/auctions/image.png';
import dashboard from '@/assets/polls/cardsBg2.png';

interface AuctionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultsAvailableIn?: string;
}

export default function AuctionResultModal({ isOpen, onClose, resultsAvailableIn = "2 days" }: AuctionResultModalProps) {

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
        <div
          className="bg-[#121212] border border-gray-700 rounded-xl sm:rounded-2xl w-full max-w-[340px] sm:max-w-md p-4 sm:p-6 lg:p-8 text-center relative"
          style={{
            backgroundImage: `url(${dashboard})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Success Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-transparent border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>

          {/* Title */}
          <h2 className='text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>You won this auction!</h2>

          {/* Description */}
          <p className='text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed flex flex-col gap-1.5 sm:gap-2'>
            Current Bid: <span className='text-white font-semibold'>$400.00</span>
            <span className='text-gray-500'>Ended on May 15, 2025 at 04:30 PM</span>
          </p>

          {/* Close Button */}
          <button onClick={onClose} className='w-full bg-gradient-to-r from-[#042011] to-[#042011] hover:from-[#042011] hover:to-[#042011] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 mb-4 sm:mb-6 border-2 border-gray-700 text-sm sm:text-base'>
            Item claimed
          </button>

          {/* Additional Info */}
          <div className="space-y-3 rounded-lg sm:rounded-xl overflow-hidden">
            <img
              src={item}
              alt="item"
              className="w-full h-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className='text-white text-2xl font-bold mb-4'>You won this auction!</h2>

      {/* Description */}
      <div className='text-gray-400 text-sm mb-8 leading-relaxed flex flex-col gap-2'>
        <span>Current Bid: $400.00</span>
        <span className='text-gray-500'>Ended on May 15, 2025 at 04:30 PM</span>
      </div>

      {/* Close Button */}
      <button onClick={onClose} className='w-full bg-gradient-to-r from-[#042011] to-[#042011] hover:from-[#042011] hover:to-[#042011] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mb-6 border-2 border-gray-700'>
        Item claimed
      </button>

      {/* Additional Info */}
      <div className='space-y-3'>
        <img src={item} alt='item' className='w-full h-full object-cover rounded-lg' />
      </div>
    </Modal>
  );
}

import { CircleDollarSign, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

const formatTimeParts = (seconds: number) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return { h, m, s };
};

const FaucetClaimAvailable = () => {
  const [isClaimed, setIsClaimed] = useState(true);
  const [remainingSeconds, setRemainingSeconds] = useState(24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { h, m, s } = formatTimeParts(remainingSeconds);

  return (
    <>
      {isClaimed ? (
        <>
          <p className="text-center text-[40px] font-semibold" style={{ userSelect: "none" }}>
            <span className="text-white">{h}</span>
            <span className="text-white">:</span>
            <span className="text-white">{m}</span>
            <span className="text-white">:</span>
            <span className="text-[#99A0AE]">{s}</span>
          </p>
          <button
            disabled
            className="flex justify-center items-center w-full mt-4 md:mb-10 mb-12 gap-2 bg-[#1C0345] text-[#BE99F9] text-sm font-medium px-14 py-[10px] rounded-lg"
          >
            <Clock3 />
            Wait for Next Claim
          </button>
        </>
      ) : (
        <button
          className="flex justify-center items-center w-full mt-14 md:mb-32 mb-12 gap-2 bg-[#5901E8] text-white text-sm font-medium px-14 py-[10px] rounded-lg hover:bg-purple-800 transition-colors duration-300"
        >
          <CircleDollarSign />
          View Auction Result
        </button>
      )}
    </>
  );
};

export default FaucetClaimAvailable;
import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import card1 from "@/assets/faucet/card-1.png";
import customIcon from "@assets/faucet/customIcon.png";
import { ShieldCheck } from "lucide-react";
import {getExplorerUrl} from '@/lib/utils'
import {useEERCContext} from '@/contexts/EERCContext'
import { formatUnits } from 'viem';
import { novabidTokenAbi, novabidTokenAddress } from "@/config/novabidToken.config";

const FaucetClaims = () => {
  const { address } = useAccount();
  const { chainId } = useEERCContext();
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState([0,0,0]);
  
  const isMainnet = chainId === 43114 // Avalanche mainnet chain ID

  const { data: remainingTime, refetch: refetchTime } = useReadContract({
    address: novabidTokenAddress, 
    abi: novabidTokenAbi, 
    functionName: 'timeUntilNextMint',
    args: [address]
  });

  useEffect(()=>{
    if(address) refetchTime();
  },[address]);
  
  const { data: mintAmountData } = useReadContract({
    address: novabidTokenAddress, 
    abi: novabidTokenAbi, 
    functionName: 'mintAmount'
  });
  
  const { data: dataSymbol } = useReadContract({
    address: novabidTokenAddress, 
    abi: novabidTokenAbi, 
    functionName: 'symbol'
  });

  const { data: dataName } = useReadContract({
    address: novabidTokenAddress, 
    abi: novabidTokenAbi, 
    functionName: 'name'
  });
  
  const [messaggeAlert, setMessaggeAlert] = useState<string>(`${dataName?.toString() ?? ''} are public by default. Go to wallet to deposit eERC20 and enable all options.`);

  const { data: dataDecimals } = useReadContract({
    address: novabidTokenAddress, 
    abi: novabidTokenAbi, 
    functionName: 'decimals'
  });
  
  const { data: isClaimed, isPending: isClaiming, writeContract } = useWriteContract();
  
  // Countdown effect
  useEffect(() => {
    if (!remainingTime) return;
    const seconds = Number(remainingTime);
    setRemainingSeconds(seconds);

    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          refetchTime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      setCountdown([0,0,0]);
    } else {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      setCountdown([hours,minutes,seconds]);
    }
  }, [remainingSeconds]);

  const claimToken = ()=>{
    writeContract({
      address: novabidTokenAddress,
      abi: novabidTokenAbi,
      functionName: 'mint',
      args: [],
    });
  }
  
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setMessaggeAlert("Token address copied to clipboard!");

    setTimeout(()=>{
      setMessaggeAlert(`${dataName?.toString() ?? ''} are public by default. Go to wallet to deposit eERC20 and enable all options.`);
    },5000);
  };

  return (
    <article className="w-full">
      <h2 className="text-white text-2xl font-medium mt-6">Token Faucet</h2>
      <p className="text-[#525866] text-sm font-normal">
        Claim free {dataName?.toString() ?? ''} for platform participation
      </p>

      <section className="flex justify-center items-center md:py-12 py-8 w-full">
        <div className="relative max-w-[560px] w-full h-[520px] p-[1px] rounded-2xl group text-center">
          <div
            className="flex flex-col justify-center items-start rounded-[15px] p-7 hover:border-purple-400/50 transition-all text-center"
            style={{
              background: `url(${card1}) center/cover no-repeat`,
              position: "relative",
              zIndex: 10,
            }}
          >
            <h2 className="text-white text-2xl font-medium mb-2">Claim NovaBid Tokens</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-[#99A0AE] break-all">
                Token Address: {novabidTokenAddress}
              </span>
              <button
                onClick={() => copyToClipboard(novabidTokenAddress)}
                className="text-purple-400 text-xs hover:underline"
              >
                Copy
              </button>
            </div>
            <p className="text-[#99A0AE] text-sm font-normal">
              Claim tokens once every 24 hours
            </p>

            <div className="flex flex-col justify-center items-center w-full gap-2 mt-5">
              <img src={customIcon} alt="" />
              <p className="text-white text-lg font-medium">
                {mintAmountData ? `${formatUnits(mintAmountData as bigint, (Number(dataDecimals)??18))} ${dataSymbol} Available` : "Loading..."}
              </p>

              {remainingSeconds <= 0 ? (
                <button
                  disabled={isClaiming}
                  onClick={() => claimToken()}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg"
                >
                  {isClaiming ? "Claiming..." : "Claim Now"}
                </button>
              ) : (<>
                <p className="text-center text-[40px] font-semibold" style={{ userSelect: "none" }}>
                  <span className="text-white">{countdown[0]}</span>
                  <span className="text-white">:</span>
                  <span className="text-white">{countdown[1]}</span>
                  <span className="text-white">:</span>
                  <span className="text-[#99A0AE]">{countdown[2]}</span>
                </p>
                <button
                  disabled
                  className="flex justify-center items-center w-full mt-4 md:mb-10 mb-12 gap-2 bg-[#1C0345] text-[#BE99F9] text-sm font-medium px-14 py-[10px] rounded-lg"
                >
                  <Clock3 />
                  Wait for Next Claim
                </button>
              </>)}

              {isClaimed && (<>
                <div className="mt-2">
                    <a
                        href={getExplorerUrl(isClaimed, isMainnet)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 underline text-sm text-gray-400"
                    >
                        View transaction
                    </a>
                </div>
                <p className="text-green-400 text-sm mt-2">Claim successful! 🎉</p>
              </>)}

              <span className="flex justify-center items-center px-5 py-3 rounded-[10px] bg-[#121416] text-[#CACFD8] text-xs  mt-5">
                <ShieldCheck className="text-[#9D61FF] me-2" />
                <p>
                  {messaggeAlert}
                </p>
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF6B, #FFFFFF00, #FFFFFF00)",
            }}
          ></div>
        </div>
      </section>
    </article>
  );
};

export default FaucetClaims;

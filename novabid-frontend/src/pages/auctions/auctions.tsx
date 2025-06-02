import AuctionResultModal from "@/components/auctions/auctionResult";
import AuctionsComponent from "@/components/auctions/AuctionsComponent";
import CreateAuctionModal from "@/components/auctions/createAuctionModal";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useEERCContext } from '@/contexts/EERCContext';
import RegisterEERC from "@/components/wallet/RegisterEERC";
import TokenOperationsEERC from "@/components/wallet/TokenOperationsEERC";
import { useNavigate, useSearchParams } from "react-router-dom";
import {standardWatchOptions} from '@/lib/wagmiConfig'
import {formatBalance} from '@/lib/utils'

const Auctions = () => {
    const {address} = useAccount();
    const { encryptedBalance, tokenAddress, eerc } = useEERCContext();
    const [isCreateAuctionModalOpen, setIsCreateAuctionModalOpen] = useState(false);
    const [isAuctionResultModalOpen, setIsAuctionResultModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const modal = searchParams.get("modal")

    useEffect(() => {
        if (modal === "createauction") {
            setIsCreateAuctionModalOpen(true)
        }
        if (modal === "auctionresult") {
            setIsAuctionResultModalOpen(true)
        }
    }, [modal])
    
    const {data: tokenBalanceData, refetch: refetchBalance} = useBalance({
        address,
        token: tokenAddress as `0x${string}`,
        ...standardWatchOptions,
        query: {
            enabled: !!address && !!tokenAddress
        }
    });
        
    if(!eerc.isRegistered||(!eerc.isDecryptionKeySet&&Number(formatBalance(encryptedBalance.decryptedBalance))<=0)){
        return (<RegisterEERC />);
    }
    
    if(Number(formatBalance(encryptedBalance.decryptedBalance))<=0){
        return (<div className="p-3 sm:p-6 lg:p-8 max-w-full overflow-hidden">
            <TokenOperationsEERC />
        </div>);
    }

    return <div className="flex flex-col gap-4">
        <AuctionsComponent tokenBalanceData={tokenBalanceData} encryptedBalance={encryptedBalance} />
        <CreateAuctionModal isOpen={isCreateAuctionModalOpen} onClose={() => {
            setIsCreateAuctionModalOpen(false)
            navigate("/auctions")
        }} />
        <AuctionResultModal isOpen={isAuctionResultModalOpen} onClose={() => {
            setIsAuctionResultModalOpen(false)
            navigate("/auctions")
        }} />
    </div>;
};

export default Auctions;


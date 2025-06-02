import { useEERCContext } from '@/contexts/EERCContext';
import RegisterEERC from "@/components/wallet/RegisterEERC";
import TokenOperationsEERC from "@/components/wallet/TokenOperationsEERC";

const Wallet = () => {
    const {eerc} = useEERCContext();
    
    if(!eerc.isRegistered||!eerc.isDecryptionKeySet){
        return (<RegisterEERC />);
    }

    return (
        <div className="p-3 sm:p-6 lg:p-8 max-w-full overflow-hidden">
            <TokenOperationsEERC />
        </div>
    )
}

export default Wallet;
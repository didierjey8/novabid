import { Plus, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"
import avalancheIcon from "@/assets/dashboard/avalanche.png"
import eerc from "@/assets/dashboard/erc.png"
import logo from "@/assets/logo.png"

import { useAccount } from 'wagmi'
 
import { createPublicClient, createWalletClient, http, parseEther, custom } from 'viem'
import { avalanche, avalancheFuji } from 'viem/chains'

import { useEERC } from '@avalabs/ac-eerc-sdk'
import { useEffect, useMemo } from "react"

const Header = ({ onClick, }: { onClick: () => void, }) => {
    const navigate = useNavigate()
    const currentPath = window.location.pathname;
    const isPollsPath = currentPath.startsWith('/polls');
    const isAuctionsPath = currentPath.startsWith('/auctions');
    
    const { address: accountAddress } = useAccount();

    //FUJI: STANDALONE: 0x00B437a26f9b854c87Fb49e1FA389874E094e479 / 0x4F37d196f5DE7E69016B59b2Df66b0086149c5c5 - CONVERTER: 0x95E8c1FE7B4a4e4928779877D334Ed72Fa4eE2A9
    //MAINNET: STANDALONE: 0xD60b92452Dd4759A2a543E6c19F5770BC2CC6293
    const contractAddress = '0x00B437a26f9b854c87Fb49e1FA389874E094e479';
    const decryptionKey = "";

    const publicClient = useMemo(() => {
        return createPublicClient({
            chain: avalancheFuji,
            transport: http(),
        })
    }, [])

    const walletClient = useMemo(() => {
        if (accountAddress){
            return createWalletClient({
                account: accountAddress,
                chain: avalancheFuji,
                transport: custom((window as any).ethereum)
            })
        }
    }, [accountAddress])

    const {
        isInitialized,
        isRegistered,
        isConverter,
        publicKey,
        auditorPublicKey,
        name,
        symbol,
        owner,
        shouldGenerateDecryptionKey,
        areYouAuditor,
        hasBeenAuditor,
        
        // actions
        register,
        generateDecryptionKey,
        auditorDecrypt,
        isAddressRegistered,
        setContractAuditorPublicKey,
        useEncryptedBalance,
    } = useEERC(
        publicClient,
        walletClient,
        contractAddress,
        { 
            transferURL: '/src/config/buildEERC/transfer/transfer.wasm', 
            multiWasmURL: '/src/config/buildEERC/registration/registration.wasm' 
        },
        {
            register: {
                wasm: '/src/config/buildEERC/registration/registration.wasm',
                zkey: '/src/config/buildEERC/registration/circuit_final.zkey'
            },
            transfer: {
                wasm: '/src/config/buildEERC/transfer/transfer.wasm',
                zkey: '/src/config/buildEERC/transfer/transfer.zkey'
            },
            mint: {
                wasm: '/src/config/buildEERC/mint/mint.wasm',
                zkey: '/src/config/buildEERC/mint/mint.zkey'
            },
            withdraw: {
                wasm: '/src/config/buildEERC/withdraw/withdraw.wasm',
                zkey: '/src/config/buildEERC/withdraw/circuit_final.zkey'
            },
            burn: {
                wasm: '/src/config/buildEERC/burn/burn.wasm',
                zkey: '/src/config/buildEERC/burn/burn.zkey'
            }
        },
        decryptionKey
    );

    const {
        decryptedBalance,
        encryptedBalance,
        decimals,
        // actions
        deposit,
        privateMint,
        privateBurn,
        privateTransfer,
        refetchBalance
    } = useEncryptedBalance()
    //FUJI: TOKEN CONVERTER: 0x34eC13444Dcc5558F68273187175d97644811861

    const execMint = async ()=>{
        if(accountAddress){
            const amount: bigint = BigInt(1);
            try {

                /*const _privateTransfer = await privateTransfer("0x2479A986d30580759FA47595f5437D2b0A28b478",amount);
                
                console.log("_privateTransfer");
                console.log(_privateTransfer);
                
                const _deposit = await deposit(amount);
                
                console.log("deposit");
                console.log(_deposit);
                
                
                console.log("symbol");
                console.log(symbol);

                const _generateDecryptionKey = await generateDecryptionKey();
                console.log("_generateDecryptionKey");
                console.log(_generateDecryptionKey);*/

                const _isAddressRegistered = await isAddressRegistered(accountAddress);
                console.log("areYouAuditor");
                console.log(areYouAuditor);

                console.log("_isAddressRegistered");
                console.log(_isAddressRegistered.isRegistered);

                if(!_isAddressRegistered.isRegistered){
                    const _isAddressRegistered =  await register();
                    console.log("_isAddressRegistered");
                    console.log(_isAddressRegistered);
                }

                const txHash = await privateMint(accountAddress, amount);
                console.log('Mint transaction hash:', txHash);
            } catch (err) {
                console.error('Mint failed:', err);
            }
        }
    }

    useEffect(()=>{
        if(accountAddress&&isInitialized){
            console.log("isInitialized");
            console.log(isInitialized);
            console.log("owner");
            console.log(owner);
            console.log("isConverter");
            console.log(isConverter,accountAddress);
            console.log("encryptedBalance");
            console.log(encryptedBalance,decryptedBalance,decimals);
        } 
    },[encryptedBalance,isInitialized]);

    return (
        <>
            {/* Versión Móvil */}
            <div className="lg:hidden flex flex-col bg-[#121416] border-b border-gray-700">
                <div className="flex items-center justify-between px-6 py-4 fixed top-0 left-0 right-0 z-30 bg-[#121416] border-b border-gray-700 ">
                    <div className="flex items-center space-x-3">

                        <img src={logo} alt="logo" className="w-10 h-10" />
                        <div className="flex flex-col">
                            <span className="text-2xl text-white font-semibold">NovaBid</span>
                            <span className="text-[15px] text-gray-400">The future of private bid</span>
                        </div>
                    </div>

                    {/* <div className="flex items-center space-x-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div> */}
                </div>

                <div className="px-6 pt-8 pb-6 mt-[60px]">
                    <h1 className="text-3xl text-white font-semibold mb-2">
                        Good evening, Alex
                    </h1>
                    <p className="text-gray-500">
                        Welcome to your private governance dashboard 👋
                    </p>
                    {isPollsPath && (
                        <button
                            onClick={() => navigate("/dashboard?modal=createpoll")}
                            className="w-full mt-6 bg-[#5901E8] hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center space-x-2 font-medium transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Poll</span>
                        </button>
                    )}
                    {isAuctionsPath && (
                        <button
                            onClick={() => navigate("/auctions?modal=createauction")}
                            className="w-full mt-6 bg-[#5901E8] hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center space-x-2 font-medium transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Auction</span>
                        </button>
                    )}
                </div>
                {/* Mobile Header */}
                <div className="lg:hidden p-4 flex items-center justify-between fixed top-0 right-0 bg-[#121416] z-[51]">
                    <button
                        onClick={onClick}
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Versión Desktop */}
            <header className="hidden lg:block bg-[#191B1D] px-8 py-[22px] border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-white mb-1">Good evening, Alex</h1>
                        <p className="text-gray-400 flex items-center">
                            Welcome to your private governance dashboard
                            <span className="ml-2 text-purple-400">💜</span>
                        </p>
                    </div>
                    {/* Footer */}
                    <div className="bg-[#191B1D]">
                        <div className="text-sm text-gray-500">Powered by</div>
                        <div className="flex items-center space-x-4 justify-between px-3">
                            <img src={avalancheIcon} alt="avalanche" className="h-6" />
                            <img src={eerc} alt="eerc" className="h-6" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-all">
                            <Search />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-all">
                            <Bell />
                        </button>
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-gray-600">
                            D
                        </div> */}
                        {isPollsPath && (
                            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-lg transition-all" onClick={() => execMint()}>
                                <Plus />
                                <span>Create Poll</span>
                            </button>
                        )}
                        {isAuctionsPath && (
                            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-lg transition-all" onClick={() => navigate("/auctions?modal=createauction")}>
                                <Plus />
                                <span>Create Auction</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
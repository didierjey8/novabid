import {useEffect, useRef, useState} from 'react'
import {formatEther, parseEther} from 'viem'
import {useEERCContext} from '@/contexts/EERCContext'
import {formatBalance, getExplorerUrl} from '@/lib/utils'
import {useAccount, useBalance, useWriteContract} from 'wagmi'
import {erc20Abi} from 'viem'
import {TokenBatcher} from '@/lib/batchReadCalls'
import {standardWatchOptions} from '@/lib/wagmiConfig'
import { motion } from "framer-motion"
import balanceIcon from "@/assets/dashboard/balanceicon.png"
import { BookLock, BookKey, BadgeCheck } from "lucide-react"

type OperationType = 'deposit' | 'withdraw'

export default function TokenOperationsEERC() {
    const {isConnected, chainId, tokenAddress, eerc, encryptedBalance, contractAddress, publicClient} = useEERCContext()
    const {address} = useAccount()
    const [amount, setAmount] = useState('')
    const [operationType, setOperationType] = useState<OperationType>('deposit')
    const [isProcessing, setIsProcessing] = useState(false)
    const [txHash, setTxHash] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [approvedAmount, setApprovedAmount] = useState<bigint>(0n)
    const [isApproving, setIsApproving] = useState(false)

    // Get regular token balance
    const {data: tokenBalanceData, refetch: refetchBalance} = useBalance({
        address,
        token: tokenAddress as `0x${string}`,
        ...standardWatchOptions,
        query: {
            enabled: !!address && !!tokenAddress
        }
    })

    const isMainnet = chainId === 43114 // Avalanche mainnet chain ID

    const {writeContractAsync: approveTokens} = useWriteContract()

    // Create a TokenBatcher instance for efficient RPC calls
    const batcherRef = useRef<TokenBatcher | null>(null)

    // Initialize or update the batcher when dependencies change
    useEffect(() => {
        if (!publicClient || !tokenAddress || !contractAddress || !address) {
            batcherRef.current = null
            return
        }

        if (!batcherRef.current) {
            batcherRef.current = new TokenBatcher(
                publicClient,
                tokenAddress as `0x${string}`,
                contractAddress,
                address as `0x${string}`
            )
        } else {
            batcherRef.current.setUserAddress(address as `0x${string}`)
        }
    }, [publicClient, tokenAddress, contractAddress, address])

    // Fetch the current approval amount
    useEffect(() => {
        const fetchApproval = async () => {
            if (!batcherRef.current) return

            try {
                const allowance = await batcherRef.current.getAllowance()
                setApprovedAmount(allowance)
            } catch (error) {
                console.error('Error fetching token allowance:', error)
            }
        }

        fetchApproval()

        // Set up an interval to refresh the approval amount less frequently
        const intervalId = setInterval(fetchApproval, 15000) // Every 15 seconds

        return () => clearInterval(intervalId)
    }, [address, tokenAddress, contractAddress, publicClient, txHash])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers and decimal point
        const value = e.target.value.replace(/[^0-9.]/g, '')
        setAmount(value)
    }

    const handleMaxClick = () => {
        if (operationType === 'deposit' && tokenBalanceData) {
            setAmount(tokenBalanceData.formatted)
        } else if (operationType === 'withdraw' && encryptedBalance) {
            setAmount(formatBalance(encryptedBalance.decryptedBalance))
        }
    }

    const handleApprove = async () => {
        if (!tokenAddress || !contractAddress || !amount) return

        setIsApproving(true)
        setError(null)

        try {
            const amountInWei = parseEther(amount)

            const result = await approveTokens({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [contractAddress, amountInWei],
            })

            setTxHash(result)

            // Wait for approval to be confirmed then update the approved amount
            setTimeout(async () => {
                try {
                    if (!batcherRef.current) return

                    // Force refresh of allowance after transaction
                    batcherRef.current.invalidateCache()
                    const allowance = await batcherRef.current.getAllowance(true)
                    setApprovedAmount(allowance)
                } catch (error) {
                    console.error('Error updating allowance after approval:', error)
                }
            }, 5000)

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
            setError(errorMessage)
            setTimeout(() => {
                setError("");
            },5000);
            console.error('Approval error:', err)
        } finally {
            setIsApproving(false)
        }
    }

    const handleOperation = async () => {
        if (!encryptedBalance || !amount || isNaN(Number(amount))) return

        setIsProcessing(true)
        setError(null)
        setTxHash(null)

        try {
            const amountInWei = parseEther(amount)

            // Check if approval is needed for deposit - with fresh check
            if (operationType === 'deposit') {
                let currentApproval = approvedAmount;

                // Get latest approval if we have a batcher
                if (batcherRef.current) {
                    try {
                        currentApproval = await batcherRef.current.getAllowance(true);
                        setApprovedAmount(currentApproval); // Update UI with latest value
                    } catch (error) {
                        console.error('Error refreshing approval amount:', error);
                    }
                }

                if (currentApproval < amountInWei) {
                    setError('Insufficient approval. Please approve tokens first.')
                    setIsProcessing(false)
                    return
                }
            }

            let result

            if (operationType === 'deposit') {
                result = await encryptedBalance.deposit(amountInWei)
            } else {
                result = await encryptedBalance.withdraw(amountInWei)
            }

            setTxHash(result.transactionHash)

            // Refresh balance and allowance after 5 seconds
            setTimeout(() => {
                encryptedBalance.refetchBalance()

                // Also refresh allowance
                if (batcherRef.current) {
                    batcherRef.current.invalidateCache()
                    batcherRef.current.getAllowance(true).then(allowance => {
                        setApprovedAmount(allowance)
                        refetchBalance()
                    }).catch(error => {
                        console.error('Error refreshing allowance:', error)
                    })
                }
            }, 5000)

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
            setError(errorMessage)
            setTimeout(() => {
                setError("");
            },5000);
            console.error(`${operationType} error:`, err)
        } finally {
            setIsProcessing(false)
        }
    }

    if (!isConnected) {
        return (<div className="space-y-4 sm:space-y-6">
            {/* Balance Section - Optimized for small screens */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
            >
            <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-bold mb-4 text-white">Token Operations</h2>
                <p className="text-secondary-300 text-gray-400">Please connect your wallet to use token operations.</p>
            </div>
        </motion.div>
        </div>)
    }

    if (eerc && !eerc.isRegistered) {
        return (<div className="space-y-4 sm:space-y-6">
            {/* Balance Section - Optimized for small screens */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Token Operations</h2>
                    <p className="text-secondary-300 text-gray-400">You need to register before performing token operations.</p>
                </div>
            </motion.div>
        </div>)
    }

    if (!eerc?.isInitialized || !encryptedBalance) {
        return (<div className="space-y-4 sm:space-y-6">
            {/* Balance Section - Optimized for small screens */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Token Operations</h2>
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-secondary-700 rounded w-3/4"></div>
                        <div className="h-4 bg-secondary-700 rounded w-1/2"></div>
                    </div>
                    {import.meta.env.MODE !== 'production' && (
                        <div className="mt-4 text-xs text-red-400">
                            Status: {!eerc ? 'EERC not available' : !eerc.isInitialized ? 'EERC not initialized' : 'Balance not available'}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden max-w-[700px] mx-auto"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0 mb-5">
                        <img src={balanceIcon} alt="VaultToken" className="w-full h-full p-2 sm:p-3" />
                    </div>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg text-white font-bold">Regular Token Balance:</p>
                                <p className="text-2xl text-lg font-medium text-gray-400">
                                    {tokenBalanceData ? `${tokenBalanceData.formatted} ${tokenBalanceData.symbol}` : '0 NOVABID'}
                                </p>
                            </div>

                            <div>
                                <p className="text-lg text-white font-bold">Encrypted Balance:</p>
                                <p className="text-2xl text-lg font-medium text-gray-400">
                                    {formatBalance(encryptedBalance.decryptedBalance)} NOVABID
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-0.5 sm:space-x-1 mb-4 sm:mb-6 bg-gray-800/50 rounded-lg p-0.5 sm:p-1 overflow-x-hidden">
                            {["deposit","withdraw"].map((tab) => (
                                <motion.button
                                    key={tab}
                                    onClick={() => setOperationType(tab as OperationType)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap min-w-0 ${
                                        operationType === tab
                                            ? "text-white"
                                            : "text-gray-400 hover:text-gray-300 hover:bg-purple-800/30"
                                    }`}
                                >
                                    {operationType === tab && (
                                        <motion.div
                                            layoutId="operationType"
                                            className="absolute inset-0 bg-gradient-to-r from-[#191B1D] via-purple-600 to-[#191B1D] rounded-md"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{(tab=="deposit"?"Deposit":"Withdraw")}</span>
                                </motion.button>
                            ))}
                        </div>

                        {operationType === 'deposit' && (
                            <div>
                                <p className="text-lg text-white font-bold">Approved Amount:</p>
                                <p className="text-2xl text-lg font-medium text-gray-400">
                                    {formatEther(approvedAmount)} NOVABID
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="text-lg text-white font-bold">
                                Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="0.0"
                                    className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                                <button
                                    onClick={handleMaxClick}
                                    className="absolute bg-gray-800/50 right-2 top-1/2 transform -translate-y-1/2 text-xs bg-secondary-600 px-2 py-1 rounded text-secondary-300 hover:bg-secondary-500 text-gray-400 hover:text-gray-300 hover:bg-purple-800/30"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>

                        {operationType === 'deposit' && amount && !isNaN(Number(amount)) && (
                            <>
                                {parseEther(amount) > approvedAmount ? (
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 transition-all font-medium text-sm sm:text-base whitespace-nowrap" 
                                        onClick={handleApprove}
                                        disabled={isApproving}
                                    >
                                        {!isApproving&&(<BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />)}
                                        <span>{isApproving ? 'Approving...' : 'Approve Tokens'}</span>
                                    </motion.button>
                                ) : (
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 transition-all font-medium text-sm sm:text-base whitespace-nowrap" 
                                        onClick={handleOperation}
                                        disabled={!amount || isNaN(Number(amount)) || isProcessing}
                                    >
                                        {!isProcessing&&(<BookLock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />)}
                                        <span>{isProcessing ? 'Processing...' : 'Deposit Tokens'}</span>
                                    </motion.button>
                                )}
                                {parseEther(amount) > approvedAmount && (
                                    <div className="mt-2 text-amber-400 text-smt ext-white">
                                        You need to approve {amount} tokens before depositing
                                    </div>
                                )}
                            </>
                        )}

                        {operationType === 'withdraw' && (
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 transition-all font-medium text-sm sm:text-base whitespace-nowrap" 
                                onClick={handleOperation}
                                disabled={!amount || isNaN(Number(amount)) || isProcessing}
                            >
                                {!isProcessing&&(<BookKey className="w-3.5 h-3.5 sm:w-4 sm:h-4" />)}
                                <span>{isProcessing ? 'Processing...' : 'Withdraw Tokens'}</span>
                            </motion.button>
                        )}

                        {error && (
                            <div className="mt-2 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {txHash && (
                            <div className="mt-2">
                                <a
                                    href={getExplorerUrl(txHash, isMainnet)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-400 hover:text-primary-300 underline text-sm text-gray-400"
                                >
                                    View transaction
                                </a>
                            </div>
                        )}

                        <div className="text-xs text-secondary-400">
                            <p className="mb-1 text-gray-400"><strong className='text-white'>Deposit:</strong> Convert regular tokens to encrypted tokens.</p>
                            <p className='text-gray-400'><strong className='text-white'>Withdraw:</strong> Convert encrypted tokens back to regular tokens.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
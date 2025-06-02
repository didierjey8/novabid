import {useState} from 'react'
import {useEERCContext} from '@/contexts/EERCContext'
import {getExplorerUrl} from '@/lib/utils'
import { motion } from "framer-motion"

export default function RegisterEERC() {
    const {isConnected, chainId, eerc} = useEERCContext()
    const [isRegistering, setIsRegistering] = useState(false)
    const [isGeneratingKey, setIsGeneratingKey] = useState(false)
    const [txHash, setTxHash] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [generatedKey, setGeneratedKey] = useState<string | null>(null)

    const isMainnet = chainId === 43114 // Avalanche mainnet chain ID

    const handleRegister = async () => {
        if (!eerc) return

        setIsRegistering(true)
        setError(null)

        try {
            const result = await eerc.register()
            setTxHash(result.transactionHash)
            setTimeout(() => {
                eerc.refetchEercUser()
            }, 5000) // Refetch user data after 5 seconds
        } catch (err) {
            console.error('Registration error:', err)
            setError(err instanceof Error ? err.message : 'An error occurred during registration')
            setTimeout(() => {
                setError('')
            }, 5000) 
        } finally {
            setIsRegistering(false)
        }
    }

    const handleGenerateKey = async () => {
        if (!eerc) return

        setIsGeneratingKey(true)
        setError(null)

        try {
            const key = await eerc.generateDecryptionKey()
            setGeneratedKey(key)
        } catch (err) {
            console.error('Error generating key:', err)
            setError(err instanceof Error ? err.message : 'An error occurred while generating key')
        } finally {
            setIsGeneratingKey(false)
        }
    }

    if (!isConnected) {
        return (<div className="mt-20 mt-0 flex px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden max-w-[600px] mx-auto"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Registration</h2>
                    <p className="text-secondary-300 text-gray-300 mb-5">Please connect your wallet to register.</p>
                    <appkit-button label="Connect wallet" size="sm" />
                </div>
            </motion.div >
        </div>)
    }

    if (!eerc) {
        return (<div className="mt-20 mt-0 flex px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden max-w-[600px] mx-auto"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Registration</h2>
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-secondary-700 rounded w-3/4"></div>
                        <div className="h-4 bg-secondary-700 rounded w-1/2"></div>
                    </div>
                </div>
            </motion.div >
        </div>)
    }

    if(generatedKey) return (<></>);


    return (<div className="mt-20 mt-0 flex px-4">
        <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#191B1D] border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden max-w-[600px] mx-auto"
            >
            <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-bold mb-4 text-white">Register on eERC20 NovaBid</h2>

                <div className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="text-secondary-300 mr-2 text-gray-300">Status:</span>
                            <span
                                className={`px-2 py-0.5 text-sm rounded-full ${
                                    eerc.isRegistered
                                        ? 'bg-green-900 text-green-300'
                                        : 'bg-amber-900 text-amber-300'
                                }`}
                            >
                                {eerc.isRegistered ? 'Registered' : 'Not Registered'}
                            </span>
                        </div>

                        {eerc.isRegistered && (
                            <>
                                <div className="flex items-center mt-2">
                                    <span className="text-secondary-300 mr-2 text-gray-300">Decryption Key:</span>
                                    <span className={`text-sm ${generatedKey ? 'text-green-300' : 'text-red-300'}`}>
                                        {generatedKey ? 'Set' : 'Not Set'}
                                    </span>
                                </div>

                                {!generatedKey && (
                                    <button
                                        onClick={handleGenerateKey}
                                        disabled={isGeneratingKey}
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                                    >
                                        {isGeneratingKey ? 'Generating...' : 'Generate Decryption Key'}
                                    </button>
                                )}

                                {generatedKey && (
                                    <div className="mt-2 p-3 bg-gray-800 rounded-md break-all">
                                        <p className="text-xs text-yellow-300 mb-1">Your decryption key (save this somewhere
                                            safe!):</p>
                                        <p className="text-xs font-mono text-gray-300">{generatedKey}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {!eerc.isRegistered && (
                            <button
                                onClick={handleRegister}
                                disabled={isRegistering || eerc.isRegistered}
                                className="w-full bg-[#5901E8] hover:bg-[#5901E8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                            >
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>
                        )}

                        {txHash && (
                            <div className="mt-2">
                                <a
                                    href={getExplorerUrl(txHash, isMainnet)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-400 hover:text-primary-300 underline text-sm"
                                >
                                    View transaction
                                </a>
                            </div>
                        )}

                        {error && (
                            <div className="mt-2 text-red-400 text-sm break-words overflow-hidden">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-xs text-secondary-400">
                        <p className="text-gray-300 text-justify">
                            Registration is required to use the Encrypted ERC20 NovaBid token. 
                            <br />
                            <br />
                            This creates a key pair that allows you to send and receive encrypted NOVABIDS.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div >
    </div>)
}
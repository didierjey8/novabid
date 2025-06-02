import { useState, useRef, useEffect } from "react"
import { Upload, Camera, Sparkles, X, Info, Clock, Eye, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "../common"

import { useWriteContract } from "wagmi";

import { auctionManagerAbi, auctionManagerAddress } from "@/config/AuctionManager.config";

interface CreateAuctionModalProps {
    isOpen: boolean
    onClose: () => void
}

interface AIGenerationResponse {
    results: Array<{
        url: string
        timeMs: number
        error: string | null
    }>
}

export default function CreateAuctionModal({ isOpen, onClose }: CreateAuctionModalProps) {
  
    const { data: isCreated, isPending: isCreating, error: errorCreating, writeContract } = useWriteContract();

    const [auctionTitle, setAuctionTitle] = useState("")
    const [startingBid, setStartingBid] = useState("")
    const [formattedBid, setFormattedBid] = useState("")
    const [duration, setDuration] = useState("")
    const [description, setDescription] = useState("")
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isGeneratingAI, setIsGeneratingAI] = useState(false)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [cameraModalOpen, setCameraModalOpen] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    
    // Refs
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Format currency function
    const formatCurrency = (value: string): string => {
        if (!value) return ''
        
        // Remove all non-digit characters except decimal point
        const cleanValue = value.replace(/[^\d.]/g, '')
        
        // If empty after cleaning, return empty
        if (!cleanValue) return ''
        
        // Handle multiple decimal points - keep only first one
        const parts = cleanValue.split('.')
        let integerPart = parts[0]
        let decimalPart = parts[1]
        
        // If there are multiple decimal points, join extra parts to decimal
        if (parts.length > 2) {
            decimalPart = parts.slice(1).join('')
        }
        
        // Limit decimal places to 2
        if (decimalPart && decimalPart.length > 2) {
            decimalPart = decimalPart.substring(0, 2)
        }
        
        // Add thousand separators to integer part
        if (integerPart) {
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        
        // Build final formatted value
        if (decimalPart !== undefined) {
            return `${integerPart}.${decimalPart}`
        }
        
        // If original value ended with decimal point, preserve it
        if (cleanValue.endsWith('.')) {
            return `${integerPart}.`
        }
        
        return integerPart
    }

    // Handle bid amount change
    const handleBidChange = (value: string) => {
        const formatted = formatCurrency(value)
        setFormattedBid(formatted)
        
        // Store clean numeric value for validation (remove commas)
        const cleanValue = formatted.replace(/,/g, '')
        setStartingBid(cleanValue)
    }

    // Handle file upload
    const handleFileUpload = (file: File) => {
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const imageUrl = URL.createObjectURL(file)
            setSelectedImageUrl(imageUrl)
            setImageFile(file)
        }
    }

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileUpload(files[0])
        }
    }

    // Handle camera capture
    const handleCameraCapture = async () => {
        try {
            setCameraModalOpen(true)
            
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            })
            
            setStream(mediaStream)
            
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()
                }
            }, 100)
            
        } catch (error) {
            console.error('Error accessing camera:', error)
            alert('Unable to access camera. Please make sure you have granted camera permissions.')
            setCameraModalOpen(false)
        }
    }

    // Take photo from camera
    const takePhoto = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        
        if (!video || !canvas) {
            console.log('Missing elements:', { video: !!video, canvas: !!canvas })
            return
        }
        
        if (video.readyState !== video.HAVE_ENOUGH_DATA) {
            alert('Camera is not ready yet. Please wait a moment and try again.')
            return
        }
        
        const context = canvas.getContext('2d')
        if (!context) {
            console.error('Could not get canvas context')
            return
        }
        
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
            if (blob) {
                const imageUrl = URL.createObjectURL(blob)
                const file = new File([blob], `auction-item-${Date.now()}.jpg`, { type: 'image/jpeg' })
                
                setSelectedImageUrl(imageUrl)
                setImageFile(file)
                closeCameraModal()
            } else {
                console.error('Failed to create blob from canvas')
                alert('Failed to capture photo. Please try again.')
            }
        }, 'image/jpeg', 0.8)
    }

    // Close camera modal
    const closeCameraModal = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            setStream(null)
        }
        setCameraModalOpen(false)
    }

    // Handle image modal
    const openImageModal = () => {
        if (selectedImageUrl) {
            setImageModalOpen(true)
        }
    }

    const closeImageModal = () => {
        setImageModalOpen(false)
    }

    // Handle AI image generation
    const handleAIGeneration = async () => {
        if (!auctionTitle.trim()) {
            alert('Please enter an auction title first')
            return
        }

        setIsGeneratingAI(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/uploads/generate-images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    basePrompt: `Auction item: ${auctionTitle}`,
                    options: [description || auctionTitle]
                })
            })

            if (!response.ok) {
                throw new Error('Failed to generate image')
            }

            const data: AIGenerationResponse = await response.json()
            
            if (data.results && data.results.length > 0) {
                const validResults = data.results.filter(result => result.error === null)
                
                if (validResults.length > 0) {
                    setSelectedImageUrl(validResults[0].url)
                }
            }
        } catch (error) {
            console.error('Error generating AI image:', error)
            alert('Failed to generate image. Please try again.')
        } finally {
            setIsGeneratingAI(false)
        }
    }

    // Handle form submission
    const handleCreateAuction = async () => {
        if (!auctionTitle.trim()) {
            alert('Please enter an auction title')
            return
        }
        if (!startingBid.trim() || parseFloat(startingBid) <= 0) {
            alert('Please enter a valid starting bid amount')
            return
        }
        if (!duration.trim() || parseInt(duration) <= 0) {
            alert('Please enter a valid auction duration')
            return
        }

        const auctionData = {
            title: auctionTitle,
            description,
            startingBid: parseFloat(startingBid),
            duration: parseInt(duration)* 3600,
            image: selectedImageUrl
        }
        
        setIsGeneratingAI(true);

        /*const result = await encryptedBalance.privateTransfer("0x3741E1960daC952922f8dDcB4FDA685d66B04ebf",parseEther("1"));
        if(result?.transactionHash)*/

        writeContract({
            address: auctionManagerAddress,
            abi: auctionManagerAbi,
            functionName: 'createAuction',
            args: [
                auctionData.title,
                auctionData.description,
                auctionData.image,
                auctionData.startingBid,
                auctionData.duration
            ],
        });
    }

    useEffect(()=>{
        if(errorCreating){
            setIsGeneratingAI(false);
        }
        
        if(isCreated){
            setIsGeneratingAI(false);
            onClose();

            setAuctionTitle("");
            setDescription("");
            setStartingBid("");
            setDuration("");
            setSelectedImageUrl("");
        }
        
        if(isCreating){
            setIsGeneratingAI(true);
        }
    },[errorCreating, isCreated, isCreating]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Auction"
            height="95vh"
            className="overflow-y-auto px-0 sm:px-6 max-h-[95vh] max-w-4xl xl:max-w-5xl"
        >
            <motion.div 
                className="space-y-4 lg:space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Header Section */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div>
                        <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                            Item Title *
                        </label>
                        <input
                            type="text"
                            value={auctionTitle}
                            onChange={(e) => setAuctionTitle(e.target.value)}
                            placeholder="What are you auctioning?"
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm lg:text-base"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                            Starting Bid Amount *
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm lg:text-base font-medium">
                                $
                            </div>
                            <input
                                type="text"
                                value={formattedBid}
                                onChange={(e) => handleBidChange(e.target.value)}
                                placeholder="1,000.00"
                                className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all pl-8 lg:pl-9 text-sm lg:text-base"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Duration */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                >
                    <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                        Duration (hours) *
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 lg:w-5 lg:h-5" />
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="24"
                            min="1"
                            max="720"
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all pl-10 lg:pl-11 text-sm lg:text-base"
                        />
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                        Description (Optional)
                    </label>
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the item you're auctioning..."
                            rows={3}
                            maxLength={500}
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none text-sm lg:text-base"
                        />
                        <div className="absolute bottom-2 right-2 text-xs lg:text-sm text-gray-600">
                            {description.length}/500
                        </div>
                    </div>
                </motion.div>

                {/* Item Image */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                        <label className="text-gray-300 text-sm lg:text-base font-medium">
                            Item Image
                        </label>
                        <div className="flex gap-2 lg:gap-3">
                            <motion.button 
                                onClick={handleAIGeneration}
                                disabled={isGeneratingAI || !auctionTitle.trim()}
                                className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-yellow-500/10 hover:bg-yellow-500/20 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Generate AI image for auction item"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <AnimatePresence mode="wait">
                                    {isGeneratingAI ? (
                                        <motion.div 
                                            key="loading"
                                            className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    ) : (
                                        <motion.div
                                            key="icon"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Zap className="w-4 h-4 lg:w-5 lg:h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <span className="text-sm lg:text-base">Generate</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Upload Area */}
                    {/*<motion.div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg lg:rounded-xl p-6 lg:p-8 text-center transition-all ${
                            isDragOver 
                                ? "border-purple-500/50 bg-purple-500/5" 
                                : "border-gray-700/50 bg-[#191B1D]/50"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Upload className="w-8 h-8 lg:w-10 lg:h-10 text-gray-500 mx-auto mb-3 lg:mb-4" />
                            <p className="text-gray-300 text-sm lg:text-base mb-1">
                                Choose a file or drag & drop it here
                            </p>
                            <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-6">
                                JPEG and PNG formats, up to 50MB
                            </p>

                            <div className="flex gap-2 lg:gap-3">
                                <div className="group relative">
                                    <motion.button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center justify-center p-2 lg:p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors"
                                        title="Upload photo"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <Upload className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                                    </motion.button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        Browse files
                                    </div>
                                </div>

                                <div className="group relative">
                                    <motion.button
                                        onClick={handleCameraCapture}
                                        className="flex items-center justify-center p-2 lg:p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg transition-colors"
                                        title="Take photo"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <Camera className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                                    </motion.button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        Take photo
                                    </div>
                                </div>

                                <div className="group relative">
                                    <motion.button
                                        onClick={handleAIGeneration}
                                        disabled={isGeneratingAI || !auctionTitle.trim()}
                                        className="flex items-center justify-center p-2 lg:p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Generate with AI"
                                        whileHover={!isGeneratingAI ? { scale: 1.05, y: -2 } : {}}
                                        whileTap={!isGeneratingAI ? { scale: 0.95 } : {}}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isGeneratingAI ? (
                                                <motion.div 
                                                    key="loading"
                                                    className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            ) : (
                                                <motion.div
                                                    key="sparkles"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                                                >
                                                    <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        Generate with AI
                                    </div>
                                </div>

                                <div className="group relative ml-auto">
                                    <Info className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                                    <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap max-w-xs">
                                        Upload: Max 50MB JPEG/PNG<br/>
                                        AI: Generate based on title
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file)
                        }}
                        className="hidden"
                    />*/}

                    {/* Image Preview */}
                    <AnimatePresence>
                        {selectedImageUrl && (
                            <motion.div 
                                className="mt-4 lg:mt-6 relative group cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 25,
                                    duration: 0.4
                                }}
                                layout
                            >
                                <div className="relative overflow-hidden rounded-lg lg:rounded-xl border border-gray-700">
                                    <motion.img
                                        src={selectedImageUrl}
                                        alt="Auction item preview"
                                        className={`w-full h-64 lg:h-80 xl:h-96 object-cover transition-all duration-300 group-hover:scale-105 ${
                                            isGeneratingAI ? 'blur-sm' : ''
                                        }`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    
                                    <AnimatePresence>
                                        {isGeneratingAI && (
                                            <motion.div 
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.div 
                                                    className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-purple-500/30"
                                                    initial={{ scale: 0.8, y: 20 }}
                                                    animate={{ scale: 1, y: 0 }}
                                                    exit={{ scale: 0.8, y: 20 }}
                                                    transition={{ 
                                                        type: "spring", 
                                                        stiffness: 300, 
                                                        damping: 25 
                                                    }}
                                                >
                                                    <div className="flex flex-col items-center gap-3 lg:gap-4">
                                                        <div className="relative">
                                                            <motion.div 
                                                                className="w-8 h-8 lg:w-10 lg:h-10 border-3 border-purple-400 border-t-transparent rounded-full"
                                                                animate={{ rotate: 360 }}
                                                                transition={{ 
                                                                    duration: 1, 
                                                                    repeat: Infinity, 
                                                                    ease: "linear" 
                                                                }}
                                                            />
                                                            <motion.div
                                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                                animate={{ 
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [0.8, 1, 0.8]
                                                                }}
                                                                transition={{ 
                                                                    duration: 2, 
                                                                    repeat: Infinity 
                                                                }}
                                                            >
                                                                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300" />
                                                            </motion.div>
                                                        </div>
                                                        <motion.div 
                                                            className="text-center"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                        >
                                                            <p className="text-white font-medium text-sm lg:text-base">Generating...</p>
                                                            <p className="text-purple-200 text-xs lg:text-sm mt-1">Creating AI image</p>
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    {!isGeneratingAI && (
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <motion.button
                                                onClick={openImageModal}
                                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 lg:p-4 transition-all duration-200"
                                                title="View full image"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <Eye className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                            </motion.button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Create Button */}
                <motion.div 
                    className="pt-4 lg:pt-6 border-t border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <motion.button 
                        onClick={handleCreateAuction}
                        disabled={isGeneratingAI}
                        className="flex justify-center items-center space-x-2 w-full bg-white text-black font-medium py-3 lg:py-3.5 px-6 lg:px-8 rounded-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    <AnimatePresence mode="wait">
                        {isGeneratingAI && (
                        <motion.div 
                            key="loading"
                            className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        />
                        )}
                    </AnimatePresence>
                    <span>{isGeneratingAI ? "Creating..." : "Create Auction"}</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Camera Modal */}
            <AnimatePresence>
                {cameraModalOpen && (
                    <motion.div 
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className="relative w-full max-w-3xl lg:max-w-4xl mx-4"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <motion.button
                                onClick={closeCameraModal}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <X className="w-8 h-8 lg:w-10 lg:h-10" />
                            </motion.button>
                            
                            <div className="bg-[#191B1D] rounded-xl lg:rounded-2xl overflow-hidden">
                                <div className="relative aspect-video bg-black">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-4 lg:top-6 left-4 lg:left-6 w-8 h-8 lg:w-12 lg:h-12 border-l-2 border-t-2 border-white/50"></div>
                                        <div className="absolute top-4 lg:top-6 right-4 lg:right-6 w-8 h-8 lg:w-12 lg:h-12 border-r-2 border-t-2 border-white/50"></div>
                                        <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 w-8 h-8 lg:w-12 lg:h-12 border-l-2 border-b-2 border-white/50"></div>
                                        <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-6 w-8 h-8 lg:w-12 lg:h-12 border-r-2 border-b-2 border-white/50"></div>
                                        
                                        <div className="absolute top-4 lg:top-6 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-red-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded text-xs lg:text-sm flex items-center gap-1 lg:gap-2">
                                                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-300 rounded-full animate-pulse"></div>
                                                LIVE
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 lg:p-8 bg-[#191B1D] border-t border-gray-700">
                                    <div className="flex items-center justify-center gap-4 lg:gap-6">
                                        <motion.button
                                            onClick={closeCameraModal}
                                            className="px-4 lg:px-8 py-2 lg:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg lg:rounded-xl transition-colors text-sm lg:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            Cancel
                                        </motion.button>
                                        
                                        <motion.button
                                            onClick={takePhoto}
                                            className="px-6 lg:px-10 py-3 lg:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg lg:rounded-xl font-semibold transition-colors flex items-center gap-2 lg:gap-3 text-sm lg:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Camera className="w-5 h-5 lg:w-6 lg:h-6" />
                                            Take Photo
                                        </motion.button>
                                    </div>
                                    
                                    <p className="text-gray-400 text-sm lg:text-base text-center mt-3 lg:mt-4">
                                        Position your item within the frame and click "Take Photo"
                                    </p>
                                </div>
                            </div>
                            
                            <canvas ref={canvasRef} className="hidden" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Modal */}
            <AnimatePresence>
                {imageModalOpen && selectedImageUrl && (
                    <motion.div 
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" 
                        onClick={closeImageModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className="relative max-w-4xl max-h-[90vh] mx-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                onClick={closeImageModal}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <X className="w-8 h-8" />
                            </motion.button>
                            
                            <motion.img
                                src={selectedImageUrl}
                                alt="Full size preview"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    )
}
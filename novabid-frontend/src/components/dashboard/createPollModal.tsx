import { useState, useRef } from "react"
import { Plus, Upload, Camera, Sparkles, X, Info, Zap, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "../common"

interface PollOption {
    id: string
    text: string
    selectedImageUrl?: string
    imageFile?: File
}

interface CreatePollModalProps {
    isOpen: boolean
    onClose: () => void
}

interface AIGenerationResponse {
    results: Array<{
        option: string
        url: string
        timeMs: number
        error: string | null
    }>
}

export default function CreatePollModal({ isOpen, onClose }: CreatePollModalProps) {
    const [pollTitle, setPollTitle] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [pollOptions, setPollOptions] = useState<PollOption[]>([
        { id: "1", text: "" },
        { id: "2", text: "" },
        { id: "3", text: "" },
        { id: "4", text: "" }
    ])
    const [isGeneratingAI, setIsGeneratingAI] = useState<{ [key: string]: boolean }>({})
    const [isGeneratingAllAI, setIsGeneratingAllAI] = useState(false)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [selectedImageForModal, setSelectedImageForModal] = useState<string | null>(null)
    const [cameraModalOpen, setCameraModalOpen] = useState(false)
    const [currentOptionId, setCurrentOptionId] = useState<string | null>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    
    // Camera refs
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    // File input refs for each option
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

    // Handle poll option text change
    const handleOptionTextChange = (id: string, text: string) => {
        setPollOptions(options => 
            options.map(option => 
                option.id === id ? { ...option, text } : option
            )
        )
    }

    // Add new poll option
    const addNewOption = () => {
        const newId = (pollOptions.length + 1).toString()
        setPollOptions(options => [...options, { id: newId, text: "" }])
    }

    // Remove poll option (only if more than 2 options)
    const removeOption = (id: string) => {
        if (pollOptions.length > 2) {
            setPollOptions(options => options.filter(option => option.id !== id))
        }
    }

    // Handle file upload for option
    const handleFileUpload = (optionId: string, file: File) => {
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const imageUrl = URL.createObjectURL(file)
            setPollOptions(options =>
                options.map(option =>
                    option.id === optionId 
                        ? { ...option, selectedImageUrl: imageUrl, imageFile: file }
                        : option
                )
            )
        }
    }

    // Handle camera capture
    const handleCameraCapture = async (optionId: string) => {
        try {
            setCurrentOptionId(optionId)
            setCameraModalOpen(true)
            
            // Request camera access
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
        
        if (!video || !canvas || !currentOptionId) {
            console.log('Missing elements:', { video: !!video, canvas: !!canvas, currentOptionId })
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
                const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
                
                setPollOptions(options =>
                    options.map(option =>
                        option.id === currentOptionId
                            ? { ...option, selectedImageUrl: imageUrl, imageFile: file }
                            : option
                    )
                )
                
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
        setCurrentOptionId(null)
    }

    // Handle image modal
    const openImageModal = (imageUrl: string) => {
        setSelectedImageForModal(imageUrl)
        setImageModalOpen(true)
    }

    const closeImageModal = () => {
        setImageModalOpen(false)
        setSelectedImageForModal(null)
    }

    // Handle AI image generation for single option
    const handleAIGeneration = async (optionId: string) => {
        const option = pollOptions.find(opt => opt.id === optionId)
        if (!option?.text.trim()) {
            alert('Please enter text for this option first')
            return
        }

        if (!pollTitle.trim()) {
            alert('Please enter a poll title first')
            return
        }

        setIsGeneratingAI(prev => ({ ...prev, [optionId]: true }))

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/uploads/generate-images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    basePrompt: pollTitle,
                    options: [option.text]
                })
            })

            if (!response.ok) {
                throw new Error('Failed to generate image')
            }

            const data: AIGenerationResponse = await response.json()
            
            if (data.results && data.results.length > 0) {
                const validResults = data.results.filter(result => result.error === null)
                
                if (validResults.length > 0) {
                    setPollOptions(options =>
                        options.map(opt =>
                            opt.id === optionId 
                                ? { ...opt, selectedImageUrl: validResults[0].url }
                                : opt
                        )
                    )
                }
            }
        } catch (error) {
            console.error('Error generating AI image:', error)
            alert('Failed to generate image. Please try again.')
        } finally {
            setIsGeneratingAI(prev => ({ ...prev, [optionId]: false }))
        }
    }

    // Handle AI generation for all options
    const handleGenerateAllAI = async () => {
        const optionsWithText = pollOptions.filter(opt => opt.text.trim())
        
        if (optionsWithText.length === 0) {
            alert('Please enter text for at least one option')
            return
        }

        if (!pollTitle.trim()) {
            alert('Please enter a poll title first')
            return
        }

        setIsGeneratingAllAI(true)
        
        setIsGeneratingAI(prev => {
            const newState = { ...prev }
            optionsWithText.forEach(option => {
                newState[option.id] = true
            })
            return newState
        })

        try {
            const promises = optionsWithText.map(async (option) => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/uploads/generate-images`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            basePrompt: pollTitle,
                            options: [option.text]
                        })
                    })

                    if (!response.ok) {
                        throw new Error(`Failed to generate image for option: ${option.text}`)
                    }

                    const data: AIGenerationResponse = await response.json()
                    
                    if (data.results && data.results.length > 0) {
                        const validResults = data.results.filter(result => result.error === null)
                        if (validResults.length > 0) {
                            return {
                                optionId: option.id,
                                imageUrl: validResults[0].url
                            }
                        }
                    }
                    return null
                } catch (error) {
                    console.error(`Error generating image for option ${option.text}:`, error)
                    return null
                } finally {
                    setIsGeneratingAI(prev => ({ ...prev, [option.id]: false }))
                }
            })

            const results = await Promise.all(promises)
            
            setPollOptions(options => {
                const updatedOptions = [...options]
                
                results.forEach(result => {
                    if (result) {
                        const optionIndex = updatedOptions.findIndex(opt => opt.id === result.optionId)
                        if (optionIndex !== -1) {
                            updatedOptions[optionIndex].selectedImageUrl = result.imageUrl
                        }
                    }
                })
                
                return updatedOptions
            })

        } catch (error) {
            console.error('Error generating AI images:', error)
            alert('Failed to generate images. Please try again.')
            
            setIsGeneratingAI(prev => {
                const newState = { ...prev }
                optionsWithText.forEach(option => {
                    newState[option.id] = false
                })
                return newState
            })
        } finally {
            setIsGeneratingAllAI(false)
        }
    }

    // Handle form submission
    const handleCreatePoll = () => {
        if (!pollTitle.trim()) {
            alert('Please enter a poll title')
            return
        }
        if (!endDate) {
            alert('Please select an end date')
            return
        }
        if (pollOptions.filter(opt => opt.text.trim()).length < 2) {
            alert('Please provide at least 2 poll options')
            return
        }

        const pollData = {
            title: pollTitle,
            description,
            endDate,
            options: pollOptions.filter(opt => opt.text.trim())
        }
        
        console.log('Creating poll:', pollData)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create a New Poll"
            height="95vh"
            className="overflow-y-auto px-0 sm:px-6 max-h-[95vh] max-w-6xl xl:max-w-7xl"
        >
            <motion.div 
                className="space-y-4 lg:space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Coming Soon Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 p-4 lg:p-6"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    
                    <div className="relative flex items-start gap-3 lg:gap-4">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-orange-500/20 rounded-full flex items-center justify-center"
                        >
                            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
                        </motion.div>
                        
                        <div className="flex-1">
                            <motion.h3
                                className="text-orange-300 font-semibold text-base lg:text-lg mb-1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                🚀 Coming Very Soon!
                            </motion.h3>
                            <motion.p
                                className="text-orange-200/80 text-sm lg:text-base leading-relaxed"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Poll creation will be available very soon! You can explore the interface, but the full functionality is coming shortly.
                            </motion.p>
                            
                            <motion.div
                                className="flex items-center gap-2 mt-2 text-orange-300 text-xs lg:text-sm font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-orange-400 rounded-full"
                                />
                                Full functionality launching soon
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
                {/* Header Section */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div>
                        <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                            Poll Title *
                        </label>
                        <input
                            type="text"
                            value={pollTitle}
                            onChange={(e) => setPollTitle(e.target.value)}
                            placeholder="What is your poll about?"
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm lg:text-base"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm lg:text-base font-medium mb-2 block">
                            End Date *
                        </label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all [color-scheme:dark] text-sm lg:text-base"
                            required
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
                            placeholder="Provide additional details about your poll..."
                            rows={3}
                            maxLength={500}
                            className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none text-sm lg:text-base"
                        />
                        <div className="absolute bottom-2 right-2 text-xs lg:text-sm text-gray-600">
                            {description.length}/500
                        </div>
                    </div>
                </motion.div>

                {/* Poll Options */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                        <label className="text-gray-300 text-sm lg:text-base font-medium">
                            Poll Options * (minimum 2)
                        </label>
                        <div className="flex gap-2 lg:gap-3">
                            <motion.button 
                                onClick={handleGenerateAllAI}
                                disabled={isGeneratingAllAI || !pollTitle.trim() || pollOptions.filter(opt => opt.text.trim()).length === 0}
                                className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-yellow-500/10 hover:bg-yellow-500/20 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Generate AI images for all options individually"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <AnimatePresence mode="wait">
                                    {isGeneratingAllAI ? (
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
                                <span className="text-sm lg:text-base">Generate All</span>
                            </motion.button>
                            
                            <motion.button 
                                onClick={addNewOption}
                                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 hover:bg-purple-500/20 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                                </motion.div>
                                <span className="text-sm lg:text-base">Add Option</span>
                            </motion.button>
                        </div>
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="popLayout">
                            {pollOptions.map((option, index) => (
                                <motion.div 
                                    key={option.id} 
                                    className="border border-gray-700/50 rounded-lg lg:rounded-xl p-4 lg:p-6 bg-[#191B1D]/50"
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                                        visible: { 
                                            opacity: 1, 
                                            y: 0, 
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 24
                                            }
                                        },
                                        exit: { 
                                            opacity: 0, 
                                            y: -20, 
                                            scale: 0.95,
                                            transition: { duration: 0.2 }
                                        }
                                    }}
                                    layout
                                    layoutId={option.id}
                                >
                                    <div className="flex items-center gap-3 mb-3 lg:mb-4">
                                        <span className="text-gray-400 text-sm lg:text-base font-medium min-w-[60px] lg:min-w-[80px]">
                                            Option {index + 1}
                                        </span>
                                        {pollOptions.length > 2 && (
                                            <motion.button
                                                onClick={() => removeOption(option.id)}
                                                className="text-red-400 hover:text-red-300 p-1 lg:p-1.5 hover:bg-red-500/10 rounded transition-colors"
                                                title="Remove option"
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <X className="w-4 h-4 lg:w-5 lg:h-5" />
                                            </motion.button>
                                        )}
                                    </div>
                                    
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                                        placeholder={`Enter option ${index + 1}...`}
                                        className="w-full bg-[#191B1D] border border-gray-700 rounded-lg px-4 py-2.5 lg:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all mb-3 lg:mb-4 text-sm lg:text-base"
                                    />

                                    <div className="flex gap-2 lg:gap-3 mb-3 lg:mb-4">
                                        <div className="group relative">
                                            <motion.button
                                                onClick={() => fileInputRefs.current[option.id]?.click()}
                                                className="flex items-center justify-center p-2 lg:p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors"
                                                title="Upload photo"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <Upload className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                                            </motion.button>
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                                Upload photo
                                            </div>
                                        </div>

                                        <div className="group relative">
                                            <motion.button
                                                onClick={() => handleCameraCapture(option.id)}
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
                                                onClick={() => handleAIGeneration(option.id)}
                                                disabled={isGeneratingAI[option.id] || !option.text.trim() || !pollTitle.trim()}
                                                className="flex items-center justify-center p-2 lg:p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Generate with AI"
                                                whileHover={!isGeneratingAI[option.id] ? { scale: 1.05, y: -2 } : {}}
                                                whileTap={!isGeneratingAI[option.id] ? { scale: 0.95 } : {}}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isGeneratingAI[option.id] ? (
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
                                                Generate single image
                                            </div>
                                        </div>

                                        <div className="group relative ml-auto">
                                            <Info className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                                            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap max-w-xs">
                                                Upload: Max 50MB JPEG/PNG<br/>
                                                AI: Individual image per option
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        ref={(el) => fileInputRefs.current[option.id] = el}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleFileUpload(option.id, file)
                                        }}
                                        className="hidden"
                                    />

                                    <AnimatePresence>
                                        {option.selectedImageUrl && (
                                            <motion.div 
                                                className="mt-3 lg:mt-4 relative group cursor-pointer"
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
                                                <div className="relative overflow-hidden rounded-lg border border-gray-700">
                                                    <motion.img
                                                        src={option.selectedImageUrl}
                                                        alt={`Option ${index + 1} preview`}
                                                        className={`w-full h-48 lg:h-56 xl:h-64 object-cover transition-all duration-300 group-hover:scale-105 ${
                                                            isGeneratingAI[option.id] ? 'blur-sm' : ''
                                                        }`}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    
                                                    <AnimatePresence>
                                                        {isGeneratingAI[option.id] && (
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
                                                    
                                                    {!isGeneratingAI[option.id] && (
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <motion.button
                                                                onClick={() => openImageModal(option.selectedImageUrl!)}
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
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="pt-4 lg:pt-6 border-t border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <motion.button 
                        onClick={handleCreatePoll}
                        className="w-full bg-white text-black font-medium py-3 lg:py-3.5 px-6 lg:px-8 rounded-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm lg:text-base relative"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {/* Coming Soon Badge */}
                        <span
                            className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm z-20"
                        >
                            SOON
                        </span>
                        Create Poll
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
                                        onLoadedData={() => {
                                            console.log('Video loaded')
                                        }}
                                        onError={(e) => {
                                            console.error('Video error:', e)
                                        }}
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
                                        Position your subject within the frame and click "Take Photo"
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
                {imageModalOpen && selectedImageForModal && (
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
                                src={selectedImageForModal}
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
import { useState, Fragment, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FormInput,
  MessageSquareText,
  Terminal,
  ArrowRight,
  Info,
  Coins,
  Tag,
  CircleDollarSign,
  Hash,
  FileText,
  Send,
  Bot,
  User,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Download,
  Code2,
  Zap,
  CopyCheck,
  Edit3,
  RotateCcw,
  Check,
  X,
} from "lucide-react";

import { useAccount } from "wagmi";
import { useEERC } from "@/modules/eerc";

// SVG Logo Components
const AppleLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const WindowsLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.851" />
  </svg>
);

const LinuxLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333a.707.707 0 00-.3-.213c-.067-.01-.126-.023-.2-.023-.052 0-.104.007-.15.018-.1.027-.2.070-.307.128a.613.613 0 00-.22.2.24.24 0 00-.065.212c.014.085.037.14.093.21.023.033.061.060.1.08a.197.197 0 01.069.029.35.35 0 01.157.201c.05.134.073.281.079.427v.09c-.006.046-.036.09-.061.13-.069.114-.157.186-.2.31-.05.13-.045.266-.077.405-.025.09-.106.158-.183.159a.289.289 0 01-.287-.183c-.048-.115-.067-.25-.067-.365v-.257c-.001-.184.04-.369.085-.517.056-.19.137-.33.202-.493.065-.162.105-.335.114-.5.018-.16-.007-.358-.095-.522a1.041 1.041 0 00-.512-.378 2.166 2.166 0 00-.113-.035.363.363 0 01-.094-.078c-.014-.018-.029-.058-.02-.078.01-.02.021-.04.043-.06a.373.373 0 01.089-.058.624.624 0 01.22-.067c.112-.014.226-.015.33.002a.71.71 0 01.300.213c.082.133.138.199.183.333.045.134.061.2.061.4v.02c-.006.138-.035.274-.088.402-.037.065-.133.138-.183.198a1.312 1.312 0 01.22.066c.086.069.18.088.284.133a.71.71 0 01.088.042.953.953 0 00.213-.335 1.807 1.807 0 00.15-.706l.004.024a.086.086 0 00.004.021v-.105c0 .02-.006.04-.006.06a.456.456 0 00-.166-.724c-.188-.136-.371-.198-.584-.198h-.013z" />
  </svg>
);

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const NodeJSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
  </svg>
);

const NPMLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 5.183H13.45l.01-4.848-2.425-.003L11.02 15.82H5.113z" />
  </svg>
);

interface TokenFormData {
  tokenName: string;
  tokenSymbol: string;
  initialSupply: string;
  decimals: string;
  initialAddress: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const TokenForm = () => {
  const { address } = useAccount();

  const [formData, setFormData] = useState<TokenFormData>({
    tokenName: "",
    tokenSymbol: "",
    initialSupply: "",
    decimals: "18",
    initialAddress: address || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [copied, setCopied] = useState(false);
  const [dataToCopy, setDataToCopy] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const payload = {
        name: formData.tokenName,
        symbol: formData.tokenSymbol,
        initialSupply: parseInt(formData.initialSupply),
        decimals: parseInt(formData.decimals),
        initialAddress: formData.initialAddress || "",
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse({ success: true, data, message: "eERC20 created successfully!" });
        // Reset form
        setFormData({
          tokenName: "",
          tokenSymbol: "",
          initialSupply: "",
          decimals: "18",
          initialAddress: address || "",
        });

        setDataToCopy({
          "Registration Verifier": data?.data?.registrationVerifier || "0x00000000000000",
          "Mint Verifier": data?.data?.mintVerifier || "0x00000000000000",
          "Withdraw Verifier": data?.data?.withdrawVerifier || "0x00000000000000",
          "Transfer Verifier": data?.data?.transferVerifier || "0x00000000000000",
          BabyJubJub: data?.data?.babyJubJub || "0x00000000000000",
          Registrar: data?.data?.registrar || "0x00000000000000",
          "EncryptedERC - eERC20": data?.data?.encryptedERC || "0x00000000000000",
          "Converted Token": data?.data?.convertedToken || "0x00000000000000",
        });
      } else {
        setResponse({ success: false, message: data.message || "Failed to create token" });
      }
    } catch (error) {
      setResponse({ success: false, message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCopy = () => {
    const data = dataToCopy;

    const entries = Object.entries(data);
    const maxKeyLength = Math.max(...entries.map(([k]) => k.length));
    const maxValLength = Math.max(...entries.map(([, v]) => v.length));
    const keyPad = maxKeyLength;
    const valPad = maxValLength;

    const top = `┌${"─".repeat(keyPad + 2)}┬${"─".repeat(valPad + 2)}┐`;
    const mid = `├${"─".repeat(keyPad + 2)}┼${"─".repeat(valPad + 2)}┤`;
    const bot = `└${"─".repeat(keyPad + 2)}┴${"─".repeat(valPad + 2)}┘`;

    const rows = entries.map(([k, v]) => `│ ${k.padEnd(keyPad)} │ ${v.padEnd(valPad)} │`);

    const result = [top, `│ ${"Contract".padEnd(keyPad)} │ ${"Address".padEnd(valPad)} │`, mid, ...rows, bot].join("\n");

    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div className="bg-[#191B1D] rounded-xl p-4 sm:p-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header with Title and Description */}
      <motion.div className="max-w-2xl mx-auto mb-6 sm:mb-8 pt-6 sm:pt-10" variants={itemVariants}>
        <motion.div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4" variants={itemVariants}>
          <motion.div
            className="w-12 h-12 bg-[#5901E8]/20 rounded-xl flex items-center justify-center mx-auto sm:mx-0"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Coins className="w-6 h-6 text-[#5901E8]" />
          </motion.div>
          <div className="text-center sm:text-left">
            <motion.h1 className="text-xl sm:text-2xl font-bold text-white" variants={itemVariants}>
              Create Your eERC20 Token
            </motion.h1>
            <motion.p className="text-gray-400" variants={itemVariants}>
              Configure your token parameters below
            </motion.p>
          </div>
        </motion.div>

        {!response && (
          <motion.div
            className="bg-[#121416] rounded-xl p-3 sm:p-4 border border-[#5901E8]/10"
            variants={itemVariants}
            whileHover={{ borderColor: "rgba(89, 1, 232, 0.3)" }}
          >
            <motion.div className="flex flex-col gap-2">
              {[
                "Fill in the basic information like name, symbol, and supply",
                "Customize decimals and add a detailed description",
                "Review and deploy your token with one click",
              ].map((text, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-4 h-4 text-[#5901E8] mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm sm:text-base">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Success/Error Message */}
      <AnimatePresence>
        {response && (
          <motion.div
            className={`max-w-2xl mx-auto mb-6 p-4 rounded-xl border ${
              response.success ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex items-center gap-3">
              {response.success ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <p className="font-medium">{response.message}</p>
            </div>
            {response.success && response.data && (
              <>
                <motion.div
                  className="mt-3 p-4 bg-[#121416] rounded-xl border border-neutral-800 shadow-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-[150px_auto] gap-y-3 gap-x-6 text-sm text-gray-300">
                    {Object.entries(dataToCopy).map(([key, value]) => (
                      <Fragment key={key}>
                        <div className="font-medium text-gray-400 truncate">{key}:</div>
                        <div className="truncate">{value?.toString()}</div>
                      </Fragment>
                    ))}
                  </div>
                </motion.div>
                <motion.button
                  className="mt-5 w-full bg-[#5901E8] hover:bg-[#5901E8]/90 disabled:bg-[#5901E8]/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopy}
                  variants={itemVariants}
                >
                  <>
                    {copied ? "Copied!" : "Copy to clipboard"}
                    {copied ? <CopyCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!response && (
        <motion.form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-2xl mx-auto pb-6 sm:pb-10" variants={containerVariants}>
          {/* Two Column Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            {/* Token Name */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                Token Name
                <motion.button type="button" className="text-gray-400 hover:text-gray-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Info className="w-4 h-4" />
                </motion.button>
              </label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <input
                  type="text"
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleInputChange}
                  placeholder="e.g., My eERC20 Token"
                  className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 transition-all duration-300"
                  required
                />
                <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.div>

            {/* Token Symbol */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                Token Symbol
                <motion.button type="button" className="text-gray-400 hover:text-gray-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Info className="w-4 h-4" />
                </motion.button>
              </label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <input
                  type="text"
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleInputChange}
                  placeholder="e.g., MTK"
                  className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 transition-all duration-300"
                  required
                />
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.div>

            {/* Initial Supply */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                Initial Supply
                <motion.button type="button" className="text-gray-400 hover:text-gray-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Info className="w-4 h-4" />
                </motion.button>
              </label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <input
                  type="number"
                  name="initialSupply"
                  value={formData.initialSupply}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000000"
                  className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 transition-all duration-300"
                  required
                />
                <CircleDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.div>

            {/* Decimals */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                Decimals
                <motion.button type="button" className="text-gray-400 hover:text-gray-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Info className="w-4 h-4" />
                </motion.button>
              </label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <input
                  type="number"
                  name="decimals"
                  value={formData.decimals}
                  onChange={handleInputChange}
                  placeholder="18"
                  className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 transition-all duration-300"
                  required
                />
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Description - Full Width */}
          <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
              Address receive initial supply
              <motion.button type="button" className="text-gray-400 hover:text-gray-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Info className="w-4 h-4" />
              </motion.button>
            </label>
            <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <input
                name="initialAddress"
                value={formData.initialAddress}
                onChange={handleInputChange}
                required
                placeholder="Address receive initial supply..."
                className="w-full bg-[#121416] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 transition-all duration-300 resize-none"
              />
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            </motion.div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5901E8] hover:bg-[#5901E8]/90 disabled:bg-[#5901E8]/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Token...
              </>
            ) : (
              <>
                Create Token
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};

interface Message {
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  id: string;
  isEditing?: boolean;
}

const AIContent = ({
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  isTyping,
  setIsTyping,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { sendMessage, isSending, error, lastResponse, clearError } = useEERC();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageToSend?: string) => {
    const message = messageToSend || inputMessage;
    if (!message.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: message,
      timestamp: new Date(),
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    clearError?.();

    try {
      const aiReply = await sendMessage(message);

      const aiMessage: Message = {
        type: "ai",
        content: aiReply?.text ?? "The assistant did not return a valid response.",
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        type: "ai",
        content: error || "Something went wrong while contacting the AI agent. Please try again later.",
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handlePresetClick = (preset: string) => {
    handleSendMessage(preset);
  };

  const handleClearConversation = () => {
    setMessages([]);
    setShowClearConfirm(false);
    setEditingMessageId(null);
    setEditingContent("");
  };

  const handleEditMessage = (messageId: string, currentContent: string) => {
    setEditingMessageId(messageId);
    setEditingContent(currentContent);
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!editingContent.trim()) return;

    // Find the message index to resend from that point
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1) return;

    // Update the message content and remove all messages after the edited one
    const updatedMessages = messages.slice(0, messageIndex + 1);
    updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], content: editingContent };
    setMessages(updatedMessages);

    // Clear editing state immediately
    const messageToSend = editingContent;
    setEditingMessageId(null);
    setEditingContent("");

    // Send the AI request with the new message
    setIsTyping(true);
    try {
      const aiReply = await sendMessage(messageToSend);
      const aiMessage: Message = {
        type: "ai",
        content: aiReply?.text ?? "The assistant did not return a valid response.",
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        type: "ai",
        content: error || "Something went wrong while contacting the AI agent. Please try again later.",
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="mx-auto bg-[#191B1D] h-full max-h-screen overflow-hidden">
      <div className="bg-[#191B1D] rounded-xl h-[450px] flex flex-col max-w-3xl mx-auto">
        {/* Chat Header with Clear Button */}
        {messages.length > 0 && (
          <div className="border-b border-gray-800 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#5901E8]" />
              <span className="text-white font-medium text-sm">AI Assistant</span>
              <span className="text-gray-500 text-xs">({messages.length} messages)</span>
            </div>
            <div className="flex items-center gap-2">
              {!showClearConfirm ? (
                <motion.button
                  onClick={() => setShowClearConfirm(true)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Clear conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs mr-2">Clear all?</span>
                  <motion.button
                    onClick={handleClearConversation}
                    className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    onClick={() => setShowClearConfirm(false)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}

        {messages.length === 0 ? (
          // Initial presentation view
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-[#5901E8]/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#5901E8]" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">AI Assistant</h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-xl mx-auto">I'll help you learn and create with eERC20 tokens. Ask me anything!</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => handlePresetClick("What is eERC20 and how does it work?")}
                  className="bg-[#121416] p-4 rounded-xl border border-[#5901E8]/10 hover:border-[#5901E8]/30 hover:bg-[#121416]/80 transition-all duration-200 text-left group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[#5901E8]/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#5901E8]/30 transition-colors">
                    <MessageSquareText className="w-4 h-4 text-[#5901E8]" />
                  </div>
                  <h3 className="text-white font-medium mb-2 text-sm">What is eERC20?</h3>
                  <p className="text-gray-400 text-xs">Learn about eERC20 technology and its benefits</p>
                </button>
                <button
                  onClick={() => handlePresetClick("How do I create my first eERC20 token?")}
                  className="bg-[#121416] p-4 rounded-xl border border-[#5901E8]/10 hover:border-[#5901E8]/30 hover:bg-[#121416]/80 transition-all duration-200 text-left group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[#5901E8]/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#5901E8]/30 transition-colors">
                    <Coins className="w-4 h-4 text-[#5901E8]" />
                  </div>
                  <h3 className="text-white font-medium mb-2 text-sm">Create Token</h3>
                  <p className="text-gray-400 text-xs">Step-by-step guide to create your token</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Chat view with messages
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4" style={{ scrollBehavior: "smooth" }}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex items-start gap-2 sm:gap-3 group ${message.type === "user" ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" ? "bg-[#5901E8]/20" : "bg-[#5901E8]/10"
                  }`}
                >
                  {message.type === "user" ? <User className="w-5 h-5 text-[#5901E8]" /> : <Bot className="w-5 h-5 text-[#5901E8]" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex-1 rounded-xl p-3 relative group ${
                    message.type === "user" ? "bg-[#5901E8]/20 ml-4 sm:ml-12 max-w-[85%] sm:max-w-xl" : "bg-[#121416] mr-4 sm:mr-12 max-w-[85%] sm:max-w-xl"
                  }`}
                >
                  {/* Message Actions - positioned better */}
                  <div
                    className={`absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10 ${
                      message.type === "user" ? "-left-2" : "-right-2"
                    }`}
                  >
                    {message.type === "user" && editingMessageId !== message.id && (
                      <motion.button
                        onClick={() => handleEditMessage(message.id, message.content)}
                        className="p-1.5 text-gray-400 hover:text-blue-400 bg-[#121416] hover:bg-blue-500/10 rounded-md border border-gray-700 hover:border-blue-500/30 transition-all duration-200 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit message"
                      >
                        <Edit3 className="w-3 h-3" />
                      </motion.button>
                    )}
                    {message.type === "ai" && (
                      <motion.button
                        onClick={() => handleCopyMessage(message.content, message.id)}
                        className="p-1.5 text-gray-400 hover:text-green-400 bg-[#121416] hover:bg-green-500/10 rounded-md border border-gray-700 hover:border-green-500/30 transition-all duration-200 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      </motion.button>
                    )}
                  </div>

                  {/* Message Content */}
                  {editingMessageId === message.id ? (
                    <div className="space-y-4">
                      {/* Edit Header */}
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center">
                          <Edit3 className="w-3 h-3 text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-white">Edit Message</span>
                        <div className="flex-1" />
                        <span className="text-xs text-gray-500">Press Enter + Cmd/Ctrl to save</span>
                      </div>

                      {/* Edit Input Area */}
                      <div className="relative">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full bg-[#0A0B0D] border border-gray-600 rounded-lg p-4 text-white text-sm resize-none focus:outline-none focus:border-[#5901E8]/70 focus:ring-2 focus:ring-[#5901E8]/20 transition-all duration-200 shadow-inner"
                          rows={4}
                          autoFocus
                          placeholder="Type your message here..."
                          onKeyDown={(e) => {
                            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                              e.preventDefault();
                              handleSaveEdit(message.id);
                            }
                            if (e.key === "Escape") {
                              e.preventDefault();
                              handleCancelEdit();
                            }
                          }}
                        />

                        {/* Character Counter */}
                        <div className="absolute bottom-2 right-3 text-xs text-gray-500">{editingContent.length} chars</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded text-xs">Esc</kbd>
                            <span>to cancel</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded text-xs">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded text-xs">↵</kbd>
                            <span>to save</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-all duration-200 font-medium border border-gray-500 hover:border-gray-400"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            onClick={() => handleSaveEdit(message.id)}
                            className="px-4 py-2 bg-gradient-to-r from-[#5901E8] to-[#7C3AED] hover:from-[#5901E8]/90 hover:to-[#7C3AED]/90 text-white text-sm rounded-lg transition-all duration-200 font-medium shadow-lg shadow-[#5901E8]/25 border border-[#5901E8]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!editingContent.trim()}
                          >
                            <Check className="w-3 h-3" />
                            Save & Send
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-white whitespace-pre-line text-sm sm:text-base">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        {copiedMessageId === message.id && (
                          <motion.span
                            className="text-xs text-green-400 font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            Copied!
                          </motion.span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div className="flex items-start gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#5901E8]/10">
                  <Bot className="w-5 h-5 text-[#5901E8]" />
                </div>
                <div className="bg-[#121416] rounded-xl p-3 max-w-xs">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-2">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Fixed Input Area */}
        <div className="border-t border-gray-800 bg-[#191B1D] p-3 sm:p-4">
          <form onSubmit={handleFormSubmit} className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
              <MessageSquareText className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about eERC20 tokens, creation process, or any questions..."
              className="w-full bg-[#121416] border border-gray-700 rounded-xl pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#5901E8]/50 focus:ring-2 focus:ring-[#5901E8]/20 transition-all duration-200"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-[#5901E8] rounded-lg p-1.5 sm:p-2 text-white hover:bg-[#5901E8]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#5901E8]"
              disabled={!inputMessage.trim() || isTyping}
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CLIContent = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, commandName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandName);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const commands = [
    {
      name: "Build Linux",
      command: "pkg . --target node18-linux-x64 --output nova-deployer-linux",
      description: "Build executable for Linux (node18-linux-x64)",
    },
    {
      name: "Build Windows",
      command: "pkg . --target node18-win-x64 --output nova-deployer-win.exe --compress=Brotli",
      description: "Build executable for Windows (node18-win-x64)",
    },
    {
      name: "Build macOS",
      command: "pkg . --target node18-macos-x64 --output nova-deployer-macos",
      description: "Build executable for macOS (node18-macos-x64)",
    },
    {
      name: "Build All",
      command: "pkg . --targets node18-win-x64,node18-macos-x64,node18-linux-x64 --compress=Brotli",
      description: "Build executables for all supported platforms",
    },
    {
      name: "Run",
      command: "npm run start",
      description: "Run the application",
    },
  ];

  return (
    <motion.div className="bg-[#191B1D] rounded-xl flex flex-col" variants={containerVariants} initial="hidden" animate="visible">
      <div className="p-6 sm:p-8 text-center mt-12">
        <motion.div className="mb-8 max-w-3xl mx-auto text-left" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-4">Download and use our CLI</h2>
          <p className="text-gray-400 mb-4">
            🚀 Get started now! Download our CLI for your platform and unlock the power to 💬 chat, 📚 learn all about ERC-20 tokens, and 🛠️ create your own
            tokens effortlessly.
          </p>
        </motion.div>

        {/* Download Buttons */}
        <motion.div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4" variants={itemVariants}>
          <motion.a
            href="https://conexiones-star.concilbot.com/fileblocks/agritrace/a21d92c9-76ed-47c7-8abc-220c402a50bd.nova-deployer-macos"
            download
            className="bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#5901E8]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AppleLogo className="w-5 h-5" />
            Download for macOS
          </motion.a>

          <motion.a
            href="https://conexiones-star.concilbot.com/fileblocks/agritrace/d6b4b278-7923-41a4-a906-7bba88751e73.exe"
            download
            className="bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#5901E8]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WindowsLogo className="w-5 h-5" />
            Download for Windows
          </motion.a>

          <motion.a
            href="https://conexiones-star.concilbot.com/fileblocks/agritrace/c176e3ca-4172-420d-afe5-891b310456c7.nova-deployer-linux"
            download
            className="bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#5901E8]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinuxLogo className="w-5 h-5" />
            Download for Linux
          </motion.a>
        </motion.div>

        {/* Commands Documentation */}
        <motion.div className="flex flex-col items-center justify-center mx-auto" variants={containerVariants}>
          <motion.h3 className="text-xl font-bold text-white mb-2 mt-16 w-full max-w-3xl text-left" variants={itemVariants}>
            Learn how to develop an eERC20 CLI tool like this
          </motion.h3>
          <motion.p className="text-gray-400 mb-6 w-full max-w-3xl text-left" variants={itemVariants}>
            Clone the repo below, install dependencies, set the environment variable, and you're ready to go!
          </motion.p>
          <motion.p className="text-gray-400 mb-6 w-full max-w-3xl text-left" variants={itemVariants}>
            Follow these steps:
          </motion.p>

          <motion.div className="flex flex-col items-center justify-center mx-auto max-w-3xl gap-8" variants={containerVariants}>
            <motion.div className="text-left text-gray-400 max-w-3xl w-full" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <GitHubLogo className="w-6 h-6 text-gray-300" />
                Step 1: Clone the Repository
              </h3>
              <p>
                Clone the repo from{" "}
                <a
                  href="https://github.com/didierjey8/novabid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5901E8] hover:text-[#5901E8]/80 transition-colors"
                >
                  GitHub Repository
                </a>
              </p>
              <pre className="bg-[#0A0B0D] rounded-lg p-4 text-sm font-mono text-gray-300 mt-2 border border-gray-700">
                <code>git clone https://github.com/didierjey8/novabid.git</code>
              </pre>
            </motion.div>

            <motion.div className="text-left text-gray-400 max-w-3xl w-full" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <NPMLogo className="w-6 h-6 text-red-500" />
                Step 2: Install Dependencies & Set Environment Variable
              </h3>
              <p className="mb-3">After cloning, navigate to the project directory and install dependencies:</p>
              <pre className="bg-[#0A0B0D] rounded-lg p-4 text-sm font-mono text-gray-300 mb-3 border border-gray-700">
                <code>cd novabit-cli-backend && npm install</code>
              </pre>
              <p className="mb-3">Then, set the environment variable:</p>
              <pre className="bg-[#0A0B0D] rounded-lg p-4 text-sm font-mono text-gray-300 border border-gray-700">
                <code>export WEBHOOKN8N="https://n8ndev.solconexion.com/webhook/novabid-bot"</code>
              </pre>

              <motion.div className="mt-8 w-full max-w-4xl" variants={itemVariants}>
                <div className="mb-6">
                  <img src="/assets/N8N.png" alt="n8n workflow diagram" className="w-full max-w-4xl rounded-xl mb-6 border border-gray-700 mx-auto" />
                  <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </motion.div>
                    Workflow Steps Explained
                  </h4>
                  <p className="text-gray-400">Understand how our AI-powered eERC20 creation system works</p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Step 1 */}
                  <motion.div
                    className="bg-gradient-to-br from-[#121416] to-[#0A0B0D] rounded-xl p-6 border border-[#5901E8]/20 hover:border-[#5901E8]/40 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#5901E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Zap className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h5 className="text-white font-bold text-lg">Step 1</h5>
                          <p className="text-blue-400 font-semibold">Novabid WebHook</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Purpose:</span>
                            <p className="text-gray-300 text-sm">Receives external requests/events to trigger the workflow</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">When used:</span>
                            <p className="text-gray-300 text-sm">Automatically starts the process when external data arrives</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    className="bg-gradient-to-br from-[#121416] to-[#0A0B0D] rounded-xl p-6 border border-[#5901E8]/20 hover:border-[#5901E8]/40 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#5901E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Bot className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h5 className="text-white font-bold text-lg">Step 2</h5>
                          <p className="text-green-400 font-semibold">AI Agent</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Purpose:</span>
                            <p className="text-gray-300 text-sm">Main decision-maker that analyzes input and coordinates actions</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[#5901E8] font-semibold text-sm">Connected tools:</p>
                          <div className="space-y-1 ml-4">
                            <div className="flex items-center gap-2">
                              <MessageSquareText className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-300 text-sm">Chat Model: Language understanding</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CircleDollarSign className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-300 text-sm">Memory: Previous interactions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-300 text-sm">createContracts: Contract creation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    className="bg-gradient-to-br from-[#121416] to-[#0A0B0D] rounded-xl p-6 border border-[#5901E8]/20 hover:border-[#5901E8]/40 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#5901E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Code2 className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h5 className="text-white font-bold text-lg">Step 3</h5>
                          <p className="text-purple-400 font-semibold">Basic LLM Chain</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Purpose:</span>
                            <p className="text-gray-300 text-sm">Processes and generates intelligent text responses</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Function:</span>
                            <p className="text-gray-300 text-sm">Converts AI Agent decisions into coherent, contextual outputs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 4 */}
                  <motion.div
                    className="bg-gradient-to-br from-[#121416] to-[#0A0B0D] rounded-xl p-6 border border-[#5901E8]/20 hover:border-[#5901E8]/40 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#5901E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Send className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h5 className="text-white font-bold text-lg">Step 4</h5>
                          <p className="text-orange-400 font-semibold">Respond to Webhook</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Purpose:</span>
                            <p className="text-gray-300 text-sm">Sends final processed response back to the requesting system</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5901E8] rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-[#5901E8] font-semibold">Output:</span>
                            <p className="text-gray-300 text-sm">Delivers both input data and generated response</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Support Components */}
                <motion.div
                  className="bg-gradient-to-r from-[#5901E8]/10 to-[#8E3AFF]/10 rounded-xl p-6 border border-[#5901E8]/30 mb-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                    <h5 className="text-white font-bold text-xl">Support Components</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 bg-[#121416]/50 rounded-lg p-3 border border-[#5901E8]/20">
                      <Bot className="w-5 h-5 text-[#5901E8]" />
                      <div>
                        <p className="text-white font-semibold text-sm">OpenAI Chat Model</p>
                        <p className="text-gray-400 text-xs">Advanced text understanding</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#121416]/50 rounded-lg p-3 border border-[#5901E8]/20">
                      <CircleDollarSign className="w-5 h-5 text-[#5901E8]" />
                      <div>
                        <p className="text-white font-semibold text-sm">Simple Memory</p>
                        <p className="text-gray-400 text-xs">Context storage</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#121416]/50 rounded-lg p-3 border border-[#5901E8]/20">
                      <FileText className="w-5 h-5 text-[#5901E8]" />
                      <div>
                        <p className="text-white font-semibold text-sm">createContracts</p>
                        <p className="text-gray-400 text-xs">Automated creation</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Flow Diagram */}
                <motion.div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-600" whileHover={{ scale: 1.01 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                    <h5 className="text-white font-bold text-lg">Complete Workflow</h5>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-300 flex-wrap justify-center">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg font-medium">Webhook triggers</span>
                      <ArrowRight className="w-4 h-4 text-[#5901E8]" />
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg font-medium">AI Agent analyzes</span>
                      <ArrowRight className="w-4 h-4 text-[#5901E8]" />
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg font-medium">LLM processes</span>
                      <ArrowRight className="w-4 h-4 text-[#5901E8]" />
                      <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg font-medium">System responds</span>
                    </div>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-4">With memory retention and tool execution as needed</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <h3 className="text-xl font-bold text-white text-left w-full flex items-center gap-2">
              <NodeJSLogo className="w-6 h-6 text-green-500" />
              Step 3: Start the Application
            </h3>
            <motion.div
              className="bg-[#121416] rounded-xl p-4 border border-gray-800/50 w-full"
              variants={itemVariants}
              whileHover={{
                borderColor: "rgba(89, 1, 232, 0.3)",
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#5901E8]" />
                  <h4 className="text-white font-medium">Run</h4>
                </div>
                <motion.button
                  onClick={() => copyToClipboard("npm run start", "Run")}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {copiedCommand === "Run" ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </div>
              <p className="text-gray-400 text-sm mb-3 text-left">
                Use <code className="font-mono bg-gray-800 px-2 py-1 rounded text-green-400">npm run start</code> to launch the application.
              </p>

              <div className="bg-[#0A0B0D] rounded-lg p-3">
                <code className="text-gray-300 text-sm font-mono block text-left">$ npm run start</code>
              </div>
            </motion.div>

            <motion.div className="text-left text-gray-400 max-w-3xl" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-4 mt-8">Step 4: Build Executables (Optional)</h3>
              <p>If you want to create executable files for different platforms, use one of the commands below:</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full" variants={containerVariants}>
              {commands
                .filter((cmd) => cmd.name !== "Run")
                .map((cmd, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#121416] rounded-xl p-4 border border-gray-800/50"
                    variants={itemVariants}
                    whileHover={{
                      borderColor: "rgba(89, 1, 232, 0.3)",
                      scale: 1.02,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#5901E8]" />
                        <h4 className="text-white font-medium">{cmd.name}</h4>
                      </div>
                      <motion.button
                        onClick={() => copyToClipboard(cmd.command, cmd.name)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copiedCommand === cmd.name ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 text-left">{cmd.description}</p>
                    <div className="bg-[#0A0B0D] rounded-lg p-3">
                      <code className="text-gray-300 text-sm font-mono block text-left">$ {cmd.command}</code>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>

          <motion.div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4" variants={containerVariants}>
            {[
              { icon: Zap, title: "Fast Deployment", desc: "Deploy tokens in seconds", color: "text-yellow-500" },
              { icon: Terminal, title: "CLI Interface", desc: "Professional command-line tools", color: "text-green-500" },
              { icon: CheckCircle, title: "Automated Validation", desc: "Built-in parameter checking", color: "text-blue-500" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#121416] rounded-xl p-4 border border-[#5901E8]/10 text-center"
                variants={itemVariants}
                whileHover={{
                  borderColor: "rgba(89, 1, 232, 0.3)",
                  scale: 1.05,
                }}
              >
                <motion.div
                  className="w-10 h-10 bg-[#5901E8]/20 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`w-5 h-5 ${feature.color || "text-[#5901E8]"}`} />
                </motion.div>
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EercPage = () => {
  const [activeTab, setActiveTab] = useState("Form");

  // Chat state - persistent across tab changes
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Form":
        return <TokenForm />;
      case "AI Chat":
        return (
          <AIContent
            messages={messages}
            setMessages={setMessages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        );
      case "CLI":
        return <CLIContent />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="p-2 sm:p-4 lg:p-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Tabs Navigation - Full Width */}
      <motion.div className="w-full mb-6 lg:mb-8" variants={tabVariants}>
        <motion.div
          className="bg-[#191B1D] rounded-2xl p-2 w-full border border-gray-800/30 shadow-xl shadow-black/20"
          whileHover={{ borderColor: "rgba(89, 1, 232, 0.2)" }}
        >
          <div className="grid grid-cols-3 gap-2 w-full">
            {[
              { name: "Form", icon: FormInput, label: "Token Creator", description: "Create your eERC20 token" },
              { name: "AI Chat", icon: MessageSquareText, label: "AI Assistant", description: "Get smart guidance" },
              { name: "CLI", icon: Terminal, label: "CLI Tool", description: "Command line interface" },
            ].map(({ name, icon: Icon, label, description }) => (
              <motion.button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`relative px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 group overflow-hidden ${
                  activeTab === name
                    ? "bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] text-white shadow-lg shadow-[#5901E8]/30 border border-[#5901E8]/30"
                    : "text-gray-400 hover:text-white hover:bg-[#121416] border border-transparent hover:border-[#5901E8]/20 hover:shadow-lg hover:shadow-[#5901E8]/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Background Effect for Active Tab */}
                <AnimatePresence>
                  {activeTab === name && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#5901E8]/10 to-[#8E3AFF]/10 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-all duration-300 relative z-10 ${
                      activeTab === name ? "text-white drop-shadow-sm" : "text-gray-400 group-hover:text-[#5901E8] group-hover:drop-shadow-sm"
                    }`}
                  />
                </motion.div>

                {/* Text Content */}
                <div className="relative z-10 text-center sm:text-left">
                  {/* Mobile: Show only name */}
                  <span className="block sm:hidden text-xs font-medium">{name}</span>

                  {/* Desktop: Show label and description */}
                  <div className="hidden sm:block">
                    <span className="block font-semibold text-sm lg:text-base">{label}</span>
                    <span
                      className={`block text-xs lg:text-sm transition-colors duration-300 ${
                        activeTab === name ? "text-white/80" : "text-gray-500 group-hover:text-gray-400"
                      }`}
                    >
                      {description}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                {activeTab !== name && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5901E8]/5 to-[#8E3AFF]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Indicator */}
        <motion.div className="mt-4 flex justify-center" variants={tabVariants}>
          <div className="flex space-x-2">
            {["Form", "AI Chat", "CLI"].map((tab, index) => (
              <motion.div
                key={tab}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeTab === tab ? "w-8 bg-gradient-to-r from-[#5901E8] to-[#8E3AFF] shadow-sm shadow-[#5901E8]/50" : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                layoutId="activeTab"
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div className="w-full" variants={tabVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.3,
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default EercPage;

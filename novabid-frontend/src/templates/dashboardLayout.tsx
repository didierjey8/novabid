import {
    LayoutDashboard,
    Wallet,
    BarChart3,
    Gavel,
    Droplets,
    HelpCircle,
    Menu,
    KeyIcon,
    ArrowRight,
} from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import bg1 from "@/assets/dashboard/bg1.png"
import logo from "@/assets/logo.png"
import avalanche from "@/assets/dashboard/avalanche.png"
import eerc from "@/assets/dashboard/erc.png"
import { useAccount } from 'wagmi';
import { EERCProvider } from '@/contexts/EERCContext';

const menuItems = [
    {
        name: 'Wallet',
        path: '/wallet',
        icon: Wallet,
        badge: null
    },
    {
        name: 'Polls',
        path: '/polls',
        icon: BarChart3,
        badge: null
    },
    {
        name: 'Auctions',
        path: '/auctions',
        icon: Gavel,
        badge: null
    },
    {
        name: 'Faucet',
        path: '/faucet',
        icon: Droplets,
        badge: null
    },
    /* {
        name: 'Create eERC20',
        path: '/create-eerc',
        icon: KeyIcon,
        badge: null
    } */
];

export default function NovaBidDashboard_Layaut() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const { chain } = useAccount();

    return (<EERCProvider network={(chain?.id==43113?"testnet":"mainnet")}>
        <div className="flex bg-black min-h-screen h-full">
            {/* Sidebar */}
            <aside className={`
                w-[290px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
                flex flex-col border-r border-gray-700 min-h-screen h-full
                fixed
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                z-50
            `}>
                {/* Logo */}
                <div className="p-6 py-[26px]">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-all duration-200"
                        onClick={() => {
                            navigate("/");
                            setIsOpen(false);
                        }}
                    >
                        <div className="w-8 h-8 bg-[#5901E8] rounded-full flex items-center justify-center">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[18px] font-bold text-white">NovaBid</span>
                            <span className="text-[16px] text-gray-400">The future of private bid</span>
                        </div>
                    </div>

                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 flex flex-col border-t border-gray-800 bg-[#191B1D] overflow-y-auto" style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: "100% 100%",
                }}>
                    <div className="mb-8 mt-5">
                        {/* <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-[#191B1D] border border-gray-800 text-gray-400">
                            <Search className="w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none w-full"
                            />
                            <span className="text-sm bg-[#1F2123] px-2 py-1 rounded-md">⌘1</span>
                        </div> */}
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3 mt-0">TRACK 1: MAIN</h3>
                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        onClick={() => {
                                            navigate(item.path);
                                            setIsOpen(false);
                                        }}
                                        key={item.path}
                                        className={`w-full flex items-center ${item.badge ? 'justify-between' : ''} px-3 py-3 rounded-xl ${isActive
                                            ? 'bg-gradient-to-r from-purple-800 to-bg-[#191B1D] text-white shadow-lg border border-purple-700'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50 cursor-pointer'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className={isActive ? 'font-medium' : ''}>{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-800">
                                                {item.badge}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3 mt-8">Track 2: Create</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-300 hover:bg-[#1F2123] cursor-pointer transition-all bg-[#0E121B]" onClick={() => {
                                    navigate("/create-eerc");
                                    setIsOpen(false);
                                }}>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        <span>Create eERC20</span>
                                    </div>
                                    {/*   <span className="text-sm bg-[#1F2123] px-2 py-1 rounded-md">⌘1</span> */}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="space-y-1 mb-8">
                        <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 cursor-pointer transition-all group" onClick={() => {
                            navigate("/");
                            setIsOpen(false);
                        }}>
                            <div className="flex items-center space-x-3">
                                <LayoutDashboard className="w-5 h-5" />
                                <span>Landing Page</span>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 cursor-pointer transition-all" onClick={() => {
                            navigate("/faq");
                            setIsOpen(false);
                        }}>
                            <HelpCircle className="w-5 h-5" />
                            <span>Help / FAQ</span>
                        </button>
                    </div>
                </div>
            </aside>
            
            {/* Spacer for sidebar on large screens */}
            <div className="hidden lg:block w-[290px]"></div>
            
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Fixed Mobile Header */}
                <div className="lg:hidden fixed top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-[#121416]/95 backdrop-blur-md border-b border-gray-700/50">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-all duration-200"
                        onClick={() => {
                            navigate("/");
                            setIsOpen(false);
                        }}
                    >
                        <img src={logo} alt="logo" className="w-8 h-8" />
                        <span className="text-xl text-white font-semibold">NovaBid</span>
                    </div>
                    
                    {/* Mobile powered by section */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#191B1D]/80 rounded-lg px-2 py-1 border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center space-x-2">
                                <img src={avalanche} alt="avalanche" className="h-3.5 opacity-90" />
                                <div className="w-px h-3 bg-gray-600"></div>
                                <img src={eerc} alt="eerc" className="h-3.5 opacity-90" />
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block bg-gradient-to-r from-[#121416] via-[#1a1d21] to-[#121416] border-b border-gray-700/50">
                    <div className="px-8 py-5">
                        <div className="flex items-center justify-center mt-3">
                            {/* Powered by section - Desktop version */}
                            <div className="w-full flex justify-between items-center px-4 py-2">
                                
                                <div className="bg-[#191B1D]/80 rounded-lg px-3 py-1.5 border border-gray-700/30 backdrop-blur-sm mx-auto">
                                    <div className="flex items-center space-x-3 justify-center">
                                    <span className="text-lg text-gray-400 font-medium">Powered by</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-px h-3 bg-gray-600"></div>
                                        <img src={avalanche} alt="avalanche" className="h-9 opacity-90" />
                                        <div className="w-px h-3 bg-gray-600"></div>
                                        <img src={eerc} alt="eerc" className="h-7 opacity-90" />
                                    </div>
                                    </div>
                                </div>
                                
                                <appkit-button label="Connect wallet" size="sm" />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Main Content Area with proper spacing for fixed header */}
                <main className="flex-1 bg-[#121416] pt-[88px] lg:pt-0">
                    <Outlet />
                </main>
            </div>
        </div>
    </EERCProvider>)
}
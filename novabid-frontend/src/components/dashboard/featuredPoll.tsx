import featuredPoll from "@/assets/dashboard/featurepoll.png"

export default function FeaturedPoll() {
    return (
        <div className="bg-[#191B1D] border border-gray-700 rounded-2xl p-6 relative overflow-hidden">


            {/* Content */}
            <div className="relative z-10">
                <img src={featuredPoll} alt="featuredPoll" className="w-full h-full mb-6" />
                <h2 className="text-white text-xl font-bold mb-3">Featured Poll: Platform Governance</h2>
                <p className="text-purple-100 text-sm mb-8 leading-relaxed">
                    Vote on the future development priorities for NovaBid. Your privacy is guaranteed through our eERC20 token
                    system.
                </p>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                    Participate Now
                </button>
            </div>
        </div>
    )
}

import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
	const handleClick = () => {
		window.history.back()
	};

	return (
		<button 
			onClick={handleClick} 
			className="flex justify-center items-center font-medium text-white hover:text-purple-800 focus:outline-none"
		>
			<ChevronLeft className="inline mr-2" />
			Back
		</button>
	)
}

export default BackButton;
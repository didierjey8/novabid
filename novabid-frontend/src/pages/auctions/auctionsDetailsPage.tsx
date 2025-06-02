import AuctionsDetails from "@/components/auctions/auctionsDetails";
import BackButton from "@/components/auctions/backButton";

const AuctionsDetailsPage = () => {

  return (
    <div className="md:p-6 p-4">
      <BackButton />
      <AuctionsDetails />
    </div>
  );
};

export default AuctionsDetailsPage;
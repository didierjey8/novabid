import AuctionsResults from "@/components/auctions/auctionsResults";
import BackButton from "@/components/auctions/backButton";

const AuctionsResultsPage = () => {

  return (
    <div className="md:p-6 p-4">
      <BackButton />
      <AuctionsResults />
    </div>
  );
};

export default AuctionsResultsPage;
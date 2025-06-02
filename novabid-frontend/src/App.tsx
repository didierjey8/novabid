import { Routes, Route } from 'react-router-dom';
import NovaBidDashboard_Layaut from '@/templates/dashboardLayout';
import Dashboard from '@/pages/dashboard/dashboard';
import Wallet from '@/pages/wallet/wallet';
import Polls from '@/pages/polls/polls';
import VotingPage from '@/pages/polls/votingPage';
import ResultsPage from '@/pages/polls/resultsPage';
import FAQ from '@/pages/faq/faq';
import Auctions from '@/pages/auctions/auctions';
import AuctionsDetails from '@/pages/auctions/auctionsDetails';
import FaucetPage from '@/pages/faucet/faucetPage';
import EercPage from '@/pages/eerc/eerc';
import Landing from '@/pages/landing';
function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />
      
      {/* Dashboard Routes */}
      <Route element={<NovaBidDashboard_Layaut />}>
        <Route path="/dashboard" element={<Wallet />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/polls/:id" element={<VotingPage />} />
        <Route path="/polls/results/:id" element={<ResultsPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<AuctionsDetails />} />
        <Route path="/faucet" element={<FaucetPage />} />
        <Route path="/create-eerc" element={<EercPage />} />
      </Route>
    </Routes>
  );
}

export default App;
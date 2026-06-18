import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AIAssistantButton from './components/AIAssistantButton';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import MyListings from './pages/MyListings';
import EditListing from './pages/EditListing';
import ListingDetails from './pages/ListingDetails';
import SavedListings from './pages/SavedListings';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import Bookings from './pages/Bookings';
import About from './pages/About';
import Contact from './pages/Contact';
import JoinCommunity from './pages/JoinCommunity';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<JoinCommunity />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/edit-listing/:id" element={<EditListing />} />
            <Route path="/saved" element={<SavedListings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:listingId/:userId" element={<Chat />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </main>
        <AIAssistantButton />
        <div className="h-20 md:hidden shrink-0" aria-hidden="true" />
        <BottomNav />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
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
      <footer className="bg-white border-t py-12 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-gray-900 mb-2 text-xl tracking-tight">STUDENT HOUSING <span className="text-primary font-black">RW</span></p>
          <p className="text-sm">&copy; 2026 Verified Housing Marketplace. Built for Rwanda.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

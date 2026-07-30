import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Places from './pages/Places';
import Activities from './pages/Activities.tsx';
import ColoringBook from './pages/ColoringBook';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
import Puzzle from './pages/Puzzle';
import Missions from './pages/Missions.tsx';
import Memory from './pages/Memory';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/coloring" element={<ColoringBook />} />
            <Route path="/activities/quiz" element={<Quiz />} />
            <Route path="/activities/puzzle" element={<Puzzle />} />
            <Route path="/activities/missions" element={<Missions />} />
            <Route path="/activities/memory" element={<Memory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

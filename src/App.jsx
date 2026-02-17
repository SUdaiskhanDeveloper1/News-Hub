
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="bbc-logo">BBC</span>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>News</h4>
              <a href="#">Home</a>
              <a href="#">World</a>
              <a href="#">Technology</a>
              <a href="#">Business</a>
            </div>
            <div className="footer-section">
              <h4>Sport</h4>
              <a href="#">Football</a>
              <a href="#">Cricket</a>
              <a href="#">Rugby</a>
              <a href="#">Tennis</a>
              <a href="#">Hockey</a>
              <a href="#">Golf</a>
            </div>
            <div className="footer-section">
              <h4>Weather</h4>
              <a href="#">UK Weather</a>
              <a href="#">World Weather</a>
            </div>
            <div className="footer-section">
              <h4>More</h4>
              <a href="#">About BBC</a>
              <a href="#">Contact Us</a>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Sudais Khan. All Right Reserved </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
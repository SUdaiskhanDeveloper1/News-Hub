import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: "Home", path: "/" },
    { name: "World", path: "/" },
    { name: "Technology", path: "/" },
    { name: "Business", path: "" },
    { name: "Science", path: "" },
    { name: "Health", path: "" },
    { name: "Entertainment", path: "/" },
    { name: "Sports", path: "/" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="nav-top">
            <div className="nav-left">
              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/" className="logo">
                <span className="bbc-logo">BBC</span>
              </Link>
            </div>

            <div className="nav-right">
              <div className="nav-actions">
                <form className="search-form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search BBC"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <Search size={18} />
                  </button>
                  <button
                    className="search-cancel-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    X
                  </button>
                </form>
                <div style={{ display: "flex", gap: "16px" }}>
                  <button className="sign-in-btn">Sign in</button>
                  <button className="subscribe-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          <div className={`nav-bottom ${isMenuOpen ? "mobile-open" : ""}`}>
            <div className="nav-categories">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="breaking-news">
        <div className="container">
          <div className="breaking-news-content">
            <span className="breaking-label">BREAKING NEWS</span>
            <div className="breaking-scroll">
              <span className="breaking-text">
                Latest Apple innovations revealed - New product lineup expected
                this fall
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

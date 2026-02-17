import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Share2 } from "lucide-react";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;


  const url =
    "https://newsapi.org/v2/everything?" +
    "q=Apple&" +
    "from=2026-02-01&" +
    "sortBy=popularity&" +
    `apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          throw new Error(data.message || "Failed to fetch news");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading latest news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error Loading News</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4, 10);
  const sidebarArticles = articles.slice(10, 15);

  return (
    <div className="home-page">
      <div className="container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to BBC News</h1>
          <p className="welcome-subtitle">Trusted news from around the world</p>
        </div>

        <div className="news-layout">
          <div className="main-content">
            {featuredArticle && (
              <section className="featured-section">
                <div className="featured-article">
                  <div className="featured-image">
                    <img
                      src={
                        featuredArticle.urlToImage || "/placeholder-news.jpg"
                      }
                      alt={featuredArticle.title}
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0zMDAgMjI1TDM1MCAyNzVNMzUwIDE3NUwzMDAgMjc1IiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIzNTAiIHk9IjIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==";
                      }}
                    />
                    <div className="featured-badge">TOP STORY</div>
                  </div>
                  <div className="featured-content">
                    <h1 className="featured-title">
                      <a
                        href={featuredArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {featuredArticle.title}
                      </a>
                    </h1>
                    <p className="featured-description">
                      {featuredArticle.description}
                    </p>
                    <div className="article-meta">
                      <span className="meta-item">
                        <Clock size={14} />
                        {getTimeAgo(featuredArticle.publishedAt)}
                      </span>
                      <span className="meta-item">
                        <User size={14} />
                        {featuredArticle.author?.split(",")[0] || "BBC News"}
                      </span>
                      <button className="share-btn">
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="secondary-featured">
              <h2 className="section-heading">Latest News</h2>
              <div className="secondary-grid">
                {secondaryArticles.map((article, index) => (
                  <article key={index} className="secondary-article">
                    <div className="secondary-image">
                      <img
                        src={article.urlToImage || "/placeholder-news.jpg"}
                        alt={article.title}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwTDE1MCAxMzVNMTUwIDY1TDEyMCAxMzUiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5OTk5Ij5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";
                        }}
                      />
                    </div>
                    <div className="secondary-content">
                      <h3>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </h3>
                      <div className="article-meta">
                        <span>{getTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="news-grid-section">
              <h2 className="section-heading">More News</h2>
              <div className="news-grid">
                {gridArticles.map((article, index) => (
                  <article key={index} className="news-card">
                    <div className="card-image">
                      <img
                        src={article.urlToImage || "/placeholder-news.jpg"}
                        alt={article.title}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTEyTDIwMCAxNjVNMTIwIDYyTDE1MCAxNjIiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5OTk5Ij5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h3>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p className="card-description">
                        {article.description?.substring(0, 100)}...
                      </p>
                      <div className="card-meta">
                        <span>{getTimeAgo(article.publishedAt)}</span>
                        <span>•</span>
                        <span>{article.source.name}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="sidebar">
            <div className="sidebar-widget">
              <h3 className="widget-title">Most Read</h3>
              <div className="most-read-list">
                {sidebarArticles.map((article, index) => (
                  <div key={index} className="most-read-item">
                    <span className="read-rank">{index + 1}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">Live Updates</h3>
              <div className="live-updates">
                <div className="live-item">
                  <div className="live-badge">LIVE</div>
                  <p>
                    Apple announces new product event scheduled for next week
                  </p>
                  <span className="live-time">2m ago</span>
                </div>
                <div className="live-item">
                  <div className="live-badge">LIVE</div>
                  <p>Tech markets react to latest Apple innovations</p>
                  <span className="live-time">15m ago</span>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">Weather</h3>
              <div className="weather-widget">
                <div className="weather-current">
                  <span className="weather-temp">21°C</span>
                  <span className="weather-desc">Sunny</span>
                  <span className="weather-location">London</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

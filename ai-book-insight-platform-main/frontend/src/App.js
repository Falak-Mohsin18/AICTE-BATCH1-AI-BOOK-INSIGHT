import { useEffect, useState } from "react";
import "./App.css";

// --- Custom SVGs for Vintage Cozy Theme ---

const QuillLogo = () => (
  <svg viewBox="0 0 64 64" className="header-logo" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 52c-6-6-15-6-22-6v-32c7 0 16 0 22 6 6-6 15-6 22-6v32c-7 0-16 0-22 6z" />
    <path d="M32 20v32" />
    <path d="M48 10c-5 2-10 6-12 12-2 4-2 9-2 14v10" strokeWidth="2" />
    <path d="M34 46l-4 4 1-5" />
    <path d="M36 28c3-1 6-3 8-6M35 36c4-1 7-4 9-7" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="search-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
  </svg>
);

const CornerFlourish = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`card-corner-flourish ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M4 4h12M4 4v12M7 7h6M7 7v6" strokeLinecap="round" />
    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
    <circle cx="9" cy="9" r="0.8" fill="currentColor" />
  </svg>
);

const BookWithLanternSVG = () => (
  <svg viewBox="0 0 100 100" className="card-sketch" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 78h48c3.5 0 5.5-2 5.5-4s-2-4-5.5-4H15v8z" />
    <path d="M63 70v8M15 70v8" />
    <path d="M18 70h42c2.5 0 4.5-2 4.5-4s-2-4-4.5-4H18v8z" />
    <path d="M60 62v8M18 62v8" />
    <path d="M22 62h34c2 0 3.5-1.5 3.5-3s-1.5-3-3.5-3H22v6z" />
    <path d="M72 78h16v-2H72v2z" />
    <path d="M74 76l2-16h8l2 16H74z" />
    <path d="M76 60V51h4v9" />
    <path d="M74 51h8" />
    <circle cx="78" cy="47" r="2.5" />
    <path d="M78 68c0.8-1.5 0.8-3 0-4s-1.5 2.5 0 4z" fill="currentColor" stroke="none" />
  </svg>
);

const BookWithQuillSVG = () => (
  <svg viewBox="0 0 100 100" className="card-sketch" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 78c-10-8-25-8-36-8V28c11 0 26 0 36 8 10-8 25-8 36-8v42c-11 0-26 0-36 8z" />
    <path d="M50 36v42" />
    <path d="M70 18C62 25 57 38 56 51c-1 8 0 18 2 24l-4 4 1-6" strokeWidth="2" />
    <path d="M58 37c5-1 10-4 13-8" />
    <path d="M57 49c6-1 11-4 15-8" />
    <path d="M20 78h10v-5H20v5z" />
    <path d="M22 73l1.5-5h5l1.5 5H22z" />
  </svg>
);

const BookWithLeavesSVG = () => (
  <svg viewBox="0 0 100 100" className="card-sketch" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 82h45c3 0 5-2 5-4s-2-4-5-4H15v8z" />
    <g transform="rotate(-12 35 62)">
      <path d="M20 68h40c2.5 0 4.5-2 4.5-4s-2-4-4.5-4H20v8z" />
    </g>
    <path d="M72 82c5-5 8-15 5-25M70 72c-3-3-8-4-10-1" />
    <path d="M76 67c3-2 8-1 9 3" />
    <path d="M74 57c-2-3-7-3-9 0" />
    <path d="M77 47c3-3 7-1 8 2" />
    <path d="M12 72C8 58 10 42 18 30" />
    <path d="M11 58c1.5-1.5 4-1.5 5.5 0M13 47c1.5-1.5 4-1.5 5.5 0M15 36c1.5-1.5 4-1.5 5.5 0" />
  </svg>
);

const getSketchForIndex = (index) => {
  const modulo = index % 3;
  if (modulo === 0) return <BookWithLanternSVG />;
  if (modulo === 1) return <BookWithQuillSVG />;
  return <BookWithLeavesSVG />;
};

function App() {
  const [books, setBooks] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/books/")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const askAI = async () => {
    const res = await fetch("http://localhost:8000/ask/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="container">
      <div className="header-container">
        <QuillLogo />
        <h1>AI Book Insight</h1>
        <p className="subtitle">Discover. Ask. Understand.</p>
      </div>

      <div className="search-box">
        <div className="search-wrapper">
          <SearchIcon />
          <input
            type="text"
            placeholder="Ask about books..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button onClick={askAI}>
          <SparklesIcon />
          Ask AI
        </button>
      </div>

      {answer && (
        <div className="answer-box">
          <h3>
            <SparklesIcon />
            Answer:
          </h3>
          <p>{answer}</p>
        </div>
      )}

      <div className="section-divider">
        <div className="divider-line"></div>
        <h2 className="section-title">Books</h2>
        <div className="divider-line"></div>
      </div>

      {/* Elegant scroll flourish under the books divider */}
      <svg className="flourish-accent" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10 10c15 0 20-8 40-8s25 8 40 8" />
        <path d="M10 10c15 0 20 8 40 8s25-8 40-8" />
        <circle cx="50" cy="10" r="2.5" fill="currentColor" />
        <circle cx="35" cy="10" r="1.2" fill="currentColor" />
        <circle cx="65" cy="10" r="1.2" fill="currentColor" />
      </svg>

      <div className="card-list">
        {books.map((book, index) => (
          <div key={book.id || index} className="card">
            {/* Vintage corner flourishes */}
            <CornerFlourish className="flourish-tl" />
            <CornerFlourish className="flourish-tr" />
            <CornerFlourish className="flourish-bl" />
            <CornerFlourish className="flourish-br" />

            <div className="card-sketch-container">
              {getSketchForIndex(index)}
            </div>

            <div className="card-content">
              <h3>{book.title}</h3>
              {/* If price matches description from scraper, display it correctly formatted */}
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
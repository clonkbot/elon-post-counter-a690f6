import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  // Simulate a "realistic" random post count for today
  useEffect(() => {
    const timer = setTimeout(() => {
      // Random between 47 and 127 - feels Elon-realistic
      const count = Math.floor(Math.random() * 80) + 47;
      setPostCount(count);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Increment post count occasionally for "realism"
  useEffect(() => {
    if (isLoading) return;
    const incrementInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPostCount(prev => prev + 1);
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 8000);
    return () => clearInterval(incrementInterval);
  }, [isLoading]);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getVerdict = () => {
    if (postCount < 50) return { text: 'SUSPICIOUSLY QUIET', color: '#ffcc00' };
    if (postCount < 80) return { text: 'NORMAL BEHAVIOR', color: '#00ff88' };
    if (postCount < 100) return { text: 'ELEVATED POSTING', color: '#ff9500' };
    return { text: 'MAXIMUM OVERDRIVE', color: '#ff0044' };
  };

  const verdict = getVerdict();

  return (
    <div className={`app ${glitchActive ? 'glitch-active' : ''}`}>
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Noise texture */}
      <div className="noise" />

      {/* Breaking ticker */}
      <div className="ticker">
        <div className="ticker-content">
          <span className="ticker-alert">LIVE</span>
          <span>MONITORING X HEADQUARTERS</span>
          <span className="ticker-divider">///</span>
          <span>REAL-TIME POST SURVEILLANCE ACTIVE</span>
          <span className="ticker-divider">///</span>
          <span>DISCLAIMER: NUMBERS ARE SATIRICAL</span>
          <span className="ticker-divider">///</span>
          <span>TOUCH GRASS RECOMMENDED</span>
          <span className="ticker-divider">///</span>
        </div>
      </div>

      <main className="main">
        {/* Header */}
        <header className="header">
          <div className="header-glitch" data-text="HOW MANY POSTS DID">HOW MANY POSTS DID</div>
          <h1 className="title">
            <span className="title-name">ELON MUSK</span>
          </h1>
          <div className="header-sub">SHARE ON <span className="x-logo">𝕏</span> TODAY?</div>
        </header>

        {/* The Number */}
        <div className="counter-section">
          {isLoading ? (
            <div className="loading">
              <span className="loading-text">INTERCEPTING</span>
              <span className="loading-text">DATA FEED</span>
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          ) : (
            <>
              <div className={`number-container ${glitchActive ? 'number-glitch' : ''}`}>
                <span className="number" data-text={postCount}>{postCount}</span>
              </div>
              <div className="posts-label">POSTS</div>
            </>
          )}
        </div>

        {/* Status */}
        {!isLoading && (
          <div className="status-section">
            <div className="status-label">STATUS:</div>
            <div className="status-verdict" style={{ color: verdict.color }}>
              {verdict.text}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="timestamp">
          <div className="timestamp-date">{formatDate()}</div>
          <div className="timestamp-time">{formatTime()}</div>
        </div>

        {/* Decorative elements */}
        <div className="decoration decoration-1">[CLASSIFIED]</div>
        <div className="decoration decoration-2">SYS://XPOST.MONITOR.v2.0</div>
        <div className="decoration decoration-3">
          <span className="blink">REC</span> ● RECORDING
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>Requested by <a href="https://x.com/amk0x" target="_blank" rel="noopener noreferrer">@amk0x</a> · Built by <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  );
}

export default App;

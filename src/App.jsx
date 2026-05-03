import React from 'react'
import './App.css'

function App() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge animate-fade-in">Coming Soon</div>
        <h1 className="hero-title animate-fade-in">
          우리들의 힙한 모임,<br/>
          <span className="gradient-text">모임풀(MoimPull)</span>
        </h1>
        <p className="hero-desc animate-fade-in">
          해외의 Partiful처럼 감각적인 초대장을 이제 한국에서도.<br/>
          카톡 공유 한 번으로 완벽한 파티를 시작하세요.
        </p>
        <div className="hero-actions animate-fade-in">
          <button className="primary-btn">초대장 만들기</button>
          <button className="secondary-btn">둘러보기</button>
        </div>
      </header>

      {/* Feature Section */}
      <section className="features">
        <div className="feature-card animate-fade-in">
          <span className="feature-icon">✨</span>
          <h3>감각적인 디자인</h3>
          <p>MZ세대의 취향을 저격하는 다양한 파티 템플릿</p>
        </div>
        <div className="feature-card animate-fade-in" style={{animationDelay: '0.2s'}}>
          <span className="feature-icon">🗳️</span>
          <h3>실시간 RSVP & 투표</h3>
          <p>참석 여부부터 메뉴 결정까지 실시간으로</p>
        </div>
        <div className="feature-card animate-fade-in" style={{animationDelay: '0.4s'}}>
          <span className="feature-icon">📸</span>
          <h3>공유 사진첩</h3>
          <p>파티의 추억을 게스트들과 함께 공유하세요</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 MoimPull. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

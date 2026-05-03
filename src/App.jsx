import React, { useState } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState('landing') // 'landing' | 'create' | 'success'
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    fee: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateClick = (e) => {
    e.preventDefault()
    setView('create')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('초대장 생성 데이터:', formData)
    setView('success')
  }

  if (view === 'create') {
    return (
      <div className="create-container">
        <button className="back-btn" onClick={() => setView('landing')}>← 돌아가기</button>
        <h2 className="create-title">모임 정보 입력 📝</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">모임 제목</label>
            <input 
              type="text" name="title" className="form-input" placeholder="예: 연남동 힙한 집들이" 
              value={formData.title} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label className="form-label">일시</label>
            <input 
              type="datetime-local" name="date" className="form-input" 
              value={formData.date} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label className="form-label">장소</label>
            <input 
              type="text" name="location" className="form-input" placeholder="상세 주소 또는 장소명" 
              value={formData.location} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label className="form-label">회비 (선택)</label>
            <input 
              type="text" name="fee" className="form-input" placeholder="예: 인당 2만원" 
              value={formData.fee} onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">초대장 생성하기 ✨</button>
        </form>
      </div>
    )
  }

  if (view === 'success') {
    return (
      <div className="landing-container animate">
        <div className="hero-badge">Success!</div>
        <h1 className="hero-title">초대장 완성! 🎉</h1>
        <p className="hero-desc">
          <strong>{formData.title}</strong> 초대장이 성공적으로 만들어졌습니다.<br/>
          이제 친구들에게 공유해 보세요.
        </p>
        <button className="primary-btn" onClick={() => setView('landing')}>처음으로</button>
      </div>
    )
  }

  return (
    <div className="landing-container animate">
      <header className="hero">
        <div className="hero-badge">Coming Soon</div>
        <h1 className="hero-title">
          우리들의 힙한 모임,<br/>
          <span className="gradient-text">모임풀(MoimPull)</span>
        </h1>
        <p className="hero-desc">
          해외의 Partiful처럼 감각적인 초대장을 이제 한국에서도.<br/>
          카톡 공유 한 번으로 완벽한 파티를 시작하세요.
        </p>
        <div className="hero-actions">
          <a href="#" className="primary-btn" onClick={handleCreateClick}>초대장 만들기</a>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">✨</span>
          <h3>감각적인 디자인</h3>
          <p>MZ세대의 취향을 저격하는 다양한 파티 템플릿</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🗳️</span>
          <h3>실시간 RSVP & 투표</h3>
          <p>참석 여부부터 메뉴 결정까지 실시간으로</p>
        </div>
      </section>
    </div>
  )
}

export default App

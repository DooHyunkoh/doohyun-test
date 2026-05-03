import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [rsvpStatus, setRsvpStatus] = useState(null)
  const [guests, setGuests] = useState([
    { id: 1, name: '민지', status: '참석', emoji: '🦋' },
    { id: 2, name: '해린', status: '참석', emoji: '🐱' },
    { id: 3, name: '다니엘', status: '참석', emoji: '🐶' },
    { id: 4, name: '하니', status: '고민중', emoji: '🐰' },
    { id: 5, name: '혜인', status: '고민중', emoji: '🐣' },
  ])

  const [poll, setPoll] = useState({
    question: '파티 메인 메뉴로 뭐가 좋을까요?',
    options: [
      { id: 1, text: '치킨 & 피자 🍕', votes: 8 },
      { id: 2, text: '족발 & 보쌈 🍖', votes: 3 },
      { id: 3, text: '회 & 해산물 🍣', votes: 2 },
    ]
  })

  const [votedId, setVotedId] = useState(null)

  useEffect(() => {
    const savedStatus = localStorage.getItem('moimPull_rsvp_v2')
    if (savedStatus) setRsvpStatus(savedStatus)
    
    const savedVote = localStorage.getItem('moimPull_vote')
    if (savedVote) setVotedId(parseInt(savedVote))
  }, [])

  const handleVote = (id) => {
    if (votedId) return
    setVotedId(id)
    localStorage.setItem('moimPull_vote', id)
    setPoll(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }))
  }

  const handleRsvp = (status) => {
    if (rsvpStatus === status) return;
    setRsvpStatus(status)
    localStorage.setItem('moimPull_rsvp_v2', status)
    
    const myName = '나 (You)'
    setGuests(prev => {
      const filtered = prev.filter(g => g.name !== myName)
      if (status === '불참') return filtered
      return [{ id: Date.now(), name: myName, status, emoji: '😎' }, ...filtered]
    })
  }

  const copyAccount = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('카카오뱅크 3333-01-1234567')
      alert('계좌번호가 복사되었습니다! 💸')
    } else {
      alert('계좌번호: 카카오뱅크 3333-01-1234567\n직접 복사해 주세요!')
    }
  }

  return (
    <div className="app-container animate-fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <span className="event-badge">HOUSEWARMING</span>
          <h1 className="event-title">고도리의 힙한<br/>연남동 집들이 🏠</h1>
        </div>
      </div>

      <div className="main-content">
        {/* Host Info */}
        <div className="host-section">
          <img className="host-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kodori" alt="host" />
          <div>
            <div className="host-name">고도리</div>
            <div className="host-label">초대장 만든 호스트</div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="info-grid">
          <div className="info-box">
            <span className="info-icon">📅</span>
            <span className="info-title">일시</span>
            <span className="info-text">5월 16일 (토) 오후 7:00</span>
          </div>

          <div className="info-box">
            <span className="info-icon">📍</span>
            <span className="info-title">장소</span>
            <span className="info-text">연남동 힙플레이스 (연남로 123)</span>
            <div className="map-buttons">
              <a href="#" className="map-btn">네이버 지도</a>
              <a href="#" className="map-btn">카카오 맵</a>
            </div>
          </div>

          <div className="info-box">
            <span className="info-icon">💸</span>
            <span className="info-title">회비 및 정산</span>
            <span className="info-text">인당 25,000원</span>
            <button className="copy-btn" onClick={copyAccount}>계좌번호 복사</button>
          </div>
        </div>

        {/* Poll Section */}
        <div className="poll-section animate-fade-in">
          <div className="section-h">{poll.question} 🗳️</div>
          <div className="poll-option-list">
            {poll.options.map(opt => {
              const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0)
              const percent = Math.round((opt.votes / totalVotes) * 100)
              return (
                <div key={opt.id} className="poll-option" onClick={() => handleVote(opt.id)}>
                  <div className="poll-bar" style={{ width: `${percent}%` }}></div>
                  <div className="poll-text">
                    <span>{opt.text} {votedId === opt.id && '✅'}</span>
                    <span className="poll-percent">{percent}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Guest List */}
        <div className="guest-list-wrap">
          <div className="section-h">
            게스트 현황
            <span className="guest-count">{guests.filter(g => g.status === '참석').length}명 참석 확정</span>
          </div>
          <div className="guest-scroll">
            {guests.map(guest => (
              <div key={guest.id} className="guest-card">
                <div className="guest-circle">
                  {guest.emoji}
                  <div className={`status-dot ${guest.status === '참석' ? 'dot-yes' : 'dot-maybe'}`}></div>
                </div>
                <div className="guest-name-small">{guest.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery (Mock) */}
        <div className="social-section">
          <div className="section-h">파티 갤러리 📸</div>
          <div className="photo-grid">
            <div className="photo-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=300)'}}></div>
            <div className="photo-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300)'}}></div>
            <div className="photo-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300)'}}></div>
          </div>
        </div>

        {/* Comments (Mock) */}
        <div className="social-section">
          <div className="section-h">기대평 & 메시지 💬</div>
          <div className="comment-list">
            <div className="comment-item">
              <div className="guest-circle" style={{width: '32px', height: '32px', fontSize: '0.9rem'}}>🦋</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">민지</span>
                  <span className="comment-time">방금 전</span>
                </div>
                <div className="comment-text">집들이 선물 뭐 사갈까요? 추천 받아요! 😊</div>
              </div>
            </div>
            <div className="comment-item">
              <div className="guest-circle" style={{width: '32px', height: '32px', fontSize: '0.9rem'}}>🐱</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">해린</span>
                  <span className="comment-time">10분 전</span>
                </div>
                <div className="comment-text">드디어 집들이! 너무 기대돼요 ㅠㅠ</div>
              </div>
            </div>
          </div>
          <div className="comment-input-wrap">
            <input type="text" className="comment-input" placeholder="호스트에게 한마디 남기기..." />
            <button className="comment-submit">전송</button>
          </div>
        </div>
      </div>

      {/* Floating RSVP Bar */}
      <div className="rsvp-floating-bar">
        <div className="rsvp-options">
          <button 
            className={`btn-main btn-yes ${rsvpStatus === '참석' ? 'active' : ''}`}
            onClick={() => handleRsvp('참석')}
          >
            참석할게요! 🔥
          </button>
          <button 
            className={`btn-sub ${rsvpStatus === '고민중' ? 'active' : ''}`}
            onClick={() => handleRsvp('고민중')}
          >
            🤔
          </button>
          <button 
            className={`btn-sub ${rsvpStatus === '불참' ? 'active' : ''}`}
            onClick={() => handleRsvp('불참')}
          >
            👋
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

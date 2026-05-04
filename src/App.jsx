import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const RESULTS = [
  {
    type: '주식/코인형 (Aggressive)',
    score: 95,
    advice: '당신은 차트를 꿰뚫어 보는 "매의 눈"을 가졌군요. 시장의 변동성을 즐기며 단기 주식 매매나 코인 투자에서 큰 수익을 거둘 관상입니다. 과감한 결단력이 당신의 가장 큰 무기입니다.',
  },
  {
    type: '부동산/금형 (Stable)',
    score: 88,
    advice: '덕망 있고 차분한 인상입니다. 시간이 지날수록 가치가 오르는 자산에 운이 따릅니다. 부동산이나 금과 같은 안정적인 투자처에서 당신의 재물운이 꽃을 피울 것입니다. 장기적인 안목이 훌륭하시네요.',
  },
  {
    type: '자수성가형 (Energetic)',
    score: 92,
    advice: '끊임없는 에너지와 도전 정신이 얼굴에 나타나 있습니다. 스스로 기회를 창출하고 사업을 통해 막대한 부를 쌓을 관상입니다. 올해는 서쪽에서 귀인이 나타나 당신의 성공을 도울 운세입니다.',
  },
];

function App() {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * RESULTS.length);
      const randomScoreOffset = Math.floor(Math.random() * 5); // 0~4
      const finalResult = {
        ...RESULTS[randomIndex],
        score: RESULTS[randomIndex].score + randomScoreOffset
      };
      
      setResult(finalResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleShare = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const link = document.createElement('a');
      link.download = 'my-fortune.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const reset = () => {
    setImage(null);
    setIsAnalyzing(false);
    setResult(null);
  };

  return (
    <div className="container">
      <header>
        <h1>AI 재물복 판독기</h1>
        <p className="subtitle">당신의 얼굴 속에 숨겨진 부자의 기운을 찾아보세요</p>
      </header>

      <main>
        {!image && (
          <div 
            className="upload-area" 
            onClick={() => fileInputRef.current.click()}
          >
            <div className="upload-icon">📸</div>
            <p>얼굴 사진을 업로드하거나 드래그하세요</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
        )}

        {image && !result && (
          <div className="preview-container">
            <img src={image} alt="Preview" className="preview-image" />
            {isAnalyzing && <div className="scanning-line"></div>}
          </div>
        )}

        {isAnalyzing && (
          <div className="analyzing-text">AI가 당신의 관상을 분석 중입니다...</div>
        )}

        {result && (
          <div ref={resultRef} className="result-card">
            <div className="result-content">
              <div className="score-badge">재물운 점수: {result.score}점</div>
              <div className="investment-type">{result.type}</div>
              <p className="advice">{result.advice}</p>
              
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleShare}>결과 저장하기</button>
                <button className="btn btn-secondary" onClick={reset}>다시 테스트하기</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '3rem', color: '#444', fontSize: '0.8rem' }}>
        <p>© 2026 AI Wealth Fortune Reader. No images are stored on our server.</p>
      </footer>
    </div>
  );
}

export default App;

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const RESULTS = [
  {
    type: '용모수려한 주식/코인 투자자',
    score: 95,
    wealthLuck: '전체적인 이목구비의 조화가 뛰어나 타고난 재물운이 매우 강력합니다.\n특히 이마에서 뿜어져 나오는 기운이 좋아 중년 이후 큰 부를 축적할 명조입니다.',
    investmentAdvice: '당신은 차트를 꿰뚫어 보는 "매의 눈"을 가졌군요. 눈매가 날카롭고 눈동자가 맑아 시장의 변동성을 즐기며 단기 주식 매매나 코인 투자에서 큰 수익을 거둘 관상입니다. 코끝이 도톰하여 재물을 모으는 힘이 강하므로, 공격적인 투자 후 수익을 빠르게 실현하여 자산을 굳히는 전략이 유리합니다. 과감한 결단력이 당신의 가장 큰 무기입니다.',
  },
  {
    type: '안정적인 부동산/금 자산가',
    score: 88,
    wealthLuck: '덕망 있고 차분한 인상에서 나오는 안정적인 기운이 돋보입니다.\n입꼬리가 살짝 올라가 있어 들어온 재물이 쉽게 나가지 않는 수성(守成)의 운세입니다.',
    investmentAdvice: '귀가 두툼하고 귓볼이 아래로 향해 있어 인내심이 강한 관상입니다. 시간이 지날수록 가치가 오르는 자산에 운이 따르므로, 부동산이나 금과 같은 실물 자산 투자에서 당신의 재물운이 꽃을 피울 것입니다. 눈썹 사이가 넓어 마음이 여유로우니 조급한 단타보다는 5년 이상의 장기적인 안목으로 우량 자산을 선점하는 것이 부자가 되는 지름길입니다.',
  },
  {
    type: '열정적인 자수성가형 사업가',
    score: 92,
    wealthLuck: '끊임없는 에너지와 도전 정신이 턱의 기운과 광대뼈에서 나타나 있습니다.\n스스로 기회를 창출하고 사업을 통해 막대한 부를 쌓을 수 있는 강력한 활동력을 가진 관상입니다.',
    investmentAdvice: '광대뼈가 적당히 솟아 있어 인복이 많고 사람을 이끄는 힘이 강합니다. 시스템을 구축하는 사업이나 스타트업 투자를 통해 레버리지를 활용하는 것이 좋습니다. 법령(팔자주름)이 뚜렷하여 사회적 지위와 명예가 따르니, 자신의 브랜드를 구축하거나 전문 분야에서 창업을 한다면 서쪽에서 나타나는 귀인의 도움으로 큰 성공을 거둘 것입니다.',
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
      link.download = 'my-wealth-fortune.png';
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
              
              <section className="result-section">
                <h3>💰 재물운 분석</h3>
                <p className="wealth-luck">{result.wealthLuck}</p>
              </section>

              <section className="result-section">
                <h3>📈 관상학적 투자 조언</h3>
                <p className="investment-advice">{result.investmentAdvice}</p>
              </section>
              
              <div className="btn-group no-capture">
                <button className="btn btn-primary" onClick={handleShare}>결과 저장하기</button>
                <button className="btn btn-secondary" onClick={reset}>다시 테스트하기</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '3rem', color: '#888', fontSize: '0.8rem' }}>
        <p>© 2026 AI Wealth Fortune Reader. No images are stored on our server.</p>
      </footer>
    </div>
  );
}

export default App;

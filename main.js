
const getNumberColor = (number) => {
    if (number <= 10) return '#F44336'; // Red
    if (number <= 20) return '#FF9800'; // Orange
    if (number <= 30) return '#FFEB3B'; // Yellow
    if (number <= 40) return '#4CAF50'; // Green
    return '#2196F3'; // Blue
};

class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    text-align: center;
                }
                h1 {
                    font-size: var(--font-size-h1, 3rem);
                    color: var(--primary-color, #BB86FC);
                    text-shadow: 0 0 10px var(--primary-color, #BB86FC), 0 0 20px var(--primary-color, #BB86FC);
                    margin-bottom: 2rem;
                }
                .generator-container {
                    background-color: var(--surface-color, #1E1E1E);
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: var(--shadow-deep, 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23));
                    container-type: inline-size;
                }
                #lotto-balls-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                .lotto-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: var(--font-size-large, 1.5rem);
                    font-weight: bold;
                    color: #fff;
                    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
                    box-shadow: var(--shadow-lifted, 0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06));
                    transition: all 0.3s ease;
                }
                #generate-button {
                    background-color: var(--primary-color, #BB86FC);
                    color: var(--background-color, #121212);
                    border: none;
                    padding: 1rem 2rem;
                    font-size: var(--font-size-medium, 1.2rem);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 5px var(--primary-color, #BB86FC), 0 0 10px var(--primary-color, #BB86FC);
                }
                #generate-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 10px var(--primary-color, #BB86FC), 0 0 20px var(--primary-color, #BB86FC), 0 0 30px var(--primary-color, #BB86FC);
                }
            </style>
            <div class="generator-container">
                <h1>Lotto Number Generator</h1>
                <div id="lotto-balls-container"></div>
                <button id="generate-button">Generate Numbers</button>
            </div>
        `;

        this.generateButton = this.shadowRoot.querySelector('#generate-button');
        this.lottoBallsContainer = this.shadowRoot.querySelector('#lotto-balls-container');

        this.generateButton.addEventListener('click', () => this.render());
    }

    connectedCallback() {
        this.render();
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return [...numbers];
    }

    render() {
        this.lottoBallsContainer.innerHTML = '';
        const numbers = this.generateNumbers();
        numbers.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('lotto-ball');
            ball.textContent = number;
            ball.style.backgroundColor = getNumberColor(number);
            this.lottoBallsContainer.appendChild(ball);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

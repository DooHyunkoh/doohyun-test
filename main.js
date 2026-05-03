
const getNumberColor = (number) => {
    if (number <= 10) return '#F44336'; // Red
    if (number <= 20) return '#FF9800'; // Orange
    if (number <= 30) return '#FFEB3B'; // Yellow
    if (number <= 40) return '#4CAF50'; // Green
    return '#2196F3'; // Blue
};

const generateLottoSet = () => {
    const numbers = new Set();
    while (numbers.size < 7) { // 6 main + 1 bonus
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const numbersArray = [...numbers];
    const mainNumbers = numbersArray.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = numbersArray[6];
    return { mainNumbers, bonusNumber };
};

const createBallElement = (number, isBonus = false) => {
    const ball = document.createElement('div');
    ball.classList.add('lotto-ball');
    if (isBonus) ball.classList.add('bonus-ball');
    ball.textContent = number;
    ball.style.backgroundColor = getNumberColor(number);
    return ball;
};

const render = () => {
    const lottoBallsContainer = document.querySelector('#lotto-balls-container');
    if (!lottoBallsContainer) return;
    
    lottoBallsContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const setRow = document.createElement('div');
        setRow.classList.add('lotto-set-row');
        
        const { mainNumbers, bonusNumber } = generateLottoSet();
        
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-numbers');
        mainNumbers.forEach(num => {
            mainContainer.appendChild(createBallElement(num));
        });
        
        const plusSign = document.createElement('span');
        plusSign.classList.add('plus-sign');
        plusSign.textContent = '+';
        
        const bonusContainer = document.createElement('div');
        bonusContainer.classList.add('bonus-container');
        bonusContainer.appendChild(createBallElement(bonusNumber, true));
        
        setRow.appendChild(mainContainer);
        setRow.appendChild(plusSign);
        setRow.appendChild(bonusContainer);
        lottoBallsContainer.appendChild(setRow);
    }
};

const initTheme = () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.querySelector('#generate-button');
    if (generateButton) {
        generateButton.addEventListener('click', render);
    }
    
    initTheme();
    // Initial render is removed so numbers only appear on click
});

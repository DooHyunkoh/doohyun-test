
const getNumberColor = (number) => {
    if (number <= 10) return '#F44336'; // Red
    if (number <= 20) return '#FF9800'; // Orange
    if (number <= 30) return '#FFEB3B'; // Yellow
    if (number <= 40) return '#4CAF50'; // Green
    return '#2196F3'; // Blue
};

const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...numbers].sort((a, b) => a - b);
};

const render = () => {
    const lottoBallsContainer = document.querySelector('#lotto-balls-container');
    if (!lottoBallsContainer) return;
    
    lottoBallsContainer.innerHTML = '';
    const numbers = generateNumbers();
    numbers.forEach(number => {
        const ball = document.createElement('div');
        ball.classList.add('lotto-ball');
        ball.textContent = number;
        ball.style.backgroundColor = getNumberColor(number);
        lottoBallsContainer.appendChild(ball);
    });
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
    // Initial render
    render();
});

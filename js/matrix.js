class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.initialize();
        this.initializeStatusUpdates();
    }

    initialize() {
        // Установка размеров canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Инициализация капель
        this.initDrops();

        // Запуск анимации
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Пересчет количества колонок
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Сброс и реинициализация капель при изменении размера
        this.initDrops();
    }

    initDrops() {
        this.drops = [];
        for(let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    animate() {
        // Полупрозрачный черный фон для создания эффекта затухания
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Настройка стиля текста
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        // Отрисовка символов
        for(let i = 0; i < this.drops.length; i++) {
            // Случайный символ
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Отрисовка символа
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            // Если капля достигла низа или случайно
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            // Движение капли вниз
            this.drops[i]++;
        }

        // Следующий кадр
        requestAnimationFrame(() => this.animate());
    }

    initializeStatusUpdates() {
        // Обновление статусов
        setInterval(() => {
            // Случайный уровень глубины
            const depths = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4', 'LEVEL_5'];
            document.getElementById('depthValue').textContent = 
                depths[Math.floor(Math.random() * depths.length)];

            // Случайный уровень сигнала
            const signal = Math.floor(Math.random() * 20 + 80);
            document.getElementById('signalValue').textContent = `${signal}%`;

            // Случайный статус
            const statuses = ['CONNECTED', 'SCANNING', 'PROCESSING', 'ANALYZING'];
            document.getElementById('statusValue').textContent = 
                statuses[Math.floor(Math.random() * statuses.length)];
        }, 2000);
    }
}

// Функция выбора таблетки
function choosePill(color) {
    const overlay = document.querySelector('.matrix-overlay');
    const message = document.querySelector('.matrix-message');
    
    if (color === 'red') {
        message.innerHTML = 'Добро пожаловать в реальный мир...';
        overlay.style.animation = 'fadeToWhite 3s forwards';
        setTimeout(() => {
            window.location.href = 'terminal.html';
        }, 3000);
    } else {
        message.innerHTML = 'Программа будет перезагружена...';
        overlay.style.animation = 'fadeToBlack 3s forwards';
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 3000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new MatrixEffect();

    // Добавляем случайные глюч-эффекты
    setInterval(() => {
        const glitchText = document.querySelector('.glitch-text');
        if (Math.random() < 0.1) { // 10% шанс глюча
            glitchText.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(255,0,0,0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(0,255,0,0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(0,0,255,0.7)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '';
            }, 50);
        }
    }, 100);
}); 
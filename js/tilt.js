class CyberTilt {
    constructor(element) {
        this.element = element;
        this.initTilt();
    }

    initTilt() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.element.style.transform = 
                `perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 
                'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Добавляем эффект свечения при движении
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.element.style.setProperty('--mouse-x', `${x}px`);
            this.element.style.setProperty('--mouse-y', `${y}px`);
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => new CyberTilt(card));
}); 
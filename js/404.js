document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.querySelector('.terminal-text');
    const messages = [
        '> ERROR: страница не найдена',
        '> проверка системы...',
        '> поиск альтернативных путей...',
        '> попытка восстановления...',
        '> FAILED',
        '> _'
    ];
    
    let messageIndex = 0;
    terminal.innerHTML = '';

    function typeMessage() {
        if (messageIndex < messages.length) {
            const text = messages[messageIndex];
            let charIndex = 0;

            function typeChar() {
                if (charIndex < text.length) {
                    terminal.innerHTML += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    terminal.innerHTML += '<br>';
                    messageIndex++;
                    setTimeout(typeMessage, 500);
                }
            }

            typeChar();
        }
    }

    typeMessage();

    // Добавляем случайные глюч-эффекты
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% шанс глюча
            const glitch = document.querySelector('.glitch');
            glitch.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(0,255,0,0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(255,0,0,0.7)
            `;
            setTimeout(() => {
                glitch.style.textShadow = '';
            }, 50);
        }
    }, 250);
}); 
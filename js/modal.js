document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('secretModal');
    const btn = document.getElementById('secretBtn');
    const closeBtn = document.querySelector('.close-btn');

    // Открытие модального окна
    btn.onclick = () => {
        modal.style.display = "block";
    }

    // Закрытие по крестику
    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    // Закрытие по клику вне окна
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
}); 
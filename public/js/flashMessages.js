document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.querySelector('.message');

    if (messageElement) {
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 500);
        }, 5000);
    }
});

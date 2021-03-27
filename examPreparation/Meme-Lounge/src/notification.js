const box = document.getElementById('errorBox');
const span = box.children[0];

export function notify(message) {
    span.textContent = message;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}
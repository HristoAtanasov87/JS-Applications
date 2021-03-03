function attachEvents() {
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    sendBtn.addEventListener('click', sendRequest);
    refreshBtn.addEventListener('click', getRequest);
}

attachEvents();

async function sendRequest() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const name = document.getElementById('author');
    const message = document.getElementById('content');

    if (name === '' || message === '') {
        return alert('All fields are required');
    }
    const data = { author: name.value, content: message.value };

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });

    name.value = '';
    message.value = '';
}

async function getRequest() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url);
    const data = await response.json();

    const textarea = document.getElementById('messages');
    const messages = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n')
    textarea.textContent = messages;
}
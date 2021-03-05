function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadPhones);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createContact);
}

attachEvents();

async function loadPhones() {
    const ulRef = document.getElementById('phonebook');
    ulRef.innerHTML = '';
    ulRef.addEventListener('click', deleteButton);
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const phonebook = await response.json();

    Object.values(phonebook).map(parseContacts).forEach(c => ulRef.appendChild(c));
}

async function deleteButton(ev) {
    if (ev.target.tagName !== 'BUTTON') {
        return;
    }

    const key = ev.target.dataset.key;

    const url = `http://localhost:3030/jsonstore/phonebook/${key}`;
    const response = await fetch(url, {
        method: 'delete'
    });

    loadPhones()
}

async function createContact() {
    const personRef = document.getElementById('person');
    const phoneRef = document.getElementById('phone');
    if (personRef.value === '' || phoneRef.value === '') {
        return alert('All fields are required');
    }
    const data = { person: personRef.value.trim(), phone: phoneRef.value.trim() };

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });
    personRef.value = '';
    phoneRef.value = '';

    loadPhones();
}


function parseContacts(contact) {
    let liElement = document.createElement('li');
    liElement.textContent = `${contact.person}: ${contact.phone}`;

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.dataset.key = contact._id;

    liElement.appendChild(button)
    return liElement;
}
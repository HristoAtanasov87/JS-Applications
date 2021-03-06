window.addEventListener('load', () => {
    loadCatches();
    checkForToken();
});

function controls() {
    document.getElementById('addForm').addEventListener('submit', createCatch);
    document.querySelector('.load').addEventListener('click', loadCatches);
    document.getElementById('catches').addEventListener('click', handleUpdateDelete);
    document.getElementById('logout').addEventListener('click', logout);
}
controls();

function checkForToken() {
    const token = sessionStorage.getItem('userToken');
    if (token !== null) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        document.querySelector('#addForm [class="add"]').removeAttribute('disabled');
        Object.values(document.querySelectorAll('.update')).forEach(b => b.removeAttribute('disabled'));
        Object.values(document.querySelectorAll('.delete')).forEach(b => b.removeAttribute('disabled'));

    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        document.querySelector('#addForm [class="add"]').setAttribute('disabled', true);
    }
}

async function loadCatches() {
    const catchesRef = document.getElementById('catches');
    catchesRef.innerHTML = '';

    const url = 'http://localhost:3030/data/catches';
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).map(createCard).forEach(c => {
        catchesRef.appendChild(c);
    });
    checkForToken();
}

async function createCatch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        angler: formData.get('angler'),
        weight: formData.get('weight'),
        species: formData.get('species'),
        location: formData.get('location'),
        bait: formData.get('bait'),
        captureTime: formData.get('captureTime')
    }

    if (data.angler === '' || data.weight === '' || data.species === '' || data.location === '' || data.bait === '' || data.captureTime === '') {
        return alert('All fields are required!');
    }

    const url = 'http://localhost:3030/data/catches';
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify(data)
    });

    if (response.ok !== true) {
        const error = response.json();
        return alert(error.message);
    }

    loadCatches();
}

function createCard(card) {
    const element = e('div', { className: 'catch' },
        e('input', { type: 'hidden', name: 'id', value: `${card._id}` }),
        e('input', { type: 'hidden', name: 'ownerId', value: `${card._ownerId}` }),
        e('label', {}, 'Angler'),
        e('input', { type: 'text', class: 'angler', value: `${card.angler}` }),
        e('hr', {}),
        e('label', {}, 'Weight'),
        e('input', { type: 'number', class: 'weight', value: `${card.weight}` }),
        e('hr', {}),
        e('label', {}, 'Species'),
        e('input', { type: 'text', class: 'species', value: `${card.species}` }),
        e('hr', {}),
        e('label', {}, 'Location'),
        e('input', { type: 'text', class: 'location', value: `${card.location}` }),
        e('hr', {}),
        e('label', {}, 'Bait'),
        e('input', { type: 'text', class: 'bait', value: `${card.bait}` }),
        e('hr', {}),
        e('label', {}, 'Capture Time'),
        e('input', { type: 'number', class: 'captureTime', value: `${card.captureTime}` }),
        e('hr', {}),
        e('button', { className: 'update', disabled: true }, 'Update'),
        e('button', { className: 'delete', disabled: true }, 'Delete'));


    return element;
}

function handleUpdateDelete(event) {
    if (event.target.className == 'update') {
        const catchId = Array.from(event.target.parentNode.children)[0].value;
        const catchOwnerId = Array.from(event.target.parentNode.children)[1].value;
        if (catchOwnerId === sessionStorage.getItem('userId')) {
            update(catchId, event);
        } else {
            alert('Not authorized!');
            loadCatches()
        }
    } else if (event.target.className == 'delete') {
        const catchId = Array.from(event.target.parentNode.children)[0].value;
        const catchOwnerId = Array.from(event.target.parentNode.children)[1].value;
        if (catchOwnerId === sessionStorage.getItem('userId')) {
            const confirmed = confirm('Are you sure?');
            if (confirmed) {
                deleteCatch(catchId);
            }
        } else {
            alert('Not authorized!');
        }
    }
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

async function update(id, event) {
    const toUpdate = Array.from(event.target.parentNode.children).filter(l => l.tagName === 'INPUT' && l.type !== 'hidden');
    const newCatch = {
        angler: toUpdate[0].value,
        weight: toUpdate[1].value,
        species: toUpdate[2].value,
        location: toUpdate[3].value,
        bait: toUpdate[4].value,
        captureTime: toUpdate[5].value
    }

    const url = `http://localhost:3030/data/catches/${id}`;
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(url, {
        method: 'put',
        headers: { 'Content-type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify(newCatch)
    });

    if (response.ok !== true) {
        const error = await response.json()
        return alert(error.message)
    }

    loadCatches();
}

async function deleteCatch(id) {
    const url = `http://localhost:3030/data/catches/${id}`;
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(url, {
        method: 'delete',
        headers: { 'X-Authorization': token }
    });

    loadCatches();
}

async function logout() {
    //имам href="javascript:void(0)"като атрибут на бутона затова не използвам event.preventDefault()
    const url = 'http://localhost:3030/users/logout';
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(url, {
        method: 'get',
        headers: { 'X-Authorization': token }
    });

    if (response.ok !== true) {
        const error = await response.json();
        return alert(error.message);
    }

    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    window.location.pathname = 'index.html';
}
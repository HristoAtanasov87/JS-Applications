//import modules
//grab sections

//setup modules
//setp navigation

import { setupHome, showHome } from './home.js'
import { setupDetails } from './details.js'
import { setupLogin, showLogin } from './login.js'
import { setupRegister, showRegister } from './register.js'
import { setupCreate, showCreate } from './create.js'
import { setupEdit } from './edit.js'
import { e } from './dom.js'

const main = document.querySelector('main');

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNavigation();

//start application in home view
showHome();


function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

function setupNavigation() {
    const email = sessionStorage.getItem('userEmail');
    if (email !== null) {
        document.getElementById('welcomeMsg').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => { l.style.display = 'block' });
        [...document.querySelectorAll('nav .guest')].forEach(l => { l.style.display = 'none' });
    } else {
        [...document.querySelectorAll('nav .guest')].forEach(l => { l.style.display = 'block' });
        [...document.querySelectorAll('nav .user')].forEach(l => { l.style.display = 'none' });

    }


    document.querySelector('nav').addEventListener('click', (event) => {
        const view = links[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    });

    document.getElementById('createLink').addEventListener('click', (event) => {
        event.preventDefault();
        showCreate();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);

    async function logout(event) {
        event.preventDefault();
        const token = sessionStorage.getItem('authToken');

        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: { 'X-Authorization': token }
        });

        if (response.ok) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userEmail');

            [...document.querySelectorAll('nav .guest')].forEach(l => { l.style.display = 'block' });
            [...document.querySelectorAll('nav .user')].forEach(l => { l.style.display = 'none' });

            showHome();
        } else {
            const error = await response.json();
            alert(error.message);
        }

    }
}
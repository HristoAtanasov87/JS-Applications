import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from '../views/home.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';
import { logout as apiLogout } from '../src/api/data.js';
import { createPage } from '../views/create.js';
import { allMemesPage } from '../views/all.js';
import { detailsPage } from '../views/details.js';
import { editPage } from '../views/edit.js';
import { profilePage } from '../views/profile.js';


const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logout);

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/all', decorateContext, allMemesPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);

setUserNav()
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('userEmail');
    if (email !== null) {
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.profile > span').textContent = `Welcome, ${email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}

async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}


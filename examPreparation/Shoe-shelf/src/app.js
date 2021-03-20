import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout as logoutApi } from '../src/api/data.js';

import { createPage } from '../views/create.js';
import { detailsPage } from '../views/details.js';
import { editPage } from '../views/edit.js';
import { homeGuest } from '../views/homeGuest.js';
import { homeLoggedIn } from '../views/homeLoggedIn.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';

const container = document.querySelector('main');

page('/', decorateContext, homeGuest);
page('/index.html', decorateContext, homeGuest);
page('/homeLoggedIn', decorateContext, homeLoggedIn);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/create', decorateContext, createPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    const userEmail = sessionStorage.getItem('userEmail');
    if (token !== null) {
        [...document.querySelectorAll('.user')].forEach(i => i.style.display = '');
        [...document.querySelectorAll('.guest')].forEach(i => i.style.display = 'none');
        document.getElementById('welcome').innerHTML = `Welcome, ${userEmail} | <a id="logoutBtn" href="javascript:void(0)">Logout</a>`
    } else {
        [...document.querySelectorAll('.user')].forEach(i => i.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(i => i.style.display = '');
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logoutApi();
    setUserNav();
    page.redirect('/login');
});
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'

const container = document.getElementById('container2');

import { homePage } from '../views/home.js';
import { createPage } from '../views/create.js';
import { editPage } from '../views/edit.js';
import { detailsPage } from '../views/details.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';
import { logout } from './api/api.js';

page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

function setUserNav() {
    const userId = sessionStorage.getItem('authToken');
    const userEmail = sessionStorage.getItem('userEmail');
    if (userId !== null) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user [class="nav-link"]').textContent = `Welcome, ${userEmail}`
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
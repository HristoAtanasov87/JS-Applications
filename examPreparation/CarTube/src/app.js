import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as logoutApi } from '../src/api/data.js'
import { allListingsPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myListingsPage } from './views/myListings.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const container = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

page('/', decorateContext, homePage);
page('/index.html', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/allListings', decorateContext, allListingsPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/myListings', decorateContext, myListingsPage);
page('/search', decorateContext, searchPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;

    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username != null) {
        document.getElementById('welcome-msg').textContent = `Welcome ${username}`;
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function logout() {
    await logoutApi();
    setUserNav();
    page.redirect('/');
}
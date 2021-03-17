import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api/data.js';
import { dashboardPage } from './views/dashboard.js'
import { myFurniturePage } from './views/myFurniture.js'
import { detailsPage } from './views/details.js'
import { createPage } from './views/create.js'
import { editPage } from './views/edit.js'
import { registerPage } from './views/register.js'
import { loginPage } from './views/login.js'

const container = document.querySelector('.container');

page('/', decorateContext, dashboardPage)
page('/dashboard', decorateContext, dashboardPage);
page('/my-furniture', decorateContext, myFurniturePage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

//start application
setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/dashboard');
})

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId !== null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
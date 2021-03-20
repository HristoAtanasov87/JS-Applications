import { html } from '../node_modules/lit-html/lit-html.js';
import { login } from '../src/api/data.js';

const loginTemplate = (onSubmit) => html`
<h1>Login</h1>
<p class="form-info">Don't have account?
    <a href="/register">Register now</a> and fix that!
</p>
<form @submit=${onSubmit} action="">
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>

    <div>
        <input type="password" name="password" placeholder="Password...">
    </div>
    <div>
        <button>Login</button>
    </div>
</form>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        await login(email, password);

        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/homeLoggedIn');
    }
}
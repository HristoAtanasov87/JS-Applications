import { html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../src/api/data.js';

const registerTemplate = (onSubmit, errorMsg) => html`
<h1>Register</h1>
<p class="form-info">Already registered?
    <a href='/login'>Login now</a> and have some fun!
</p>

<form @submit=${onSubmit} action="">
    ${errorMsg ? html`<div style="color: red">${errorMsg}</div>` : ''}
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>
    <div>
        <input type="password" name="password" placeholder="Password">
    </div>
    <div>
        <input type="password" name="Re-password" placeholder="Re-password">
    </div>
    <div>
        <p class="message"></p>
        <button>Register</button>
    </div>
</form>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('Re-password');

        if (email == '') {
            return ctx.render(registerTemplate(onSubmit, 'Email is required!'));
        }

        if (password.length < 6) {
            return ctx.render(registerTemplate(onSubmit, 'Password must be at least 6 characters!'));
        }

        if (password !== repass) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match!'));
        }

        await register(email, password);

        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/homeLoggedIn');
    }
}
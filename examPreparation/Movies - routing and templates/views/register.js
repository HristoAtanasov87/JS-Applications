import { html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../src/api/data.js';

const registerTemplate = (onSubmit, errorMsg) => html`
<section id="form-sign-up">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
        ${errorMsg ? html`<div class="form-group">
            <p>${errorMsg}</p>
        </div>` : ''}

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repeatPassword');

        if (email == '' || password == '' || repass == '') {
            return alert('All fields are required!');
        }

        if (password !== repass) {
            return alert('Passwords don\'t match!');
        }

        await register(email, password);

        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/home');

    }
}
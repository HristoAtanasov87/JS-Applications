import { html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../src/api/data.js';

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <h1>Register</h1>

    <form @submit=${onSubmit} id="register">
        <fieldset>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="register-pass">Password:</label>
                <input type="password" name="password" id="register-pass">
            </p>
            <p class="field password">
                <label for="register-rep-pass">Repeat password:</label>
                <input type="password" name="rep-pass" id="register-rep-pass">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Register">
            </p>
            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const userInput = new FormData(event.target);
        const email = userInput.get('email').trim();
        const password = userInput.get('password').trim();
        const repass = userInput.get('rep-pass').trim();

        if (!email || !password || !repass) {
            return alert('All fields should be filled!');
        }

        if (password != repass) {
            return alert('Password and Confirm Password do not match!');
        }

        await register(email, password);
        event.target.reset();
        ctx.page.redirect('/')
        ctx.setUserNav()
    }
}
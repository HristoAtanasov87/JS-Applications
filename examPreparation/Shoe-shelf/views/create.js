import { html } from '../node_modules/lit-html/lit-html.js';
import { createShoe } from '../src/api/data.js';

const createTemplate = (onSubmit, errorMsg) => html`
<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div style="color: red">${errorMsg}</div>` : ''}
    <div>
        <input type="text" name="name" placeholder="Name...">
    </div>
    <div>
        <input type="text" name="price" placeholder="Price...">
    </div>
    <div>
        <input type="text" name="imageUrl" placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" placeholder="Brand...">
    </div>
    <div>
        <button>Create</button>
    </div>
</form>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name');
        const price = formData.get('price');
        const img = formData.get('img');
        const description = formData.get('description');
        const brand = formData.get('brand');

        if (name == '' || price == '' || img == '' || description == '' || brand == '') {
            return ctx.render(createTemplate(onSubmit, 'All fields are required!'));
        }

        const data = {
            name,
            price,
            img,
            description,
            brand,
            creator: sessionStorage.getItem('userId')
        }

        await createShoe(data);
        ctx.page.redirect('/homeLoggedIn');
    }
}
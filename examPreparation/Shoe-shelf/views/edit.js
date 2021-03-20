import { html } from '../node_modules/lit-html/lit-html.js';
import { getShoeById, editShoe } from '../src/api/data.js';

const editTemplate = (onSubmit, shoe, errorMsg) => html`
<h1>Edit Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div>${errorMsg}</div>` : ''}
    <div>
        <input type="text" name="name" .value=${shoe.name} placeholder="Name...">
    </div>
    <div>
        <input type="text" name="price" .value=${shoe.price} placeholder="Price...">
    </div>
    <div>
        <input type="text" name="imageUrl" .value=${shoe.img} placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" .value=${shoe.description}
            placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" .value=${shoe.brand} placeholder="Brand...">
    </div>
    <div>
        <button>Edit</button>
    </div>
</form>`;

export async function editPage(ctx) {
    const shoeId = ctx.params.id
    const shoe = await getShoeById(shoeId);
    ctx.render(editTemplate(onSubmit, shoe));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const price = formData.get('price');
        const img = formData.get('imageUrl');
        const description = formData.get('description');
        const brand = formData.get('brand');

        if (name == '' || price == '' || img == '' || description == '' || brand == '') {
            return ctx.render(editTemplate(onSubmit, shoe, 'All fields are required!'));
        }

        const data = {
            name,
            price,
            img,
            description,
            brand
        }

        ctx.page.redirect(`/details/${shoeId}`);
        await editShoe(shoe._id, data);
    }
}
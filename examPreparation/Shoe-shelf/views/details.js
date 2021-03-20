import { html } from '../node_modules/lit-html/lit-html.js';
import { getShoeById, deleteShoe } from '../src/api/data.js';

const detailstemplate = (shoe, onDelete, isOwner) => html`
<div class="offer-details">
    <h1>${shoe.name}</h1>
    <div class="info">
        <img src=${shoe.img} alt="">
        <div class="description">${shoe.description}
            <br>
            <br>
            <p class="price">$${shoe.price}</p>
        </div>
    </div>
    ${isOwner ? html`<div class="actions">
        <a href=${`/edit/${shoe._id}`}>Edit </a> <a href='javascript:void(0)' @click=${onDelete}>Delete</a>
    </div>` : ''}
</div>`;

export async function detailsPage(ctx) {
    const shoeId = ctx.params.id;
    const shoe = await getShoeById(shoeId);
    const isOwner = shoe.creator === sessionStorage.getItem('userId');
    ctx.render(detailstemplate(shoe, onDelete, isOwner));

    async function onDelete(event) {
        event.preventDefault();

        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            ctx.page.redirect('/homeLoggedIn');
            await deleteShoe(shoeId);
        }
    }
}
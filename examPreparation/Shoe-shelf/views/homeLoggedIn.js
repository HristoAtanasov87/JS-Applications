import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllShoes } from '../src/api/data.js';

const homeTemplate = (data, onClick) => html`
<div @click=${onClick} class="shoes">
    ${data ? html`${data.map(shoeTemplate)}` : html`<div>'No shoes to display. Be the first to create a new offer...'
    </div>`}
</div>`;

const shoeTemplate = (shoe) => html`
<div class="shoe">
    <img src=${shoe.img} data-id=${shoe._id}>
    <h3>${shoe.name}</h3>
    <a href='javascript:void(0)' data-id=${shoe._id}>Buy it for $${shoe.price}</a>
</div>`;

export async function homeLoggedIn(ctx) {
    const data = Object.values(await getAllShoes());
    ctx.render(homeTemplate(data, onClick));

    function onClick(event) {
        const token = sessionStorage.getItem('authToken');
        if ((event.target.tagName == 'IMG' || event.target.tagName == 'A') && token)
            ctx.page.redirect(`/details/${event.target.dataset.id}`);
    }
}

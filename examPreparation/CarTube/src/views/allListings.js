import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllListings, getCollectionSize } from '../api/data.js';
import { listingTemplate } from './commonTemplates/listing.js';

const allListingsTemplate = (data, page, pages) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        <div>Page ${page} / ${pages} 
        ${page > 1 ? html`<a class="button-list" href="/allListings?page=${page - 1}">&lt; Prev</a>` : ''}
        ${page < pages ? html`<a class="button-list" href="/allListings?page=${page + 1}">Next &gt;</a>` : ''}
    </div>
        ${data.length > 0 
            ? html`${data.map(listingTemplate)}` 
            : html`<p class="no-cars">No cars in database.</p>`}
    </div>

</section>`;

export async function allListingsPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;

    const data = await getAllListings(page);
    const count = await getCollectionSize();
    const pages = Math.ceil(count / 3);

    ctx.render(allListingsTemplate(data, page, pages));
}
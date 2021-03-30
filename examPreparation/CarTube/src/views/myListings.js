import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyListings } from '../api/data.js';
import { listingTemplate } from './commonTemplates/listing.js';

const myListingsTemplate = (data) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${data.length > 0 ? html`${data.map(listingTemplate)}` : html`<p class="no-cars"> You haven't listed any cars
            yet.</p>`}


    </div>
</section>`;

export async function myListingsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const data = await getMyListings(userId);

    ctx.render(myListingsTemplate(data))
}
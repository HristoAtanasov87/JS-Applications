import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';
import { listingTemplate } from './commonTemplates/listing.js';


const searchTemplate = (data, onSearch, year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input type="text" name="search" placeholder="Enter desired production year" .value=${year}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${data.length > 0 
            ? html`${data.map(listingTemplate)}` 
            : html`<p class="no-cars"> No results.</p>`}
    </div>
</section>`;

export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const data = Number.isNaN(year) ? [] : await search(year)
    ctx.render(searchTemplate(data, onSearch, year));

    async function onSearch() {
        const query = Number(document.querySelector('.container input').value);
        if (isNaN(query) == false ) {
            ctx.page.redirect(`/search?query=${query}`);
        } else {
            return alert('Year must be a positive number!');
        }
    }
}   
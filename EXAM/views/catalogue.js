import { html } from '../node_modules/lit-html/lit-html.js';
import { getWikis } from '../src/api/data.js';

const catalogueTemplate = (data) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${data.length > 0 
    ? html`${data.map(articleTemplate)}`
        : html`<h3 class="no-articles">No articles yet</h3>`}

</section>`;

const articleTemplate = (element) => html`
<a class="article-preview" href="/details/${element._id}">
    <article>
        <h3>Topic: <span>${element.title}</span></h3>
        <p>Category: <span>${element.category}</span></p>
    </article>
</a>`;

export async function cataloguePage(ctx) {
    const data = await getWikis();
    ctx.render(catalogueTemplate(data));
}
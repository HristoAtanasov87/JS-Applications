import { html } from '../node_modules/lit-html/lit-html.js';
import { searchWiki } from '../src/api/data.js';

const searchTemplate = (data, onSearch, title) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>

    <div class="search-container">
        ${data.length > 0 ? html`${data.map(articleTemplate)}` : html`<h3 class="no-articles">No matching articles</h3>
        `}
    </div>
</section>`;

const articleTemplate = (element) => html`
<a class="article-preview" href="/details/${element._id}">
    <article>
        <h3>Topic: <span>${element.title}</span></h3>
        <p>Category: <span>${element.category}</span></p>
    </article>
</a>`;

export async function searchPage(ctx) {
    const title = ctx.querystring.split('=')[1];
    const data = (title == undefined) ? [] : await searchWiki(title);
    ctx.render(searchTemplate(data, onSearch, title));

    async function onSearch(event) {
        event.preventDefault();

        const query = document.querySelector('input[name=search]').value;
        if (query != '') {
            ctx.page.redirect(`/search?query=${query}`);
        }
    }
}

import { html } from '../node_modules/lit-html/lit-html.js';
import { getWikiById, deleteWiki } from '../src/api/data.js';

const detailsTemplate = (article, onDelete, isOwner) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        ${isOwner ? html`<div class="buttons">
            <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>
        </div>` : html`<a href="/" class="btn edit">Back</a>`}

    </div>
</section>`;

export async function detailsPage(ctx) {
    const articleId = ctx.params.id;
    const userId = sessionStorage.getItem('userId');

    const article = await getWikiById(articleId);
    ctx.render(detailsTemplate(article, onDelete, userId == article._ownerId));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this article?');
        if (confirmed) {
            await deleteWiki(articleId);
            ctx.page.redirect('/');
        }
    }
}
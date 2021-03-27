import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../src/api/data.js';

const allTemplate = (data) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${data.length ? html`${data.map(memeTemplate)}` : html`<p class="no-memes">No memes in database.</p>`}

    </div>
</section>`;

const memeTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

export async function allMemesPage(ctx) {
    const data = await getAllMemes();

    ctx.render(allTemplate(data));

}
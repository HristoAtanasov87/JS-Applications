import { html } from '../node_modules/lit-html/lit-html.js';
import { editWiki, getWikiById } from '../src/api/data.js';

const editTemplate = (onSubmit, article) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    .value=${article.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const articleId = ctx.params.id;
    const article = await getWikiById(articleId);
    console.log(article);

    ctx.render(editTemplate(onSubmit, article));

    async function onSubmit(event) {
        event.preventDefault();

        const userInput = new FormData(event.target);
        const data = {
            title: userInput.get('title'),
            category: userInput.get('category'),
            content: userInput.get('content')
        }

        if (!data.title || !data.category || !data.content) {
            return alert('All fields must be filled!');
        }

        if (data.category != 'JavaScript' && data.category != 'C#' && data.category != 'Java' && data.category != 'Python') {
            return alert('Category must be JavaScript, Java, C# or Python!');
        }

        await editWiki(articleId, data);
        event.target.reset();
        ctx.page.redirect(`/details/${articleId}`)
    }

}
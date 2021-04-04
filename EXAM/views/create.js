import { html } from '../node_modules/lit-html/lit-html.js';
import { createWiki } from '../src/api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit} id="create">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

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

        await createWiki(data);
        event.target.reset();
        ctx.page.redirect('/');
    }
}
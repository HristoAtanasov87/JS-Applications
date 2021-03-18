import { html } from '../node_modules/lit-html/lit-html.js';
import { editMovie, getMovieById } from '../src/api/data.js';

const editTemplate = (onSubmit, movie) => html`
<section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"
                .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`;



export async function editPage(ctx) {
    const movie = await getMovieById(ctx.params.id);
    ctx.render(editTemplate(onSubmit, movie));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            'title': formData.get('title'),
            'description': formData.get('description'),
            'img': formData.get('imageUrl')
        }

        ctx.page.redirect(`/details/${movie._id}`);
        await editMovie(movie._id, data);
    }
}
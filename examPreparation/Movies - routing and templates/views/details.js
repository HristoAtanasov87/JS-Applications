import { html } from '../node_modules/lit-html/lit-html.js';
import { addLike, deleteMovie, getLikes, getMovieById, getUserLikes } from '../src/api/data.js';

const detailsTemplate = (movie, userId, onDelete, userLike, likes, onLike) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>

                ${(userId == movie._ownerId) ? html`
                <a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href=${`/edit/${movie._id}`}>Edit </a>` : html` ${likeTemplate(userLike,
    onLike, movie)}`} <span class="enrolled-span">Likes ${likes}</span>
            </div>
        </div>
    </div>
</section>`;

const likeTemplate = (userLike, onLike, movie) => html`
${userLike.length ? '' : html`<a @click=${()=> onLike(movie._id)} class="btn btn-primary"
    href=${`/details/${movie._id}`}>Like</a>`}`;


export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const movie = await getMovieById(ctx.params.id);
    const likes = await getLikes(movie._id);
    const userLike = await getUserLikes(movie._id, userId);


    ctx.render(detailsTemplate(movie, userId, onDelete, userLike, likes, onLike));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteMovie(movie._id);
            ctx.page.redirect('/home');
        }
    }

    async function onLike(movieId) {
        await addLike({ 'movieId': movieId });
    }


}
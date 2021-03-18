import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getMovies() {
    return await api.get(host + '/data/movies');
}

export async function getMovieById(id) {
    return await api.get(host + '/data/movies/' + id);
}

export async function createMovie(movie) {
    return await api.post(host + '/data/movies', movie);
}

export async function editMovie(id, movie) {
    return api.put(host + '/data/movies/' + id, movie);
}

export async function deleteMovie(id) {
    return await api.del(host + '/data/movies/' + id);
}

// export async function getRecipeCount() {
//     return api.get(host + '/data/recipes?count');
// }

// export async function getRecent() {
//     return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
// }

export async function getLikes(movieId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count `);
}

export async function getUserLikes(movieId, userId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `);
}

export async function addLike(movieId) {
    return await api.post(host + `/data/likes`, movieId);
}


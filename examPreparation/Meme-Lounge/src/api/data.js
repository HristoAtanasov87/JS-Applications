import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllMemes() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeById(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function createMeme(meme) {
    return await api.post(host + '/data/memes', meme);
}

export async function editMemeById(id, meme) {
    return api.put(host + '/data/memes/' + id, meme)
}

export async function deleteMemeById(id) {
    return await api.del(host + '/data/memes/' + id);
}

// export async function getRecipeCount() {
//     return api.get(host + '/data/recipes?count');
// }

// export async function getRecent() {
//     return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
// }

export async function getMemesByOwner(id) {
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}



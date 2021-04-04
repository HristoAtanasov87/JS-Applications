import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getWikis() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}

export async function getWikiById(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function createWiki(article) {
    return await api.post(host + '/data/wiki', article);
}

export async function editWiki(id, article) {
    return api.put(host + '/data/wiki/' + id, article)
}

export async function deleteWiki(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function getRecentWikis() {
    return api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function searchWiki(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${encodeURIComponent(query)}%22`)
}




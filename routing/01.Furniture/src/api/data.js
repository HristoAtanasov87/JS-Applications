import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application specific requests
export async function getAllFurniture() {
    return await api.get(host + '/data/catalog');
}

export async function getFurnitureById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function createFurniture(item) {
    return await api.post(host + '/data/catalog', item);
}

export async function editFurniture(id, item) {
    return api.put(host + '/data/catalog/' + id, item)
}

export async function deleteFurniture(id) {
    return await api.del(host + '/data/catalog/' + id);
}

export async function getMyFurniture() {
    const userId = sessionStorage.getItem('userId');
    return api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

// export async function getRecipeCount() {
//     return api.get(host + '/data/recipes?count');
// }

// export async function getRecent() {
//     return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
// }




import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllShoes() {
    return await api.get(host + '/jsonstore/shoes');
}

export async function getShoeById(id) {
    return await api.get(host + '/jsonstore/shoes/' + id);
}

export async function createShoe(shoe) {
    return await api.post(host + '/jsonstore/shoes', shoe);
}

export async function editShoe(id, shoe) {
    return api.put(host + '/jsonstore/shoes/' + id, shoe)
}

export async function deleteShoe(id) {
    return await api.del(host + '/jsonstore/shoes/' + id);
}

// export async function getRecipeCount() {
//     return api.get(host + '/data/recipes?count');
// }

// export async function getRecent() {
//     return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
// }




import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings(page = 1) {
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page - 1) * 3}&pageSize=3`);
}

export async function getListingsById(id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function createListing(car) {
    return await api.post(host + '/data/cars', car);
}

export async function editListing(id, car) {
    return api.put(host + '/data/cars/' + id, car)
}

export async function deleteListing(id) {
    return await api.del(host + '/data/cars/' + id);
}

export async function getMyListings(id) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}

export async function search(query) {
    return await api.get(host + `/data/cars?where=year%3D${encodeURIComponent(query)}`)
}

export async function getCollectionSize() {
    return await api.get(host + '/data/cars?count');

}
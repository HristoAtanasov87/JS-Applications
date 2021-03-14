import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getRecipes(page) {
    return await api.get(host + '/data/recipes?select=' + encodeURIComponent('_id,name,img') + `&offset=${(page - 1) * 5}&pageSize=5`);
}

export async function getRecipeById(id) {
    return await api.get(host + '/data/recipes/' + id);
}

export async function createRecipe(recipe) {
    return await api.post(host + '/data/recipes', recipe);
}

export async function editRecipeById(id, recipe) {
    return api.put(host + '/data/recipes/' + id, recipe)
}

export async function deleteRecipeById(id) {
    return await api.del(host + '/data/recipes/' + id);
}

export async function getRecipeCount() {
    return api.get(host + '/data/recipes?count');
}

export async function getRecent() {
    return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
}




import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getRecipes() {
    return await api.get(host + '/data/recipes?select=' + encodeURIComponent('_id,name,img'));
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




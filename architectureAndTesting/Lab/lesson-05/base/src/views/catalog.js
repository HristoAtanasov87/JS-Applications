import { e } from '../dom.js';
import { getRecipes } from '../api/data.js'


function createRecipePreview(recipe, goTo) {
    const result = e('article', { className: 'preview', onClick: () => goTo('details', recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;
}



export function setupCatalog(section, navigation) {

    return showCatalog;

    async function showCatalog() {
        section.innerHTML = 'Loading&hellip;';

        const recipes = await getRecipes();
        const cards = recipes.map(r => createRecipePreview(r, navigation.goTo));

        const fragment = document.createDocumentFragment();
        cards.forEach(c => fragment.appendChild(c));
        section.innerHTML = '';
        section.appendChild(fragment);

        return section;
    }
}


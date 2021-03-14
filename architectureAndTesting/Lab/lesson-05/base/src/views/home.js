import { e } from '../dom.js';
import { getRecent } from '../api/data.js';

function createRecipePreview(recipe, goTo) {
    const result = e('article', { className: 'recent', onClick: () => goTo('details', recipe._id) },
        e('div', { className: 'recent-preview' }, e('img', { src: recipe.img })),
        e('div', { className: 'recent-title' }, recipe.name)
    );

    return result;
}

function createSpacer() {
    return e('div', { className: 'recent-space' });
}

export function setupHome(section, navigation) {
    const container = section.querySelector('.recent-recipes');
    return showHome;

    async function showHome() {
        container.innerHTML = 'Loading&hellip;';

        const recipes = await getRecent();
        console.log(recipes);

        const cards = recipes.map(r => createRecipePreview(r, navigation.goTo));
        console.log(cards);

        const fragment = document.createDocumentFragment();


        while (cards.length > 0) {
            fragment.appendChild(cards.shift());
            if (cards.length > 0) {
                fragment.appendChild(createSpacer());
            }
        }
        console.log(fragment);

        container.innerHTML = '';
        container.appendChild(fragment);

        return section;
    }
}


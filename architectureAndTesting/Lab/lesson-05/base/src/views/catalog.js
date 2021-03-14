import { e } from '../dom.js';
import { getRecipes, getRecipeCount } from '../api/data.js'


function createRecipePreview(recipe, goTo) {
    const result = e('article', { className: 'preview', onClick: () => goTo('details', recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;
}

function createPager(page, pages, goTo) {
    const result = e('header', { className: 'section-title' }, `Page ${page} of ${pages}`);
    if (page > 1) {
        result.appendChild(e('a', { className: 'pager', href: '/catalog', onClick: (event) => changePage(event, page - 1) }, ' < Prev'));
    }
    if (page < pages) {
        result.appendChild(e('a', { className: 'pager', href: '/catalog', onClick: (event) => changePage(event, page + 1) }, ' Next >'));
    }

    return result;

    function changePage(event, newPage) {
        event.preventDefault();
        goTo('catalog', newPage)
    }
}

export function setupCatalog(section, navigation) {

    return showCatalog;

    async function showCatalog(page = 1) {
        section.innerHTML = 'Loading&hellip;';

        const recipes = await getRecipes(page);

        const recipeCount = await getRecipeCount();
        const pages = Math.ceil(recipeCount / 5);

        const cards = recipes.map(r => createRecipePreview(r, navigation.goTo));

        const fragment = document.createDocumentFragment();

        fragment.appendChild(createPager(page, pages, navigation.goTo));
        cards.forEach(c => fragment.appendChild(c));
        fragment.appendChild(createPager(page, pages, navigation.goTo));

        section.innerHTML = '';
        section.appendChild(fragment);

        return section;
    }
}


import { e } from './dom.js';
import { showEdit } from './edit.js'

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s)),

        ),
    );

    const userId = sessionStorage.getItem('userId');
    if (userId === recipe._ownerId) {
        result.appendChild(e('div', { className: 'controls' },
            e('button', { onClick: () => showEdit(recipe._id) }, '\u270E Edit'),
            e('button', { onClick: () => onDelete(recipe._id) }, '\u2716 Delete')
        ))
    }
    return result;
}

async function onDelete(id) {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
        const token = sessionStorage.getItem('authToken');
        if (token == null) {
            return alert('You are not logged in!');
        }

        try {
            const response = await fetch('http://localhost:3030/data/recipes/' + id, {
                method: 'delete',
                headers: {
                    'X-Authorization': token
                }
            });

            if (response.status == 200) {
                section.innerHTML = '<article><h2>Recipe deleted</h2></article>';
            } else {
                throw new Error(await response.json());
            }
        } catch (err) {
            console.error(err.message);
        }
    }
}

let main;
let section;
let setActiveNav;

export function setupDetails(mainTarget, sectionTarget, setActiveNavCb) {
    main = mainTarget;
    section = sectionTarget;
    setActiveNav = setActiveNavCb;
}

export async function showDetails(id) {
    setActiveNav();

    section.innerHTML = '<p style="color: white">Loading...</p>';
    main.innerHTML = '';
    main.appendChild(section);

    const recipe = await getRecipeById(id);
    const card = createRecipeCard(recipe)

    section.innerHTML = '';
    section.appendChild(card);
}
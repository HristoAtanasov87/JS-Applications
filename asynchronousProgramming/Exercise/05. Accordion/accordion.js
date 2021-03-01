window.addEventListener('load', solution);
async function solution() {
    const sectionRef = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/';

    const response = await fetch(url);
    const listOfArticles = await response.json();

    const listOfTitles = listOfArticles.list;
    listOfTitles.forEach(el => {
        const eachTitle = e('div', undefined, 'class', 'accordion');
        const divHead = e('div', undefined, 'class', 'head');
        const spanElement = e('span', el.title);
        const button = e('button', 'More', 'class', 'button');
        button.id = el._id;
        button.addEventListener('click', showMore);
        divHead.appendChild(spanElement);
        divHead.appendChild(button);
        eachTitle.appendChild(divHead);

        const divExtra = e('div', undefined, 'class', 'extra');
        divExtra.style.display = 'none';
        const pElement = e('p');
        divExtra.appendChild(pElement);
        eachTitle.appendChild(divExtra);

        sectionRef.appendChild(eachTitle);
    })
}

async function showMore(ev) {
    if (ev.target.tagName === 'BUTTON' && ev.target.textContent === 'More') {
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/`;
        url += ev.target.id
        const response = await fetch(url);
        const addData = await response.json();

        ev.target.textContent = 'Less';
        let divExtra = ev.target.parentNode.nextElementSibling;
        divExtra.style.display = 'block';
        divExtra.children[0].textContent = addData.content;

    } else if (ev.target.tagName === 'BUTTON' && ev.target.textContent === 'Less') {
        let divExtra = ev.target.parentNode.nextElementSibling;
        divExtra.style.display = 'none';
        ev.target.textContent = 'More';
    }
}

function e(tag, text, attribute, attributeValue) {
    const el = document.createElement(tag);

    if (attribute !== undefined && attributeValue !== undefined) {
        el.setAttribute(attribute, attributeValue);
    }

    if (text !== undefined) {
        el.textContent = text;
    }

    return el
}
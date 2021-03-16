import { render } from './node_modules/lit-html/lit-html.js'
import { contacts } from './contacts.js'
import cardTemplate from './card.js'

const mainDiv = document.getElementById('contacts');
mainDiv.addEventListener('click', onClick);

contacts.forEach(c => c.isVisible = false);
const result = contacts.map(cardTemplate);
render(result, mainDiv); // renders template result

function onClick(event) {
    if (event.target.classList.contains('detailsBtn')) {
        const id = event.target.parentNode.querySelector('.details').id;
        const element = contacts.find(c => c.id == id);
        element.isVisible = !element.isVisible; // if true will become false and opposite
        const result = contacts.map(cardTemplate);
        render(result, mainDiv);
    }

}
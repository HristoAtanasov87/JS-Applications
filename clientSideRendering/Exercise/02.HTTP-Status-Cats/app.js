import { html, render } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js'
import { cats } from './catSeeder.js';

const section = document.getElementById('allCats');
cats.forEach(c => c.isVisible = false);

const catCardTemplate = (data) => html`
    <li>
        <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${data.isVisible ? 'Hide' : 'Show'} status code</button>
            <div class="status" style=${styleMap(data.isVisible ? {} : {display: 'none'})} id=${data.id}>
                <h4>Status Code: ${data.statusCode}</h4>
                <p>${data.statusMessage}</p>
            </div>
        </div>
    </li>`;

update()
function update() {
    const catData = html`
        <ul @click=${onClick}>
            ${cats.map(catCardTemplate)}
        </ul>`;
    
    render(catData, section)
}

function onClick(event) {
    const element = event.target.parentNode.querySelector('.status');

    if (event.target.tagName === 'BUTTON') {
        const id = element.id
        const found = cats.find(c => c.id == id);
        found.isVisible = !found.isVisible;
        update();
    }
}
import { html, render } from '../node_modules/lit-html/lit-html.js';

document.querySelector('form').addEventListener('submit', onLoad);
const divRoot = document.getElementById('root');

const ulTemplate = (data) => html`
    <ul>
        ${data.map(t => html`<li>${t}</li>`)}
    </ul>
`;


function onLoad(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let towns = formData.get('towns')
    event.target.reset();
    towns = towns.split(',').map(t => t.trim());
    const result = ulTemplate(towns);

    render(result, divRoot);

}
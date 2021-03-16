import { html, render } from '../node_modules/lit-html/lit-html.js';
const div = document.querySelector('div');


const optionTemplate = (data) => html`${data.map(d => html`<option value=${d._id}>${d.text}</option>`)}`;

const selectTemplate = (data) => html`
    <select id="menu">
        ${optionTemplate(data)}
    </select>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
getData();


function update(list) {
    const result = selectTemplate(list);
    render(result, div);
}

async function onClick(event, list) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get('itemText');
    event.target.reset();

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'text': text })
    });
    const data = await response.json()
    list.push(data);
    update(list);
}


async function getData() {
    document.querySelector('form').addEventListener('submit', (event) => onClick(event, list));

    const response = await fetch(url);
    const data = await response.json();

    const list = Object.values(data);
    update(list);
}

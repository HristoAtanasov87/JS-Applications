import { html, render } from '../node_modules/lit-html/lit-html.js';
const tbodyRef = document.querySelector('tbody');

const rowTemplate = (person, select) => html`
<tr class=${select ? 'select' : '' }>
   <td>${person.firstName} ${person.lastName}</td>
   <td>${person.email}</td>
   <td>${person.course}</td>
</tr>`;

getPersons();

function update(persons, match = '') {
   const result = persons.map(p => rowTemplate(p, compare(p, match)));
   render(result, tbodyRef);
}

async function getPersons() {
   document.getElementById('searchBtn').addEventListener('click', () => search(persons));

   const url = 'http://localhost:3030/jsonstore/advanced/table';

   const response = await fetch(url);
   const data = await response.json();
   const persons = Object.values(data);

   update(persons);
}

function search(persons) {
   const match = document.getElementById('searchField').value.toLowerCase();
   update(persons, match);
   document.getElementById('searchField').value = '';
}

function compare(item, match) {
   return Object.values(item).some(v => match && v.toLowerCase().includes(match))
}
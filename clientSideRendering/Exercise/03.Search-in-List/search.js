import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const body = document.querySelector('body');

const template = (data, match) => html`
<article>
   <div id="towns">
      <ul>
         ${data.map(t => itemTemplate(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" .value=${match} />
   <button @click=${search}>Search</button>
   <div id="result">${countMatches(towns, match)}</div>
</article>`;
// слага се .value за да сме сигурни че инпут полето няма да се рендира повторно

const itemTemplate = (townName, match) => html`
<li class=${(match !='' && townName.toLowerCase().includes(match.toLowerCase())) ? 'active' : ''}>${townName}</li>`;

update();

function update(match = '') {
   const result = template(towns, match);
   render(result, body);
}

function search(event) {
   const match = event.target.parentNode.querySelector('input').value;
   update(match);

}

function countMatches(towns, match) {
   const matches = towns.filter(t => match && t.toLowerCase().includes(match.toLowerCase())).length;
   if (matches) {
      return `${matches} matches found`
   } else {
      return ''
   }
}


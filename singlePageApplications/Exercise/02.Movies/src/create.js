import { showDetails } from './details.js';

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    };

    if (movie.title === '' || movie.description === '' || movie.img === '') {
        return alert('All fields are required!');
    }

    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(movie)
    });

    if (response.ok) {
        event.target.reset();
        const movie = await response.json();
        showDetails(movie._id);
    } else {
        const error = await response.json();
        return alert(error.message);
    }
}


let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', onSubmit);
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}
async function lockedProfile() {
    const div = document.querySelector('.profile')
    const user = div.cloneNode(true);
    const mainRef = document.getElementById('main');
    mainRef.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    const data = await response.json();

    const dataArray = Object.values(data);
    let counter = 1;
    dataArray.forEach(profile => {
        const newUser = user.cloneNode(true);
        newUser.children[2].name = `user${counter}Locked`;
        newUser.children[4].name = `user${counter}Locked`;
        newUser.children[8].name = `user${counter}Locked`;
        newUser.children[8].value = profile.username;
        newUser.children[9].children[2].value = profile.email;
        newUser.children[9].children[4].value = profile.age;
        newUser.children[10].addEventListener('click', showMore);
        mainRef.appendChild(newUser);
        counter++;

    })
}

function showMore(ev) {
    if (ev.target.tagName === 'BUTTON' && ev.target.textContent === 'Show more') {
        const profileDiv = ev.target.parentNode;

        if (!profileDiv.querySelector('input[value="lock"]:checked')) {
            ev.target.previousElementSibling.style.display = 'block';
            ev.target.textContent = 'Hide it';
        }

    } else if (ev.target.tagName === 'BUTTON' && ev.target.textContent === 'Hide it') {
        const profileDiv = ev.target.parentNode;

        if (!profileDiv.querySelector('input[value="lock"]:checked')) {
            ev.target.previousElementSibling.style.display = 'none';
            ev.target.textContent = 'Show more';
        }
    }
}


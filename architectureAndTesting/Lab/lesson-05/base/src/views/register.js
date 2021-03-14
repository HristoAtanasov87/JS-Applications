import { register } from '../api/data.js';



export function setupRegister(section, navigation) {
    const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    return showRegister;
    function showRegister() {
        return section;
    }

    async function onSubmit(data) {
        if (data.password != data.rePass) {
            return alert('Passwords don\'t match');
        }

        await register(data.email, data.password);


        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';

        navigation.goTo('catalog');


    }
}



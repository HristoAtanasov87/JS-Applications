import { login } from '../api/data.js';


export function setupLogin(section, navigation) {
    const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    function showLogin() {
        return section;
    }

    return showLogin;

    async function onSubmit(data) {
        await login(data.email, data.password);

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';

        navigation.goTo('catalog');
    }
}


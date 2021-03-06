document.getElementById('register').addEventListener('submit', register);
document.getElementById('login').addEventListener('submit', login);

async function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if (email === '' || password === '' || repass === '') {
        return alert('All fields are required!');
    } else if (password !== repass) {
        return alert('Passwords don\'t match');
    }

    const url = 'http://localhost:3030/users/register';
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok === false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    console.log(data);

    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.pathname = 'index.html';

}

async function login(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const url = 'http://localhost:3030/users/login';
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok !== true) {
        const error = response.json();
        return alert(error.message);
    }

    const data = await response.json();
    console.log(data);
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    window.location.pathname = 'index.html';
}
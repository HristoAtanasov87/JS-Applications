async function onLoad() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url);
    const data = await response.json();

    const tableRef = document.querySelector('#results>tbody');
    tableRef.innerHTML = '';
    Object.values(data).forEach(el => {
        const trElement = document.createElement('tr');
        const tdOne = document.createElement('td');
        tdOne.textContent = el.firstName;
        const tdTwo = document.createElement('td');
        tdTwo.textContent = el.lastName;
        const tdThree = document.createElement('td');
        tdThree.textContent = el.facultyNumber;
        const tdFour = document.createElement('td');
        tdFour.textContent = el.grade;

        trElement.appendChild(tdOne);
        trElement.appendChild(tdTwo);
        trElement.appendChild(tdThree);
        trElement.appendChild(tdFour);

        tableRef.appendChild(trElement);
    });
}

onLoad();

document.getElementById('submit').addEventListener('click', newStudent);

async function newStudent(event) {
    event.preventDefault()
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const formData = new FormData(document.getElementById('form'));

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '') {
        return alert('All fields are required');
    }

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    });

    formData.set('firstName', '');

    onLoad();
}
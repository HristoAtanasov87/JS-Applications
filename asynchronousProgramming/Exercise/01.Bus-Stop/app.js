async function getInfo() {
    const input = document.getElementById('stopId').value;
    const divStop = document.getElementById('stopName');
    const ulElement = document.getElementById(('buses'));

    const url = `http://localhost:3030/jsonstore/bus/businfo/${input}`;

    try {
        ulElement.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();
        divStop.textContent = data.name;
        Object.entries(data.buses)
            .map(b => {
                let [bus, time] = b;
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${time} minutes`;
                ulElement.appendChild(liElement);
            })

    } catch (error) {
        divStop.textContent = 'Error';
    }

}



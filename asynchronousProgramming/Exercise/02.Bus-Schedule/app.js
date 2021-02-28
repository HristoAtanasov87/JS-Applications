function solve() {
    const infoBox = document.querySelector('.info');
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    let stop = {
        next: 'depot'
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            stop = data;
            infoBox.textContent = `Next stop ${stop.name}`;

            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            infoBox.textContent = `Error`;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
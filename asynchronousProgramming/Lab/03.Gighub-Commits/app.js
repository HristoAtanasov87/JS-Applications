function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const ulElement = document.getElementById('commits');

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then((response) => {
            console.log(response);
            if (response.status !== 200) {
                const liElement = document.createElement('li');
                liElement.textContent = `Error: ${response.status} (${response.statusText})`;
                ulElement.appendChild(liElement);
            }
            return response.json()
        })
        .then(allCommits => {
            allCommits.map(processData).forEach(c => ulElement.appendChild(c));
        })
    // .catch(
    //     alert('Error')
    // )

    function processData(commit) {
        const liElement = document.createElement('li');
        liElement.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;

        return liElement;
    }
}
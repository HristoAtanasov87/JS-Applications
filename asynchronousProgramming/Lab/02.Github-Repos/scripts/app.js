function loadRepos() {
	const inputRef = document.getElementById('username');
	const ulElement = document.getElementById('repos');
	while (ulElement.children.length > 0) {
		ulElement.removeChild(ulElement.firstChild);
	}

	let url = `https://api.github.com/users/${inputRef.value}/repos`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				let liElement = document.createElement('li');
				liElement.textContent = response.statusText;
				ulElement.appendChild(liElement);
			}

			return response.json()
		})
		.then((data) => {
			data.map(processRepos).forEach(r => ulElement.appendChild(r));
		})
		.catch((error) => {
			alert(error);
		});

	function processRepos(repo) {
		let liElement = document.createElement('li');
		let aElement = document.createElement('a');
		aElement.setAttribute('href', `${repo.html_url}`);
		aElement.textContent = `${repo.full_name}`;
		liElement.appendChild(aElement);

		return liElement;
	}
}
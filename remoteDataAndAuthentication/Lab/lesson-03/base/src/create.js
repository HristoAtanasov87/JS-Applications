document.querySelector('form').addEventListener('submit', createRecipe);

async function createRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const recipeName = formData.get('name');
    const recipeImg = formData.get('img');
    const recipeIngredients = formData
        .get('ingredients')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');

    const recipeSteps = formData
        .get('steps')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');


    const url = 'http://localhost:3030/data/recipes';
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({recipeName, recipeImg, recipeIngredients, recipeSteps})
    });

    if (response.ok !== true) {
        const error = await response.json();
        return alert(error.message);
    }

    window.location.pathname = 'index.html';
}
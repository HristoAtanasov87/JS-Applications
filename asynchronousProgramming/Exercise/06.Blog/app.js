function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', loadComments);

}

attachEvents();

async function loadPosts() {
    const selectRef = document.getElementById('posts');

    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const postsData = await response.json();

    Object.values(postsData).forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.title;
        selectRef.appendChild(option);
    })

}

async function loadComments() {
    const h1Ref = document.getElementById('post-title');
    const ulBodyRef = document.getElementById('post-body');
    const ulCommentsRef = document.getElementById('post-comments');
    const chosenOptionId = document.getElementById('posts').value;

    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const urlTwo = `http://localhost:3030/jsonstore/blog/posts/${chosenOptionId}`;
    const [commentsResponse, postsResponse] = await Promise.all([
        fetch(url),
        fetch(urlTwo),
    ])

    const commentsData = await commentsResponse.json();
    const postsData = await postsResponse.json();

    h1Ref.textContent = postsData.title;
    ulBodyRef.textContent = postsData.body;

    const filteredComments = Object.values(commentsData).filter(c => {
        return c.postId == chosenOptionId;
    });
    filteredComments.forEach(c => {
        const liElement = document.createElement('li');
        liElement.textContent = c.text;
        ulCommentsRef.appendChild(liElement)
    })
}
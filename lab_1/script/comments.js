
document.addEventListener('DOMContentLoaded', () => {
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    const preloader = document.getElementById('preloader');
    const commentsDiv = document.getElementById('comments');
    const errorDiv = document.getElementById('error');

    preloader.style.display = 'block';

    const isEvenRequest = Math.random() > 0.5;
    const queryParameter = isEvenRequest ? '?postId=1' : '?postId=2';


    async function fetchWithTimeout(url, ms){
        await new Promise(resolve => setTimeout(resolve, ms))
        return await fetch(url);
    }

    fetchWithTimeout(commentsUrl + queryParameter, 1000)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderComments(data);
            preloader.style.display = 'none';
        })
        .catch(error => {
            preloader.style.display = 'none';
            handleError(error);
        });

    function renderComments(comments) {
        commentsDiv.innerHTML = '';

        comments.forEach(comment => {
            const commentBlock = document.createElement('div');

            const commentTitle = document.createElement('h3');
            commentTitle.textContent = comment.name;

            const commentBody = document.createElement('p');
            commentBody.textContent = comment.body;

            const commentEmail = document.createElement('a');
            commentEmail.href = `mailto:${comment.email}`;
            commentEmail.textContent = comment.email;

            commentBlock.appendChild(commentTitle);
            commentBlock.appendChild(commentBody);
            commentBlock.appendChild(commentEmail);

            commentsDiv.appendChild(commentBlock);
        });
    }

    function handleError(error) {
        errorDiv.textContent = `⚠ Что-то пошло не так: ${error.message}`;
    }
});

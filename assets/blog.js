const htmlFiles = [
    './assets/blogposts/test.html',
    './assets/blogposts/disney1.html'
];

htmlFiles.forEach(url => {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const h1Text = doc.querySelector('h1')?.innerHTML;
            const postDate = doc.querySelector('#postDate')?.innerHTML;
            let mainImageSrc = doc.querySelector('#mainImage')?.src;
            mainImageSrc = new URL(mainImageSrc).pathname.split('/').pop();

            const newArticle = document.createElement('div');
                newArticle.className = 'article-indice';
                newArticle.innerHTML = `
                    <a href="${url}">
                    <div class="a-i-img">
                        <img src="./assets/images/${mainImageSrc}">
                    </div>
                    <h3 class="a-i-header">${h1Text}</h3>
                    <p class="a-i-date"><i>${postDate}</i></p>
                    </a>
                `;
                document.querySelector('.article-container').appendChild(newArticle);
        })    
        .catch(error => {
            console.error(`Failed to load ${url}:`, error);
        });
});
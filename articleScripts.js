const blogpostLib = ['post1.md']


async function processMarkdownFiles(fileNames) {
    for (let fileName of fileNames) {
        if (fileName.endsWith('.md')) {
            try {
                const response = await fetch(`./assets/blogposts/${fileName}`);
                const content = await response.text();

                // Process the content
                const lines = content.split('\n');
                const firstHeader = lines.find(line => line.startsWith('#'));
                const lastDate = lines.find(line => line.startsWith('<!--'))
                let cleanedHeader = '';
                let cleanedDate = '';
                if (firstHeader) {
                    cleanedHeader = firstHeader.substring(2).trim();
                    console.log(`First header in file: ${cleanedHeader}`);
                } else {
                    console.log('No headers found in file');
                };
                if (lastDate) {
                    cleanedDate = lastDate.substring(5).trim();
                    cleanedDate = cleanedDate.substring(0, cleanedDate.length - 4)
                } else {
                    console.log('No date found in file');
                }

                // Create and append the new article element
                const newArticle = document.createElement('div');
                newArticle.className = 'article-indice';
                newArticle.innerHTML = `
                    <div class="a-i-img">
                        <img src="./assets/images/JackBittner_LinkedIn_CircleCrop.png">
                    </div>
                    <h3 class="a-i-header">${cleanedHeader}</h3>
                    <p class="a-i-date"><i>Last updated ${cleanedDate}</i></p>
                `;
                document.querySelector('.article-container').appendChild(newArticle);

            } catch (error) {
                console.error(`Error fetching file ${fileName}:`, error);
            }
        }
    }
}

processMarkdownFiles(blogpostLib);

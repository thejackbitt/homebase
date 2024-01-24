import { blogPostLib } from './assets/script.js';

function getQueryStringParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function processMarkdownFiles(fileName) {
    if (fileName.endsWith('.md')) {
        try {
            const response = await fetch(`./assets/blogposts/${fileName}`);
            const content = await response.text();
            
            const lines = content.split('\n');
            const firstHeader = lines.find(line => line.startsWith('#'));
            let mainImg;
            const mainImgRegex = /!\[.*?\]\((.*?)\)/;
            const mainImgMatch = content.match(mainImgRegex);
            let mainImgPath = '';
            const lastDate = lines.find(line => line.startsWith('<!--'));
            let cleanedHeader = '';
            let cleanedDate = '';
            console.log(mainImg);
            if (firstHeader) {
                cleanedHeader = firstHeader.substring(2).trim();
            } else {
                console.log('No headers found in file');
            };
            if (mainImgMatch && mainImgMatch.length > 1) {
                mainImgPath = mainImgMatch[1];
                mainImg = mainImgPath;
                mainImg = mainImg.substring(2).trim();
            };                
            if (lastDate) {
                cleanedDate = lastDate.substring(5).trim();
                cleanedDate = cleanedDate.substring(0, cleanedDate.length - 4)
            } else {
                console.log('No date found in file');
            };

            const newImage = document.createElement('img');
            newImage.src = `./assets/${mainImg}`;
            document.querySelector('.postheader').appendChild(newImage);

            const newPost = document.createElement('div');
            newPost.class = 'post-body';
            newPost.innerHTML = `<h1>${cleanedHeader}</h1>`;
            lines.forEach(line => {
                if (!line.startsWith('![')) {
                    if (line.startsWith('##')) {
                        newPost.innerHTML += `<h2>${line.substring(3).trim()}</h2>`;
                    } else if (!line.startsWith('#') && line.trim() !== '') {
                        newPost.innerHTML += `<p>${line.trim()}</p>`;
                    }
                }
            });
            document.querySelector('.post-container').appendChild(newPost);

        } catch (error) {
            console.error(`Error fetching file ${fileName}:`, error);
        }
    }
}


function checkBlogPostInUrl() {
    const postQuery = getQueryStringParameterByName('post');
    if (postQuery && blogPostLib.includes(postQuery)) {
        processMarkdownFiles(postQuery)
    } else {
        console.log("No match found in the URL query string.");
    }
}

checkBlogPostInUrl();
const inquirer = require('inquirer');
const fs = require('fs');
const dayjs = require('dayjs')
let paragraphElement = ``;
const today = dayjs().format("MM/DD/YYYY")

console.log("Welcome to the jackbittner.net article page generator!")
console.log("Today's Date is " + today)

function addSection(addMore) {
    if (!addMore) {
        return Promise.resolve();
    }

    return inquirer.prompt([
        {
            type: "input",
            message: "Enter the h2 text:",
            name: "h2Text",
            when: () => addMore
        },
        {
            type: "input",
            message: "Enter the paragraph text:",
            name: "pText",
            when: () => addMore
        },
        {
            type: "confirm",
            message: "Do you want to add another section?",
            name: "addAnother",
            default: false,
            when: () => addMore
        }
    ]).then(answers => {
        if (answers.h2Text) {
            paragraphElement += `<h2>${answers.h2Text}</h2>\n`;
        }
        if (answers.pText) {
            paragraphElement += `<p>${answers.pText}</p>\n`;
        }
        return addSection(answers.addAnother);
    });
}

inquirer
  .prompt([
    {
        type: "input",
        message: "What is your post's filename?",
        name: "fileName",
    },
    {
      type: "input",
      message: "What is your post's title?",
      name: "title",
    },
    {
        type: "input",
        message: "What is the path to the main article?",
        name: "imgPath",
    },
    {
        type: "input",
        message: "Who is the author of this article?",
        name: "author",
    },
    {
        type: "list",
        message: "Would you like to add a section?",
        name: "section",
        choices: [
            { key: 'yes', name: 'Yes', value: true },
            { key: 'no', name: 'No', value: false }
        ]
      }
])
.then((response) => {
    const { fileName, title, imgPath, author, section } = response;

    return addSection(section).then(() => {
        return { fileName, title, imgPath, author };
    });
})
.then(({ fileName, title, imgPath, author }) => {
    fs.writeFile(
        `./assets/blogposts/${fileName}.html`,
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <meta property="og:image" content="${title} | JackBittner.net">
            <meta property="og:description" content="Full Stack Software Developer | UX and Motion Designer">
            <title>${title} | JackBittner.net</title>
            <link rel="stylesheet" href="../style.css">
            <link rel="icon" type="image/x-icon" href="../favicon.ico">
          </head>
          <body>
            <script src="../script.js"></script>
        <!-- BEGIN HEADER CODE -->
        <div class="hamburger-menu-list">
            <a href="portfolio.html" target="_blank">
              <p>PORTFOLIO</p>
              </a>
              <a href="books.html">
                <p>BOOKS</p>
               </a>
              <a href="contact.html">
                <p>CONTACT</p>
              </a>
              <div class="social-media-collection">
                <a href="https://www.instagram.com/the.jack.bitt/" target="_blank">
                  <img class="social-media-icon" src="./assets/images/instagram.svg">
                </a>
                <a href="https://www.tiktok.com/@jack.bitt" target="_blank">
                  <img class="social-media-icon" src="./assets/images/tiktok.svg">
                </a>
                <a href="https://www.linkedin.com/in/jack-bittner-9013b9152/" target="_blank">
                <img class="social-media-icon" src="./assets/images/linkedin.svg">
                </a>
                <a href="https://www.youtube.com/channel/UCA6P5i9lvyDYtwEQFeQsd1w" target="_blank">
                <img class="social-media-icon" src="./assets/images/youtube.svg">
                </a>
              </div>
          </div>
          <div class="top-bar">
            <a href="index.html">
              <img class="logo" src="../images/HeaderImage_transparent.png">
            </a>
            <div class="button-container">
              <a href="portfolio.html">
              <p>PORTFOLIO</p>
              </a>
              <a href="books.html">
                <p>BOOKS</p>
               </a>
              <a href="contact.html">
                <p>CONTACT</p>
              </a>
              <a href="https://www.instagram.com/the.jack.bitt/" target="_blank">
                <img class="social-media-icon" src="../images/instagram.svg">
              </a>
              <a href="https://www.tiktok.com/@jack.bitt" target="_blank">
                <img class="social-media-icon" src="../images/tiktok.svg">
              </a>
              <a href="https://www.linkedin.com/in/jack-bittner-9013b9152/" target="_blank">
              <img class="social-media-icon" src="../images/linkedin.svg">
              </a>
              <a href="https://www.youtube.com/channel/UCA6P5i9lvyDYtwEQFeQsd1w" target="_blank">
              <img class="social-media-icon" src="../images/youtube.svg">
              </a>
            </div>
            <div class="hamburger-menu">
              <img id="rotating-image" src="../images/borger.svg"/>
            </div>
          </div>
          <!-- END HEADER CODE -->
          <div class="spacer"></div>
          <div class="postheader">
            <img src="../images/${imgPath}">
          </div>
          <div class="postcontainer">
          <h1>${title}</h1>
          <p>${today}</p>
          <div class="spancontainer">
            <span>${author}</span>
          </div>
          <div class="contentcontainer">
              ${paragraphElement}
              <div class="glowbox" style="z-index: 0"></div>
          </div>
        </div>
          <!-- BEGIN FOOTER CODE -->
        <div class="footer">
        <p>© 2023 JackBittner.net. All rights reserved.</p>
        <div class="button-container">
            <a href="https://www.instagram.com/the.jack.bitt/">  
            <img class="social-media-icon" src="../images/instagram.svg" target="_blank">
            </a>
            <a href="https://www.tiktok.com/@jack.bitt">
            <img class="social-media-icon" src="../images/tiktok.svg" target="_blank">
            </a>
            <a href="https://www.linkedin.com/in/jack-bittner-9013b9152/" target="_blank">
            <img class="social-media-icon" src="../images/linkedin.svg">
            </a>
            <a href="https://www.youtube.com/channel/UCA6P5i9lvyDYtwEQFeQsd1w" target="_blank">
            <img class="social-media-icon" src="../images/youtube.svg">
            </a>
        </div>
        </div>
        <!-- END FOOTER CODE -->
        </body>
        </html>`,
        function (err) {
        if (err) {
            return console.log(err);
        }
            console.log('HTML file created successfully.');
        }
    );
});
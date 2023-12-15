document.addEventListener('DOMContentLoaded', function() {
  var menuIcon = document.getElementById('rotating-image');
  var menu = document.querySelector('.hamburger-menu-list');

  menuIcon.addEventListener('click', function() {
    this.classList.toggle('rotated');
    menu.classList.toggle('menu-open');
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const frameCount = 160;
  const startingFrame = 149;
  const canvas = document.getElementById('gifCanvas');
  const ctx = canvas.getContext('2d');
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const frameHeight = documentHeight / frameCount;

  canvas.width = 340;
  canvas.height = 340;

  const preloadedImages = [];
  let imagesLoaded = 0;
  let imagesErrored = 0;

  function imageLoaded() {
      imagesLoaded++;
      if (imagesLoaded === frameCount) {
          window.addEventListener('scroll', updateFrame);
          updateFrame(); // Initial call to display the first frame
      }
  }

  function imageErrored() {
      imagesErrored++;
      console.error('Error loading an image');
      // Handle the error, e.g., by retrying or skipping this image
  }

  for (let i = 0; i < frameCount; i++) {
    // Calculate the correct frame number for each image
    let frameNumber = (i + startingFrame) % frameCount;
    let imagePath = `./assets/images/scroll_anim/HelmetPreview_${frameNumber.toString().padStart(5, '0')}.png`;
    let image = new Image();
    image.onload = imageLoaded;
    image.onerror = imageErrored;
    image.src = imagePath;
    preloadedImages[i] = image; // Store image based on loop index
}

function updateFrame() {
  let scrollFrameIndex = Math.floor(window.scrollY / frameHeight);
  let frameIndex = scrollFrameIndex % frameCount; // Simple modulo operation
  let image = preloadedImages[frameIndex];
  if (image && image.complete && image.naturalWidth !== 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

  window.addEventListener('scroll', () => {
      updateFrame();

      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      var glowbox2 = document.querySelector('.glowbox2');

      if (glowbox2) {
          var scrollFactor = (scrollPosition / documentHeight);
          var color1 = { r: 202, g: 86, b: 187, a: 0.25 };
          var color2 = { r: 226, g: 65, b: 205, a: 0.60 };
          var blendedColor = {
              r: Math.round(color1.r + (color2.r - color1.r) * scrollFactor),
              g: Math.round(color1.g + (color2.g - color1.g) * scrollFactor),
              b: Math.round(color1.b + (color2.b - color1.b) * scrollFactor),
              a: color1.a + (color2.a - color1.a) * scrollFactor
          };

          glowbox2.style.backgroundColor = `rgba(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b}, ${blendedColor.a})`;
          glowbox2.style.boxShadow = `0 0 500px rgba(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b}, ${blendedColor.a})`;
      }

      // Code to change the background color of the top-bar
      const scrollPercentage = window.scrollY / documentHeight;
      const newColor = scrollPercentage > 0 ? endColor : startColor;
      topBar.style.backgroundColor = newColor;
  });

  // Initially load the first frame
  updateFrame();
});


document.addEventListener('DOMContentLoaded', function() {
    var bookImages = document.querySelectorAll('.book-box img');
    bookImages.forEach(function(img) {
        img.addEventListener('click', function() {
            // Add the 'shrink' class to shrink the element
            img.classList.add('shrink');

            // Set a timeout to remove the class, returning it to its original size
            setTimeout(function() {
                img.classList.remove('shrink');
            }, 200); // 500 milliseconds delay
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.doc-button').forEach(button => {
      button.addEventListener('click', () => {
          const docViewer = document.querySelector('.doc-viewer');

          if (docViewer) {
              docViewer.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
    // Get the button and the element to change
    var button = document.getElementById('CH1-button');
    // Select the first element with the class 'doc-viewer'
    var elementToChange = document.getElementsByClassName('doc-viewer')[0];

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Change the HTML content of the element
        elementToChange.innerHTML = `
            <div class="doc-viewer" id="CH1-viewer">
              <iframe src="https://jackbittner.net/assets/Radioactive_AnalogMemories_Chapter1.pdf" width="100%" height="600">
                <p>Radioactive Analog Memories Chapter 1 PDF File <a href="https://jackbittner.net/assets/Radioactive_AnalogMemories_Chapter1.pdf">Download Here</a></p>
              </iframe>
            </div>`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the button and the element to change
    var button = document.getElementById('CH2-button');
    // Select the first element with the class 'doc-viewer'
    var elementToChange = document.getElementsByClassName('doc-viewer')[0];

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Change the HTML content of the element
        elementToChange.innerHTML = `
          <div class="doc-viewer" id="CH2-viewer">
          <iframe src="https://jackbittner.net/assets/Radioactive_AnalogMemories_Chapter2.pdf" width="100%" height="600">
            <p>Radioactive Analog Memories Chapter 2 PDF File <a href="https://jackbittner.net/assets/Radioactive_AnalogMemories_Chapter2.pdf">Download Here</a></p>
          </iframe>
        </div>`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the button and the element to change
    var button = document.getElementById('AI-button');
    // Select the first element with the class 'doc-viewer'
    var elementToChange = document.getElementsByClassName('doc-viewer')[0];

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Change the HTML content of the element
        elementToChange.innerHTML = `
        <div class="doc-viewer" id="AI-viewer">
        <div class="doc-viewer-backdrop">
          
          <img class="animate-in-1" src="./assets/images/Room3Artwork.jpg">
          <div class="header-container animate-in-1">
            <p>Each chapter goes through these concepts in detail and provides practical applications for business purposes. This business is perfect for small businesses, entrepreneurs and individuals looking to break into the tech industry and get on the ground floor of something big. Jack is passionate about democratizing technical skills and wants to put the power of big tech back in the hands of the everyday American.</p>
            <a href="https://www.amazon.com/Generative-Business-Purposes-Principles-Diffusion-ebook/dp/B0CLPN3Q91/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1699912515&sr=8-1" target="_blank">
              <button class="custom-btn btn-main">
                  View on Amazon
              </button>
            </a>
          </div>
        </div>
          <div class="effects">
            <div class="laser-overlay"></div>
            <div class="laser"></div>
            <div class="glowbox"></div>
          </div>
      </div>`;
    });
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();

    // Extract the form data
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Define the email parameters
    var emailParams = {
      from_email: email,
      message_html: message
    };

    // Send the email
    emailjs.send('service_4c5bfis', 'template_pw8m169', emailParams) // Pass emailParams here
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        window.location.href = './thankyou.html'; // Redirect to thankyou.html
      }, function (error) {
        console.log('FAILED...', error);
        alert('Failed to send the email. Please try again.');
      });
  });
});



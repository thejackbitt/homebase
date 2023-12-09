document.addEventListener('DOMContentLoaded', (event) => {
    const frameCount = 160;
    const startingFrame = 149;
    const gifElement = document.getElementById('gifFrame');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const frameHeight = documentHeight / frameCount;

    const topBar = document.querySelector('.top-bar'); // Select the top-bar element
    const startColor = '#1A1A1A';
    const endColor = '#1a1a1a79';

    window.addEventListener('scroll', () => {
        let frameIndex = (Math.floor(window.scrollY / frameHeight) + startingFrame) % frameCount;
        gifElement.src = `/assets/images/scroll_anim/HelmetPreview_${frameIndex.toString().padStart(5, '0')}.png`;

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
});

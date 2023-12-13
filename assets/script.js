document.addEventListener('DOMContentLoaded', (event) => {
    const frameCount = 160;
    const startingFrame = 149;
    const gifElement = document.getElementById('gifFrame');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const frameHeight = documentHeight / frameCount;

    window.addEventListener('scroll', () => {
        let frameIndex = (Math.floor(window.scrollY / frameHeight) + startingFrame) % frameCount;
        gifElement.src = `/assets/images/scroll_anim/HelmetPreview_${frameIndex.toString().padStart(5, '0')}.png`;
    });
});

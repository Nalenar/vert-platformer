const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = '#525252'
    c.fillRect(0, 0, canvas.width, canvas.height)
}

animate()
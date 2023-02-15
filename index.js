const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}

const gravity = 1;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor({ position }) {
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.width = 100;
    this.height = 100;
    this.lastKey;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravity function
    if (this.position.y + this.velocity.y + this.height <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const player = new Player({
  position: { x: 200, y: 100 },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "assets/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "#525252";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  c.restore();

  player.update();

  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -4;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 4;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
    case "ф":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "d":
    case "в":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "w":
    case "ц":
      if (player.velocity.y === 0) player.velocity.y = -10;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
    case "ф":
      keys.a.pressed = false;
      break;
    case "d":
    case "в":
      keys.d.pressed = false;
      break;
  }
});

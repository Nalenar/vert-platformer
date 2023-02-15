const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1;

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

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "#525252";
  c.fillRect(0, 0, canvas.width, canvas.height);

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
      player.velocity.y = -10;
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

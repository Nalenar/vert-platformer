const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const gravity = 1;

const floorCollisionBlocks = floorCollisions.parse2D().createObjectFrom2D();
const platformCollisionBlocks = platformCollisions
  .parse2D()
  .createObjectFrom2D();

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "assets/background.png",
});

const player = new Player({
  position: { x: 100, y: 100 },
  floorCollisionBlocks,
  imageSrc: "assets/warrior/Idle.png",
  frameRate: 8,
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

  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  floorCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  player.update();

  c.restore();
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -4;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 4;
  }
}

animate();

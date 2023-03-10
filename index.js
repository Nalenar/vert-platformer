const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const gravity = 0.1;

const floorCollisionBlocks = floorCollisions.parse2D().createObjectFrom2D(16);
const platformCollisionBlocks = platformCollisions
  .parse2D()
  .createObjectFrom2D(4);

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "assets/background.png",
});

const player = new Player({
  position: { x: 100, y: 300 },
  floorCollisionBlocks,
  platformCollisionBlocks,
  imageSrc: "assets/warrior/Idle.png",
  frameRate: 8,
  animations: {
    idle: {
      imageSrc: "assets/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 6,
    },
    idleLeft: {
      imageSrc: "assets/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 6,
    },
    run: {
      imageSrc: "assets/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 6,
    },
    runLeft: {
      imageSrc: "assets/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 6,
    },
    jump: {
      imageSrc: "assets/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 6,
    },
    jumpLeft: {
      imageSrc: "assets/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 6,
    },
    fall: {
      imageSrc: "assets/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 6,
    },
    fallLeft: {
      imageSrc: "assets/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 6,
    },
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const backgroundImageHeight = 432;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();

  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  background.update();
  // floorCollisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });
  // platformCollisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });
  player.checkForHorizontalCanvasCollisions();
  player.update();

  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.switchSprite("runLeft");
    player.velocity.x = -2;
    player.lastDirection = "left";
    player.shouldPanCameraToTheRight({ scaledCanvas, camera });
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.switchSprite("run");
    player.velocity.x = 2;
    player.lastDirection = "right";
    player.shouldPanCameraToTheLeft({ scaledCanvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.switchSprite("idle");
    else player.switchSprite("idleLeft");
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ scaledCanvas, camera });
    if (player.lastDirection === "right") {
      player.switchSprite("jump");
    } else player.switchSprite("jumpLeft");
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ scaledCanvas, camera });
    if (player.lastDirection === "right") player.switchSprite("fall");
    else player.switchSprite("fallLeft");
  }

  c.restore();
}

animate();

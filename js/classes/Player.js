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

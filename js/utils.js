Array.prototype.parse2D = function () {
  const arr = [];
  for (let i = 0; i < this.length; i += 36) {
    arr.push(this.slice(i, i + 36));
  }

  return arr;
};

Array.prototype.createObjectFrom2D = function (collisionBlockHeight) {
  const arr = [];

  this.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === 202) {
        arr.push(
          new CollisionBlock({
            position: {
              x: x * 16,
              y: y * 16,
            },
            height: collisionBlockHeight,
          })
        );
      }
    });
  });

  return arr;
};

function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

function platformCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

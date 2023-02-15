Array.prototype.parse2D = function () {
  const arr = [];
  for (let i = 0; i < this.length; i += 36) {
    arr.push(this.slice(i, i + 36));
  }

  return arr;
};

Array.prototype.createObjectFrom2D = function () {
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
          })
        );
      }
    });
  });

  return arr;
};

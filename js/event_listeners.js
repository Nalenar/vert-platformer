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
      if (player.velocity.y === 0) player.velocity.y = -3.3;
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

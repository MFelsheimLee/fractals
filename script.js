window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  // effect settings
  let size =
    canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
  const maxLevel = 4;
  const branches = 2;

  let sides = Math.random() * 7 + 2;
  let scale = Math.random() * 0.2 + 0.4;
  let spread = Math.random() * 2.9 + 0.1;
  let color = "hsl( " + Math.random() * 360 + ", 100%, 50%)";

  // Controls
  const randomizeButton = document.getElementById("randomizeButton");
  const slider_spread = document.getElementById("spread");
  const label_spread = document.querySelector("[for='spread']");
  const slider_sides = document.getElementById("sides");
  const label_sides = document.querySelector("[for='sides']");
  const reset_button = document.getElementById("resetButton");

  slider_spread.addEventListener("change", function (e) {
    spread = e.target.value;
    updateSliders();
    drawFractal();
  });

  slider_sides.addEventListener("change", function (e) {
    sides = e.target.value;
    updateSliders();
    drawFractal();
  });

  function drawBranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(-spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.2 + 0.4;
    spread = Math.random() * 2.9 + 0.1;
    color = "hsl( " + Math.random() * 360 + ", 100%, 50%)";
    lineWidth = Math.floor(Math.random() * 20 + 10);
    drawFractal();
  }

  randomizeButton.addEventListener("click", function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  reset_button.addEventListener("click", function () {
    resetFractal();
    updateSliders();
    drawFractal();
  });

  function resetFractal() {
    sides = 5;
    scale = 0.5;
    spread = 0.7;
    color = "gold";
    lineWidth = 15;
  }

  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = "Spread: " + Number(spread).toFixed(1);

    slider_sides.value = sides;
    label_sides.innerText = "Sides: " + Number(sides);
  }
});

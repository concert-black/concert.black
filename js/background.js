// #!/bin/js

scale = 2; // HIDPI support

function init() {
  canvas = document.getElementById('background');
  context = canvas.getContext('2d');
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mouseup', mouseUp, false);

  function size() {
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
  }

  size();
  window.onresize = function() {
    size();
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  x = 0;
  y = 0;
  mouse = false;

  function mouseDown(event) {
    mouse = true;
  }

  function mouseMove(event) {
    mouseX = event.clientX * scale;
    mouseY = event.clientY * scale;
  }

  function mouseUp(event) {
    mouse = false;
  }

  particles = [];
  fontSize = 96;
  increase = true;

  window.requestAnimationFrame(draw);
}

setInterval(function () {
  if (mouse) {
    particles[particles.length] = {
      x: mouseX,
      y: mouseY,
      radius: Math.random() * 64 + 4,
      speed: 2,
      acceleration: 0.1,
      direction: Math.random() * 360,
      wander: 0,
      growth: -0.1,
      alive: true
    }
  }
}, 50); // reduces particle spawn rate

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = 'xor';
  context.font = (fontSize * scale) + 'px Montserrat';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("COMING SOON", canvas.width / 2, canvas.height / 2);

  /*if (fontSize < 96 && increase) {
    fontSize += 0.05;
  }
  if (fontSize >= 96 && increase) {
    increase = false;
  }
  if (fontSize > 64 && !increase) {
    fontSize -= 0.05;
  }
  if (fontSize <= 64 && !increase) {
    increase = true;
  }

  animates text size, looks like shit though
  should figure out how to make it ease better

  */

  for (i = 0; i < particles.length; i++) {
    if (particles[i].alive) {
      context.beginPath();
      context.arc(particles[i].x, particles[i].y, (particles[i].radius * scale), 0, 2 * Math.PI);
      context.fill();
      particles[i].x += particles[i].speed * Math.sin(particles[i].direction);
      particles[i].y += particles[i].speed * Math.cos(particles[i].direction);
      particles[i].speed += particles[i].acceleration;
      particles[i].direction += Math.random() * particles[i].wander * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
      particles[i].radius += particles[i].growth;
      if (particles[i].radius < 0 || !(particles[i].x > -particles[i].radius * scale && particles[i].x < canvas.width + particles[i].radius * scale && particles[i].y > -particles[i].radius * scale && particles[i].y < canvas.height + particles[i].radius * scale)) particles[i].alive = false; // kill particle if out of bounds or has radius less than 0
    }
  }
  window.requestAnimationFrame(draw);
}

init();

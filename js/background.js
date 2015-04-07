// #!/bin/js

scale = 1; // HIDPI support

function init() {
  canvas = document.getElementById('background');
  context = canvas.getContext('2d');

  document.addEventListener('mousedown', mouseDown, false);
  document.addEventListener('mousemove', mouseMove, false);
  document.addEventListener('mouseup', mouseUp, false);

  document.addEventListener('touchstart', mouseDown, false);
  document.addEventListener('touchmove', mouseMove, false);
  document.addEventListener('touchend', mouseUp, false);

  window.addEventListener('deviceorientation', deviceOrientation, false);
  window.addEventListener('resize', resize, false);

  function size() {
    canvas.width = document.body.clientWidth * scale;
    canvas.height = document.body.clientHeight * scale;
  }

  size();

  mouse = false;

  function mouseDown(event) {
    event.preventDefault();
    mouse = true;
    mouseX = event.pageX * scale;
    mouseY = event.pageY * scale;
  }

  function mouseMove(event) {
    event.preventDefault();
    mouseX = event.pageX * scale;
    mouseY = event.pageY * scale;
  }

  function mouseUp(event) {
    event.preventDefault();
    mouse = false;
    mouseX = event.pageX * scale;
    mouseY = event.pageY * scale;
  }

  function deviceOrientation(event) {
    down = Math.atan2(-event.beta, event.gamma) + (Math.PI / 2) + window.orientation * Math.PI/180;
    strength = Math.sqrt(Math.pow(event.beta, 2) + Math.pow(event.gamma, 2)) / 90;
  }

  function resize() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    size();
  }

  particles = [];
  mouse = false;
  down = 0;
  strength = 1;

  window.requestAnimationFrame(draw);
}

setInterval(function () {
  if (mouse) {
    particles[particles.length] = {
      x: mouseX,
      y: mouseY,

      radius: Math.random() * 64 + 4,

      speedX: Math.random() * 10 * (Math.floor(Math.random() * 2) ? 1 : -1),
      speedY: Math.random() * 10 * (Math.floor(Math.random() * 2) ? 1 : -1),

      gravity: 0.5,
      shrinkage: 0.1,
      alive: true
    }
  }
}, 50); // reduces particle spawn rate

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = 'xor';

  context.font = 96 * scale + 'px Montserrat';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("COMING SOON", canvas.width / 2, canvas.height / 2);

  for (i = 0; i < particles.length; i++) {

    if (particles[i].alive) {

      context.beginPath();
      context.arc(particles[i].x, particles[i].y, (particles[i].radius * scale), 0, 2 * Math.PI);
      context.fill();

      particles[i].x += particles[i].speedX + (particles[i].gravity * strength * Math.sin(down));
      particles[i].y += particles[i].speedY + (particles[i].gravity * strength * Math.cos(down));

      particles[i].gravity += 0.25;
      particles[i].radius -= particles[i].shrinkage;

      if (particles[i].radius < 0 || !(particles[i].x > -particles[i].radius * scale && particles[i].x < canvas.width + particles[i].radius * scale && particles[i].y > -particles[i].radius * scale && particles[i].y < canvas.height + particles[i].radius * scale)) particles[i].alive = false; // kill particle if out of bounds or has radius less than 0
    }
  }
  window.requestAnimationFrame(draw);
}

init();

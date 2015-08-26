// config

scale = 2 // HiDPI support

radiusInner = 512;
radiusOuter = 256;

lineWidth = 1;
lineColor = 'rgba(255, 255, 255, 0.4)';
backgroundColor = 'rgba(0, 0, 0, 1)';

speedInner = 8;
speedOuter = 5;

rotateSpeed = 0.16;

// end config

function init() {
  canvas = document.getElementById('background'); // set up canvas
  context = canvas.getContext('2d');

  function size() { // resizing
    canvas.width = document.body.clientWidth * scale;
    canvas.height = document.body.clientHeight * scale;
		center = {
			x: canvas.width / 2,
			y: canvas.height / 2
		};
  }
  size();
  function resize() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    size();
  }
	window.addEventListener('resize', resize, false);

	radiusInner *= scale;
	radiusOuter *= scale;
	lineWidth *= scale;
	angle = 0; // initial inner angle

  window.requestAnimationFrame(draw); // start your engines
}

function draw() {
	context.fillStyle = backgroundColor; // draw reset overlay
  context.clearRect(0, 0, canvas.width, canvas.height);

	angle += rotateSpeed; // you spin me right round baby
	for (i = 0; i < speedOuter; i++) { // times around needed to complete pattern
		for (j = 0; j < 360; j += speedOuter) { // for each outside point
			angle += speedInner; // go around inside
			xA = center.x + (Math.cos(j / 180 * Math.PI) * radiusOuter); // high school trig
			yA = center.y - (Math.sin(j / 180 * Math.PI) * radiusOuter);
			xB = center.x + (Math.cos(angle / 180 * Math.PI) * radiusInner);
			yB = center.y - (Math.sin(angle / 180 * Math.PI) * radiusInner);
			context.strokeStyle = lineColor; // draw line
			context.lineWidth = lineWidth;
			context.beginPath();
			context.moveTo(xA, yA);
			context.lineTo(xB, yB);
			context.stroke();
		}
	}

	context.font = 96 * scale + 'px Montserrat';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("COMING SOON", canvas.width / 2, canvas.height / 2);

	window.requestAnimationFrame(draw);
}

init();

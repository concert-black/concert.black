/*
The MIT License

Copyright © 2010-2015 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// config
separation = 192;
rows = 112;
columns = 112;
size = 0.5;
speed = 0.1;
mouseSpeed = 0.1;
freedom = 0.0625;
retina = false;
// end config

function init() {
	container = document.querySelector('#background');
	camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 1, 16384);
	camera.position.x = 128;
	camera.position.y = 1024;
	camera.position.z = rows * separation;
	camera.rotation.x = -0.65;
	scene = new THREE.Scene();
	material = new THREE.SpriteCanvasMaterial({
		color: "white",
		program: function(context) {
			context.beginPath();
			context.arc(0, 0, size, 0, 2 * Math.PI, true);
			context.fill();
		}
	});

	count = 0;
	particles = [];
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			particles.unshift(new THREE.Sprite(material));
			particles[0].position.x = i * separation - (separation * rows / 2);
			particles[0].position.z = j * separation;
			scene.add(particles[0]);
		}
	}

	renderer = new THREE.CanvasRenderer();
	if (retina) renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	function resize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	window.addEventListener('resize', resize, false);

	mouse = 0;
	function mousemove() {
		mouse = (event.clientX - (window.innerWidth / 2) ) / (window.innerWidth / 2);
	}
	window.addEventListener('mousemove', mousemove, false);

	window.requestAnimationFrame(draw);
}

function draw() {
	var i = 0;
	camera.rotation.y += ((-mouse * freedom) - camera.rotation.y) * mouseSpeed;
	for (var j = 0; j < rows; j++) {
		for (var k = 0; k < columns; k++) {
			particles[i].position.y = (Math.sin((j + count) * 0.25) * 128) + (Math.sin((k + count) * 0.25) * 128);
			particles[i].scale.x = particles[i].scale.y = (particles[i].position.y + 256) / 51.2;
			i++;
		}
	}

	renderer.render(scene, camera);
	count += speed;

	window.requestAnimationFrame(draw);
}

init();

var createPlanet = function (r, x, y, vx, vy) {
    var geometry = new THREE.CircleGeometry(r, 20);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff0000}));

    mesh.position.x = x;
    mesh.position.y = y;

    mesh.radius = r;
    mesh.velocity = new THREE.Vector2(vx, vy);

    return mesh;
};

var randomNumber = function(min, max) {
    return Math.floor(Math.random() * max) + min;
};

(function() {
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.z = 1000;

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var red = new THREE.MeshBasicMaterial({color: 0xff0000});
    var yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
    var sun_geo = new THREE.CircleGeometry(100, 30);
    var sun = new THREE.Mesh(sun_geo, yellow);
    scene.add(sun);
    sun.position.x = 15;
    sun.position.y = 10;

    var planets = [];
    for (var i = 0; i < 5; i++) {
        var planet = createPlanet(10 + randomNumber(1, 10), 300 + randomNumber(40, 150), 450 + randomNumber(40, 150), -1.4 + Math.random(), 1.1 + Math.random());
        scene.add(planet);
        planets.push(planet);
    }

    function render() {
        requestAnimationFrame(render);

        for (var i = 0; i < planets.length; i++) {
            var d = planets[i].radius * 600 / Math.pow(Math.pow(planets[i].position.x - sun.position.x, 2) + Math.pow(planets[i].position.y - sun.position.y, 2), 1.5);
            planets[i].velocity.x = planets[i].velocity.x - ((planets[i].position.x - sun.position.x) * d);
            planets[i].velocity.y = planets[i].velocity.y - ((planets[i].position.y - sun.position.y) * d);
            planets[i].position.x += planets[i].velocity.x;
            planets[i].position.y += planets[i].velocity.y;
        }

        renderer.render(scene, camera);

        stats.update();
    }
    render();
})();

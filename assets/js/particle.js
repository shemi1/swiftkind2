(function(){

    var screen = $(window).width();

    //calls drawdots whenever screen is not ipad/tablet
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    if (is_iPad == false) {
        drawDots();
    }

    //draws particles on html
    function drawDots() {
        if (WEBGL.isWebGLAvailable() === false) {
            document.body.appendChild(WEBGL.getWebGLErrorMessage());
        }
        var container;
        var camera, scene, renderer;
        var spheres = [];
        var mouseX = 0;
        var mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        init();
        animate();

        function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 100000);
            camera.position.z = 9000;
            scene = new THREE.Scene();
            scene.background = new THREE.Color().setHSL(1, 1, 1);
            var geometry = new THREE.SphereBufferGeometry(10, 2, 16);
            var material = new THREE.MeshBasicMaterial({ color: '#d8dde5' });
            for (var i = 0; i < 200; i++) {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = Math.random() * 10000 - 5000;
                mesh.position.y = Math.random() * 10000 - 5000;
                mesh.position.z = Math.random() * 10000 - 5000;
                mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                scene.add(mesh);
                spheres.push(mesh);
            }
            //
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            //
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 100;
            mouseY = (event.clientY - windowHalfY) * 100;
        }
        //
        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            var timer = 0.00002 * Date.now();
            for (var i = 0, il = spheres.length; i < il; i++) {
                var sphere = spheres[i];
                sphere.position.x = 5000 * Math.cos(timer + i);
                sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
            }
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
    }

})();
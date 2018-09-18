$(document).ready(function () {
    var camera, scene, renderer;
    var mesh;
    var sphere;
    init();
    animate();

    function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        scene = new THREE.Scene();


        // cube creation

        var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
        var material = new THREE.MeshPhysicalMaterial({
            color: 0x259379,
            emissive: 0x6b6a6a,
            metalness: 0.5,
            roughness: 0,
            clearCoat: 1.0,
            clearCoatRoughness: 0.5,
            reflectivity: 1
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // another one

        var geometry2 = new THREE.BoxBufferGeometry(200, 200, 200);
        var material2 = new THREE.MeshPhysicalMaterial({
            color: 0x259379,
            emissive: 0x6b6a6a,
            metalness: 0.5,
            roughness: 0,
            clearCoat: 1.0,
            clearCoatRoughness: 0.5,
            reflectivity: 1
        });
        mesh2 = new THREE.Mesh(geometry2, material2);
        scene.add(mesh2);

        //another one
        var geometry = new THREE.SphereBufferGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);


        //Skybox
        var path = "textures/cube/sky/";
        var format = '.png';
        var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];

        var reflectionCube = new THREE.CubeTextureLoader().load( urls );
        reflectionCube.format = THREE.RGBFormat;

        scene.background = reflectionCube;


        //Lumieres
        scene.add(new THREE.HemisphereLight(0x263238, 0x263238));
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);


        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        mesh2.rotation.x += 0.01;
        mesh2.rotation.y += 0.005;
        renderer.render(scene, camera);

        var orbit = new THREE.OrbitControls(camera, renderer.domElement);
        orbit.enablePan = false;
        orbit.enableZoom = false;
        orbit.minPolarAngle = Math.PI / 4;
        orbit.maxPolarAngle = Math.PI / 1.5;
        orbit.dampingFactor = 0.1; // friction
        orbit.rotateSpeed = 0.1; // mouse sensitivity

    }
});


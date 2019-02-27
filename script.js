document.addEventListener("DOMContentLoaded", function (event) {
    let renderer, scene, camera, geoMercure, matMercure, meshMercure;
    let spotLight, lightHelper, shadowCameraHelper;

    let geoSun, geoVenus, geoEarth, geoMars, geoJupiter, geoSaturne, geoUranus, geoNeptune, geoPluton;
    let matSun, matVenus, matEarth, matMars, matJupiter, matSaturne, matUranus, matNeptune, matPluton;
    let meshSun, meshVenus, meshEarth, meshMars, meshJupiter, meshSaturne, meshUranus, meshNeptune, meshPluton;

    function drawOrbit(namePlanet, spacedPointName, yPos, colorLine, orbitName) {
        namePlanet = new THREE.Shape();
        namePlanet.moveTo(0, 0);
        namePlanet.absarc(0, 0, yPos, 0, 2 * Math.PI, false);
        spacedPointName = namePlanet.createSpacedPointsGeometry(128);
        spacedPointName.rotateX(THREE.Math.degToRad(-90));
        orbitName = new THREE.Line(spacedPointName, new THREE.LineBasicMaterial({
            color: 0x263238
        }));
        orbitName.position.set(0, 50, 0);
        scene.add(orbitName);
    }
    function drawPlanet(geoPlanet, matPlanet, posX, colorP, widthPlanet, meshPlanet, meshPlanetRotation, theta = 0, dTheta, r, rings = false) {
        geoPlanet = new THREE.IcosahedronBufferGeometry(widthPlanet, 0);
        matPlanet = new THREE.MeshPhongMaterial({
            flatShading: false,
            shininess: 100,
            color: colorP
        });
        meshPlanet = new THREE.Mesh(geoPlanet, matPlanet);
        meshPlanet.position.set(posX, 50, 0);
        meshPlanet.castShadow = true;
        scene.add(meshPlanet);
        drawOrbit("shapeMercure", "spacedPointsMercure", 30, "ffffff", "orbitMercure");
        function animatePlanet() {
            meshPlanet.rotation.y += meshPlanetRotation;
            //Orbit of planet
            theta +=  2 * Math.PI / dTheta;
            meshPlanet.position.x = r * Math.cos(theta);
            meshPlanet.position.z = r * Math.sin(theta);
            requestAnimationFrame(animatePlanet);
        }
        if(rings) {
            let geoRing = new THREE.RingGeometry(25, 20, 30, 1, 3, 6.3);
            let matRing= new THREE.MeshPhongMaterial({ color: colorP, side: THREE.DoubleSide });
            let meshRing= new THREE.Mesh(geoRing, matRing);
            meshRing.rotation.x = (Math.PI / 2) + 0.1;
            meshRing.position.set(0, 0, 0);
            meshRing.castShadow = true;
            meshPlanet.add(meshRing);
        }
        animatePlanet();
    }
    function init() {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 100, -400);

        let controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);
        controls.minDistance = 100;
        //controls.maxDistance = 500;
        controls.enablePan = false;
        controls.rotateSpeed = 0.1;
        controls.dampingFactor = 0.1;
        controls.update();

        // lumiere 
        spotLight = new THREE.SpotLight(0xffffff, 0.5);
        spotLight.position.set(15, 60, 35);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 1;
        spotLight.decay = 1;
        spotLight.distance = 600;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 3000;
        spotLight.shadow.mapSize.height = 3000;
        spotLight.shadow.camera.near = 100;
        spotLight.shadow.camera.far = 300;
        scene.add(spotLight);

        lightHelper = new THREE.SpotLightHelper(spotLight);
        //scene.add( lightHelper );

        //scene.add( new THREE.AxesHelper( 100 ) );
        /// Sun
        matSun = new THREE.MeshPhongMaterial({
            flatShading: false,
            shininess: 100, color: 0xFFA726
        });
        geoSun = new THREE.SphereGeometry(15, 32, 32);
        meshSun = new THREE.Mesh(geoSun, matSun);
        meshSun.position.set(0, 50, 0);
        meshSun.castShadow = true;
        scene.add(meshSun);

        drawPlanet(geoMercure, matMercure, 30, 0x546E7A, 5, meshMercure, 0.0053005857740586, 0, 241.09589041096, 30);
        drawOrbit("shapeMercure", "spacedPointsMercure", 30, "ffffff", "orbitMercure");

        drawPlanet(geoVenus, matVenus, 60,0xF57C00, 10, meshVenus, 0.0021962410041841, 0, 613.69863013699, 60);
        drawOrbit("shapeVenus", "spacedPointsVenus", 60, "ffffff", "orbitVenus");

        drawPlanet(geoEarth, matEarth, 100,0x27ae60, 10, meshEarth, 0.0091, 0, 1000, 100);
        drawOrbit("shapeEarth", "spacedPointsEarth", 100, 0x263238, "orbitEarth");
  
        drawPlanet(geoMars, matMars, 130,0xe74c3c, 8, meshMars, 0.0091, 0, 1879.4520547945, 130);
        drawOrbit("shapeMars", "spacedPointsMars", 130, "ffffff", "orbitMars");

        drawPlanet(geoJupiter, matJupiter, 160,0xe67e22, 13, meshJupiter, 0.0037058158995816, 0,  11868.493150685, 160, true);
        drawOrbit("shapeJupiter", "spacedPointsJupiter", 160, "37474F", "orbitJupiter");

        drawPlanet(geoSaturne, matSaturne, 200,0xf1c40f, 12, meshSaturne,0.0038534309623431, 0, 29476.712328767, 200, true);
        drawOrbit("shapeSaturne", "spacedPointsSaturne", 200, "ffffff", "orbitSaturne");

        drawPlanet(geoUranus, matUranus, 230,0x3498db, 11, meshUranus,0.0067405857740586, 0, 84076.712328767, 230);
        drawOrbit("shapeUranus", "spacedPointsUranus", 230, "ffffff", "orbitUranus");

        drawPlanet(geoNeptune, matNeptune, 260,0x2980b9, 10, meshNeptune,0.0057723514644351, 0, 164879.45205479, 260);
        drawOrbit("shapeNeptune", "spacedPointsNeptune", 260, "ffffff", "orbitNeptune");

        drawPlanet(geoPluton, matPluton, 280,0x34495e, 5, meshPluton,0.0072301255230126, 0,  247860.2739726, 280);
        drawOrbit("shapePluton", "spacedPointsPluton", 280, "ffffff", "orbitPluton");

        particles = new THREE.Group();
        scene.add(particles);
        const geoParticles = new THREE.SphereGeometry(0.4, 32, 32);

        for (let i = 0; i < 1000; i++) {
           //const geoParticles = new THREE.SphereGeometry(0.4, 32, 32);
            const matParticles = new THREE.MeshPhongMaterial({
                color: 0xFFFfFF
            });
            const meshParticles = new THREE.Mesh(geoParticles, matParticles);
            meshParticles.position.set((Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000);
            meshParticles.updateMatrix();
            meshParticles.matrixAutoUpdate = false;
            particles.add(meshParticles);
            function animateParticles() {
              let thetaPa = 0;
              particles.rotation.y += 0.00000005;
              //Orbit of planet
              thetaPa +=  2 * Math.PI / 11868.493150685;
              meshParticles.position.x = 1 * Math.cos(thetaPa);
              meshParticles.position.z = 1 * Math.sin(thetaPa);
              requestAnimationFrame(animateParticles);
            }
           animateParticles();
        }

        //ciel dégradé
        const skylight = new THREE.HemisphereLight(0xFfFfFf, 0x263238, 1);
        scene.add(skylight);
        window.addEventListener('resize', onResize, false);
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let render = function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        meshSun.rotation.y += 0;
  
        requestAnimationFrame(animate);
        render();
    }

    init();
    animate();
    render();

   
  //https://codepen.io/clindsey/pen/dgpdWV?editors=0010
  //https://codepen.io/nikita_ska/full/bqNdBj
});

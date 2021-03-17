'use strict'
const FRUSTUM_SIZE = 10
const ASPECT = getAspect(0)

var paused = false;
var recomecar = false;
let renderer, delta, camera1, newCamera, scene, pauseScene, pauseCamera, pauseWall, restart, controls;
let clock = new THREE.Clock();
let sceneObjects, lights;

function CreateCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    pauseCamera = new THREE.OrthographicCamera(FRUSTUM_SIZE * ASPECT / - 2, FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE / 2, FRUSTUM_SIZE / - 2, 1, 1000);
    camera1.position.set(50, 30, 20)
    newCamera = camera1;
}

function getAspect(n) {
    if (n == 0) {
        return window.innerWidth / window.innerHeight;
    } else if (n == 1) {
        return window.innerHeight / window.innerWidth;
    }
}

function createPauseScene() {
    pauseScene = new THREE.Scene();

    pauseWall = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry(15, 0.1, 10);
    let texture = new THREE.TextureLoader().load('js/cubemap/pause.png');
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, map: texture });
    let mesh = new THREE.Mesh(geometry, material);
    pauseWall.add(mesh);
    pauseWall.position.set(0, 0, 0);

    pauseScene.add(pauseWall);
}

function resizeCam() {
    'use strict';
    if (paused == false) {
        if (window.innerHeight > 0 && window.innerWidth > 0) {

            camera1.aspect = getAspect(0);
        }
        camera1.updateProjectionMatrix();

    } else if (paused == true) {
        let aspect = getAspect(0)
        if (aspect < 1) {
            aspect = getAspect(1)

            pauseCamera.left = FRUSTUM_SIZE / -2
            pauseCamera.right = FRUSTUM_SIZE / 2
            pauseCamera.top = FRUSTUM_SIZE * aspect / 2
            pauseCamera.bottom = -FRUSTUM_SIZE * aspect / 2
        } else {
            pauseCamera.left = FRUSTUM_SIZE * aspect / -2
            pauseCamera.right = FRUSTUM_SIZE * aspect / 2
            pauseCamera.top = FRUSTUM_SIZE / 2
            pauseCamera.bottom = -FRUSTUM_SIZE / 2
        }
        pauseCamera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createPauseScene();
    CreateCamera();
    clock.start();

    sceneObjects = new SceneObjects(0, 0, 0, scene);
    lights = new Lights(scene);

    controls = new THREE.OrbitControls(camera1, renderer.domElement);
    window.addEventListener("resize", resizeCam);
    window.addEventListener("keydown", (value) => onKeyDown(value));

    animate();
}

function onKeyDown(valeu) {
    if (valeu.keyCode == 83) {
        // s  
        paused = paused == true ? false : true;
        sceneObjects.togglePaused();
        lights.togglePaused();
    }

    if (valeu.keyCode == 82 & paused) {
        // r and paused
        paused = false;
        recomecar = true;
        sceneObjects.toggleReset();
        lights.toggleReset();
    }
}

function updateCam() {
    if (paused) {
        pauseCamera.position.set(0, 10, 0);
        newCamera = pauseCamera;
        newCamera.lookAt(pauseScene.position);
        resizeCam();
    } else {
        if (recomecar) {
            camera1.position.set(50, 30, 20);
            recomecar = false;
        }
        controls.update();
        newCamera = camera1;
        newCamera.lookAt(0, 0, 0);
        resizeCam();
    }

}

function render() {
    if (paused) {
        renderer.render(pauseScene, newCamera);

    } else {
        renderer.render(scene, newCamera);
    }
}

function animate() {
    delta = clock.getDelta();
    sceneObjects.animate(delta, paused);
    lights.animate();

    updateCam();
    render();
    requestAnimationFrame(animate);
}
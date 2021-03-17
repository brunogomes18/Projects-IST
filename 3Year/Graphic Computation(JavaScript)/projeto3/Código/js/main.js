'use strict'
const FRUSTUM_SIZE = 300
const ASPECT = getAspect(0)

let renderer, delta, ballManager, cueManager, camera4, camera5, camFlag = 4, newCamera, scene, table;
let clock = new THREE.Clock();
let sceneObjects, lights;

function CreateCamera() {
    'use strict';
    camera4 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera5 = new THREE.OrthographicCamera( FRUSTUM_SIZE * ASPECT / - 2, FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE / 2, FRUSTUM_SIZE / - 2, 1, 1000 );

}

function getAspect(n) {
    if ( n == 0) {
        return window.innerWidth / window.innerHeight;
    } else if (n == 1) {
        return window.innerHeight / window.innerWidth;
    }
}

function resizeCam(){
    'use strict';
    if (camFlag == 4){
        if (window.innerHeight >0 && window.innerWidth >0){

            camera4.aspect= getAspect(0);
        }
        camera4.updateProjectionMatrix();

    } else if (camFlag == 5){
        let aspect = getAspect(0)
        if(aspect < 1) {
            aspect = getAspect(1)

            camera5.left = FRUSTUM_SIZE / -2
            camera5.right = FRUSTUM_SIZE / 2
            camera5.top = FRUSTUM_SIZE * aspect / 2
            camera5.bottom = -FRUSTUM_SIZE * aspect / 2
        } else {
            camera5.left = FRUSTUM_SIZE * aspect / -2
            camera5.right = FRUSTUM_SIZE * aspect / 2
            camera5.top = FRUSTUM_SIZE / 2
            camera5.bottom = -FRUSTUM_SIZE / 2
        }
        camera5.updateProjectionMatrix();
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
    CreateCamera();
    clock.start();

    sceneObjects = new Objects(0,0,0,scene);
    lights = new Lights(scene,sceneObjects);

    window.addEventListener("resize", resizeCam);
    window.addEventListener("keydown", (value) => onKeyDown(value));

    animate();
}

function onKeyDown(valeu) {
    if (valeu.keyCode == 52) { // 4
        camFlag = 4
    } else if (valeu.keyCode == 53) { // 5
        camFlag = 5
    }
}

function updateCam() {
    if (camFlag == 4) {
        camera4.position.set(200, 200, 200)
        newCamera = camera4
        newCamera.lookAt(scene.position)
        resizeCam();
    } else if (camFlag == 5) {
        camera5.position.set(0, 0, 200);
        newCamera = camera5;
        newCamera.lookAt(0, 0 ,0)
        resizeCam();
    }
}

function render() {
    renderer.render(scene, newCamera);
}

function animate() {
    delta = clock.getDelta();
    sceneObjects.animate(delta);
    updateCam();

    render();
    requestAnimationFrame(animate);
}
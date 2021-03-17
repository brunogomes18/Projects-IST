'use strict'
let renderer, delta, ballManager, cueManager, camera1, camera2, camera3, camFlag = 1, newCamera, scene, table;
let clock = new THREE.Clock();

function CreateCamera() {
    'use strict';

    camera1 = new THREE.OrthographicCamera( 0.25*window.innerWidth / - 2, 0.25*window.innerWidth / 2, 0.25*window.innerHeight / 2, 0.25*window.innerHeight / - 2, 1, 1000 ); //left, right, top, bottom, near, far
    camera2 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000); //fov, aspect, near, far
    camera3 = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
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

    ballManager = new BallManager(scene, 15);
    cueManager = new CueManager(scene,ballManager);
    table = new Table(0, 0, 0, scene);

    window.addEventListener("keydown", (value) => onKeyDown(value));
    
    animate();
}

function onKeyDown(valeu) {
    if (valeu.keyCode == 49) { // 1
        camFlag = 1
    } else if (valeu.keyCode == 50) { // 2
        camFlag = 2
    } else if (valeu.keyCode == 51) { // 3
        camFlag = 3
    }
}

function updateCam() {
    if (camFlag == 1) {
        camera1.position.set(0, 250, 0);
        newCamera = camera1;
        newCamera.lookAt(50, 30 ,0)
    } else if (camFlag == 2) {
        camera2.position.set(120, 60, 100)
        newCamera = camera2
        newCamera.lookAt(scene.position)
    } else {
        if (ballManager.lastStrikedBall != -1 && ballManager.lastStrikedBall.obj.position.y > -10){
            let strikedBall = ballManager.lastStrikedBall
            camera3.position.x = strikedBall.obj.position.x + strikedBall.positionX
            camera3.position.z = strikedBall.obj.position.z + strikedBall.positionZ
            camera3.position.y = 40
            newCamera = camera3
            newCamera.lookAt(strikedBall.obj.position)
        } else {
            camera3.position.set(-300, 80, 100)
            newCamera = camera3
            newCamera.lookAt(scene.position)
        }
    }
}

function render() {
    renderer.render(scene, newCamera);
}

function animate() {
    delta = clock.getDelta()
    ballManager.animate(delta)
    cueManager.animate(delta)
    updateCam()
    render();
    requestAnimationFrame(animate);
}
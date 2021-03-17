var camera, scene, renderer;

var objV1, objV2, objV3;

var material, materialObjV1, materialObjV2, materialObjV3, geometry, mesh;

var clock = new THREE.Clock();
var delta;

const speedRot = 0.7;
const speedTrans = 7;


/* calcula a diagonal de um quadrado baseada nas suas dimensoes 
   c==r => move para a direita, c==l => move para a esquerda, s = size */ 
function calcDiag(c, s) {
    'use strict';

    var diag = Math.sqrt(Math.pow(3*s, 2) / 2);

    if (c == 'r') {
        return diag;
    } else if (c == 'l') {
        return -diag;
    }
}


/* Cria o mobile na sua totalidade */
function createObjV1(x, y, z) {
    'use strict';

    objV1 = new THREE.Object3D();
    objV1.userData = {
        rotClockwise: false, 
        rotAntiClockwise: false, 
        movingL: false, 
        movingR: false, 
        movingU: false, 
        movingD: false
    };

    materialObjV1 = new THREE.MeshBasicMaterial({ color: 0x0099db, wireframe: true});
    material = materialObjV1;

    addVerticalCylinder(objV1, 0, 35.65, 0, 2);

    addHorizontalCylinder(objV1, -10, 42, 0, 2);
	addVerticalCylinder(objV1, -20, 38, 0, 0.9);
	addHorizontalCylinder(objV1, -20, 34, 0, 1);
	addFlatParallelepiped(objV1, -22 - 6, 34, 0, 2);
	addFlatDiamond(objV1, -5 - 6, 34, 0, 2);

	addHorizontalCylinder(objV1, 5, 34, 0, 1);
	addFlatCylinder(objV1, 10 + 6, 34, 0, 2);

	addObjV2(objV1, 0, 0, 0);

	objV1.position.set(x, y, z);
	scene.add(objV1);
    
}


/* Adiciona os dois tercos inferiores do mobile a um objeto */
function addObjV2(obj, x, y, z) {
    'use strict';

    createObjV2(x, y, z);
    obj.add(objV2);
}


/* Cria os dois tercos inferiores do mobile a um objeto */
function createObjV2(x, y, z) {
    'use strict';

    objV2 = new THREE.Object3D();
    objV2.userData = {
        rotClockwise: false, 
        rotAntiClockwise: false
    };
    
    materialObjV2 = new THREE.MeshBasicMaterial({ color: 0x6adb00, wireframe: true});
    material = materialObjV2;

    addHorizontalCylinder(objV2, 2.5, 25, 0, 2);
    
	addVerticalCylinder(objV2, -8, 23, 0, 0.5);
	addFlatCube(objV2, -8, 17.5, 0, 2);

    addVerticalCylinder(objV2, 12, 13, 0, 2.5);
    
	addHorizontalCylinder(objV2, 15, 12, 0, 1);
	addFlatCylinder(objV2, 5.5, 12, 0, 1.5);

	addVerticalCylinder(objV2, 19.5, 14.25, 0, 0.5);
	addHorizontalCylinder(objV2, 21.5, 17, 0, 0.5);
	addFlatDiamond(objV2, 23.75 + calcDiag("r", 3), 17, 0, 3);
    
    addObjV3(objV2, 12, 0, 0);
    objV2.position.set(x, y, z);
}


/* Adiciona o ultimo terco do mobile a um objeto */
function addObjV3(obj, x, y, z) {
    'use strict';

    createObjV3(x, y, z);
    obj.add(objV3);
}


/* Cria o ultimo terco do mobile */
function createObjV3(x, y, z) {
    'use strict';

    objV3 = new THREE.Object3D();
    objV3.userData = {
        rotClockwise: false, 
        rotAntiClockwise: false
    };

    materialObjV3 = new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true});
    material = materialObjV3;

    addHorizontalCylinder(objV3, 3.5, 0, 0, 3.5);
	addFlatParallelepiped(objV3, -14 - 2.25, 0, 0, 1.5);
	addFlatCylinder(objV3, 20.75 + 6, 0, 0, 2);

	addVerticalCylinder(objV3, 6.5, -5, 0, 1);
	addHorizontalCylinder(objV3, 6.5, -10, 0, 1.5);
	addFlatCube(objV3, -1 - 3, -10, 0, 2);
	addFlatDiamond(objV3, 13.5 + calcDiag("r", 2), -10, 0, 2);

	addVerticalCylinder(objV3, 6.5, -15, 0, 1);
	addHorizontalCylinder(objV3, -3, -20, 0, 2);
	addFlatCylinder(objV3, -13 - 7.5, -20, 0, 2.5);

    objV3.position.set(x,y,z);
}


/* Cria um cilindro vertical em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do cilindro */
function addVerticalCylinder(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 10 * s, 32);
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


/* Cria um cilindro horizontal em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do cilindro */
function addHorizontalCylinder(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 10 * s, 32);
    mesh = new THREE.Mesh(geometry,material);

    mesh.position.set(x, y, z);
    mesh.rotation.z += Math.PI / 2;
    obj.add(mesh);
}


/* Cria um paralelepipedo achatado em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do paralelepipedo */
function addFlatParallelepiped(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CubeGeometry(3 * s, 6 * s, 0.5);
    mesh= new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}


/* Cria um losango achatado em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do losango */
function addFlatDiamond(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CubeGeometry(3 * s, 3 * s, 0.5);
    mesh= new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.z += Math.PI / 4;
    obj.add(mesh);
}

/* Cria um cubo achatado em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do cubo */
function addFlatCube(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CubeGeometry(3 * s, 3 * s, 0.5);
    mesh= new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}


/* Cria um cilindro achatado em que 'obj' representa o objeto onde 
vamos adicionar este cilindro e 's' representa size que serve para 
aumentar ou diminuir o tamanho do cilindro */
function addFlatCylinder(obj, x, y, z, s) {
    'use strict';

    geometry = new THREE.CylinderGeometry(3 * s, 3 * s, 0.5, 12);
    mesh= new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.x += Math.PI / 2;
    obj.add(mesh);
}


/* Cria a cena */
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createObjV1(0, 0, 0);
}


/* Cria uma camera ortografica */
function createCamera() {
    'use strict';

    camera = new THREE.OrthographicCamera( 0.3*window.innerWidth / - 2, 0.3*window.innerWidth / 2,
        0.3*window.innerHeight / 2, 0.3*window.innerHeight / - 2, 1, 1000 );

    camera.position.set(0,0,100);

    camera.lookAt(scene.position);
}


/* Define o que acontece quando se pressionam certas teclas */
function onKeyDown(value) {
    'use strict';

    switch(value.keyCode) {
        case 49: // 1
            camera.position.set(0,0,100); // vista frontal
            camera.lookAt(scene.position);
            break;

        case 50: // 2
            camera.position.set(0,100,0); // vista topo
            camera.lookAt(scene.position);
            break;

        case 51: // 3
            camera.position.set(100,0,0); // Vista lateral
            camera.lookAt(scene.position);
            break;

        case 52: // 4
            materialObjV1.wireframe = !materialObjV1.wireframe;
            materialObjV2.wireframe = !materialObjV2.wireframe;
            materialObjV3.wireframe = !materialObjV3.wireframe;
            break;
        
        case 81: // q
            objV1.userData.rotClockwise = true;
            break;    
        case 69: // e
            objV1.userData.rotAntiClockwise = true;
            break;

        case 65: // a
            objV2.userData.rotClockwise = true;
            break;
        case 68: // d
            objV2.userData.rotAntiClockwise = true;
            break;

        case 90: // z
            objV3.userData.rotClockwise = true;
            break;
        case 67: // c
            objV3.userData.rotAntiClockwise = true;
            break; 
            
        case 37: // left
            objV1.userData.movingL = true;
            break;
        case 38: // up
            objV1.userData.movingU = true;
            break;
        case 39: // right
            objV1.userData.movingR = true;
            break;
        case 40: // down
            objV1.userData.movingD = true;
            break
    }
}


/* Define o que acontece quando se deixa de pressionar certas teclas */
function onKeyUp(value) {
    'use strict';

    switch(value.keyCode) {
        case 81: // q
            objV1.userData.rotClockwise = false;
            break;    
        case 69: // e
            objV1.userData.rotAntiClockwise = false; 
            break;

        case 65: // a
            objV2.userData.rotClockwise = false;
            break;
        case 68: // d
            objV2.userData.rotAntiClockwise = false;   
            break;

        case 90: // z
            objV3.userData.rotClockwise = false;
            break;
        case 67: // c
            objV3.userData.rotAntiClockwise = false;
            break; 
            
        case 37: // left
            objV1.userData.movingL = false;
            break;
        case 38: // up
            objV1.userData.movingU = false;
            break;
        case 39: // right
            objV1.userData.movingR = false;
            break;
        case 40: // down
            objV1.userData.movingD = false;
            break;     
    }
}


function render() {
    'use strict';

    delta = clock.getDelta();
    
    renderer.render(scene, camera);
}


function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    clock.start();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    if(objV1.userData.rotClockwise){
        objV1.rotation.y += speedRot*delta;
    }
    
    if(objV2.userData.rotClockwise) {
        objV2.rotation.y += speedRot*delta;
    }

    if(objV3.userData.rotClockwise){
        objV3.rotation.y += speedRot*delta;
    }

    if(objV1.userData.rotAntiClockwise) {
        objV1.rotation.y -= speedRot*delta;
    }

    if(objV2.userData.rotAntiClockwise) {
        objV2.rotation.y -= speedRot*delta;
    }

    if(objV3.userData.rotAntiClockwise){
        objV3.rotation.y -= speedRot*delta;
    }
    
    if(objV1.userData.movingL) {
        objV1.position.x -= speedTrans*delta;
    }

    if(objV1.userData.movingR) {
        objV1.position.x += speedTrans*delta;
    }

    if(objV1.userData.movingU) {
        objV1.position.z -= speedTrans*delta;
    }

    if(objV1.userData.movingD) {
        objV1.position.z += speedTrans*delta;
    }

    render();
    requestAnimationFrame(animate);
}
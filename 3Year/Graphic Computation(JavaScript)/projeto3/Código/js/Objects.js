'use strict';

const ROTATE_SPEED = 1.5

class Objects {
    constructor(x, y, z, scene) {

        this.floor = new THREE.Object3D();
        this.support = new THREE.Object3D();
        this.support.userData = {
            rotate: 0,
        }

        this.car = new Car (scene);
        
        // Floor
        this.materialPrevFloor = 1;
        this.materialTypeFloor = 0;
        this.materialsFloor = [ { body: new THREE.MeshBasicMaterial({color: 0x0000e5 })},
            { body: new THREE.MeshLambertMaterial({color: 0x0000e5})},
            { body: new THREE.MeshPhongMaterial({color: 0x0000e5, specular:0x111111, shininess: 30 })} ];
        this.materialsFloor[2].needsUpdate = true;

        this.addFloor( 0, -1, 0);
        this.floor.position.set(x, y, z);
        scene.add(this.floor);

        // Support

        this.materialPrevSupport = 1;
        this.materialTypeSupport = 0;
        this.materialsSupport = [   { body: new THREE.MeshBasicMaterial({color: 0xdaa520 })},
            { body: new THREE.MeshLambertMaterial({color: 0xdaa520})},
            { body: new THREE.MeshPhongMaterial({color: 0xdaa520, specular:0x111111, shininess: 30 })}  ];
        this.materialsFloor[2].needsUpdate = true;

        this.addSupport( 0, 5, 0,);
        this.support.position.set(x, y, z);
        scene.add(this.support);

        this.addCar(0,0,0);

        // Lamps
        this.lamp1 = new THREE.Object3D();
        this.lamp2 = new THREE.Object3D();
        this.lamp3 = new THREE.Object3D();

        this.materialLampSupport = new THREE.MeshBasicMaterial({color: 0x6500ff});
        this.materialLamp = new THREE.MeshBasicMaterial({color: 0xffffff });

        this.addLamp(this.lamp1);
        this.lamp1.rotation.x= Math.PI/6;
        this.lamp1.position.set(0,120,150);
        scene.add(this.lamp1);

        this.addLamp(this.lamp2);
        this.lamp2.rotation.x= -Math.PI/6;
        this.lamp2.rotation.y= Math.PI/6;
        this.lamp2.rotation.z= Math.PI/8;
        this.lamp2.position.set(-150, 120, -150);
        scene.add(this.lamp2);

        this.addLamp(this.lamp3);
        this.lamp3.rotation.x= -Math.PI/6;
        this.lamp3.rotation.y= -Math.PI/6;
        this.lamp3.rotation.z= -Math.PI/6;
        this.lamp3.position.set(150, 120, -150);
        scene.add(this.lamp3);

        this.registerEvents();
    }

    addFloor( x, y, z) {
        let geometry = new THREE.CubeGeometry(300,2,300);
        geometry.normalsNeedUpdate = true;
        let mesh =new THREE.Mesh(geometry,this.materialsFloor[this.materialTypeFloor].body);
        mesh.position.set(x,y,z);

        this.floor.add(mesh);
    }

    addSupport( x, y, z) {
        let geometry = new THREE.CylinderGeometry(80, 80, 10,20);
        geometry.normalsNeedUpdate = true;
        let mesh =new THREE.Mesh(geometry,this.materialsSupport[this.materialTypeSupport].body);
        mesh.position.set(x,y,z);

        this.support.add(mesh);
    }

    addCar( x, y, z){
        this.car.obj.position.set(x,y,z);
    }

    addLamp( obj ){
        let geometry = new THREE.CylinderGeometry(1, 10, 20,40);
        let mesh =new THREE.Mesh(geometry,this.materialLampSupport);
        mesh.position.set( 0  , 10, 0 );  
        obj.add(mesh);


        geometry = new THREE.SphereGeometry(8, 40, 40);
        mesh =new THREE.Mesh(geometry,this.materialLamp);
        mesh.position.set( 0, 0, 0);
        obj.add(mesh);
    }

    getTarget(){
        return this.car;
    }

    changeLightCalculation(){
        let prev = this.car.materialPrev
        this.car.materialPrev = this.car.materialType
        this.car.materialType = prev;

        prev = this.materialPrevFloor
        this.materialPrevFloor = this.materialTypeFloor
        this.materialTypeFloor = prev;

        prev = this.materialPrevSupport
        this.materialPrevSupport = this.materialTypeSupport
        this.materialTypeSupport = prev;
    }

    changeShaddingMaterials(){
        if (this.car.materialType == 0){
            this.car.materialPrev = this.car.materialPrev == 1 ? 2 : 1
        } else {
            this.car.materialType = this.car.materialType == 1 ? 2 : 1
        }

        if (this.materialTypeFloor == 0){
            this.materialPrevFloor = this.materialPrevFloor == 1 ? 2 : 1
        } else {
            this.materialTypeFloor = this.materialTypeFloor == 1 ? 2 : 1
        }

        if (this.materialTypeSupport == 0){
            this.materialPrevSupport = this.materialPrevSupport == 1 ? 2 : 1
        } else {
            this.materialTypeSupport = this.materialTypeSupport == 1 ? 2 : 1
        }
    }


    registerEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 87) {
                // w
                this.changeLightCalculation()
            }
            if (e.keyCode == 69) {
                // e
                this.changeShaddingMaterials();
            }
            if(e.keyCode == 37) { // left arrow
                this.support.userData.rotate = -ROTATE_SPEED
                this.car.rotate = -ROTATE_SPEED
            }
            if(e.keyCode == 39) { // right arrow
                this.support.userData.rotate = ROTATE_SPEED
                this.car.rotate = ROTATE_SPEED
            }
        });

        window.addEventListener("keyup", (e) => {

            if(e.keyCode == 37) { // left arrow
                this.support.userData.rotate = 0
                this.car.rotate = 0
            }
            if(e.keyCode == 39) { // right arrow
                this.support.userData.rotate = 0
                this.car.rotate = 0
            }
        });
    }

    animate(delta){
        this.support.rotation.y += this.car.rotate * delta;
        this.car.obj.rotation.y += this.car.rotate * delta;
   
        this.car.obj.children[0].material = this.car.materials[this.car.materialType].body
        this.car.obj.children[1].material = this.car.materials[this.car.materialType].chassis

        for(let i =2; i<6; i++) {
            this.car.obj.children[i].material = this.car.materials[this.car.materialType].wheels
        }
        this.floor.traverse((child) => {
            child.material = this.materialsFloor[this.materialTypeFloor].body
        })

        this.support.traverse((child) => {
            child.material = this.materialsSupport[this.materialTypeSupport].body
        })
    }
}
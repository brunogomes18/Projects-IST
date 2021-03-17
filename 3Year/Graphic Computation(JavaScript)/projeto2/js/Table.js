"use strict";

class Table {

    constructor(x, y, z, scene) {
        this.obj = new THREE.Object3D();
        this.materialTable = new THREE.MeshBasicMaterial({color: 0x0a6c03, wireframe: false});
        this.materialWall = new THREE.MeshBasicMaterial({color: 0x654321, wireframe: false});
        this.materialHole = new THREE.MeshBasicMaterial({color: 0x333333, wireframe: false});

        this.addTableBase( 50, -1, 30,this.materialTable);

        this.addTableWall( -1, 3, 30, 2, 60, this.materialWall);
        this.addTableWall( 101, 3, 30, 2, 60 , this.materialWall);
        this.addTableWall( 50, 3, -1, 104, 2, this.materialWall);
        this.addTableWall( 50, 3, 61, 104, 2, this.materialWall);

        this.addTableLeg( 20, -2, 15, this.materialTable);
        this.addTableLeg( 80, -2, 15, this.materialTable);
        this.addTableLeg( 20, -2, 45, this.materialTable);
        this.addTableLeg( 80, -2, 45, this.materialTable);

        this.addHole( 3, -1, 3, this.materialHole);
        this.addHole( 50, -1, 3, this.materialHole);
        this.addHole( 97, -1, 3, this.materialHole);
        this.addHole( 3, -1, 57, this.materialHole);
        this.addHole( 50, -1, 57, this.materialHole);
        this.addHole( 97, -1, 57, this.materialHole);


        this.obj.position.set(x, y, z);
        scene.add(this.obj);
        this.registerEvents();
    }

    addTableBase( x, y, z, materialTable) {
        let geometry = new THREE.CubeGeometry(100,2,60);
        let mesh =new THREE.Mesh(geometry,materialTable);
        mesh.position.set(x,y,z);

        this.obj.add(mesh);
    }

    addTableWall(x, y, z, xsize, zsize, materialWall) {
        let geometry = new THREE.CubeGeometry(xsize, 6, zsize);
        let mesh = new THREE.Mesh(geometry, materialWall);

        mesh.position.set(x, y, z);
        this.obj.add(mesh);
    }

    addTableLeg( x, y, z,materialTable) {
        let geometry = new THREE.CubeGeometry(3, 30, 3);
        let mesh = new THREE.Mesh(geometry, materialTable);

        mesh.position.set(x, y - 15, z);
        this.obj.add(mesh);
    }

    addHole( x, y, z, matrialHole){
        let geometry = new THREE.CylinderGeometry(3, 3, 2,40);
        let mesh = new THREE.Mesh(geometry, matrialHole);
        
        mesh.position.set( x, y+0.5, z);
       
        this.obj.add(mesh);
    }

    registerEvents() {
        window.addEventListener("keydown", (e) => {           
            if (e.keyCode == 87) {
                // w
                this.materialTable.wireframe = !this.materialTable.wireframe;
                this.materialHole.wireframe = !this.materialHole.wireframe;
                this.materialWall.wireframe = !this.materialWall.wireframe;
            }
        });
    }
}

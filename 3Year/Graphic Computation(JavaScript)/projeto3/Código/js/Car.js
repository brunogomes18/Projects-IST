'use strict'

var chassisMaterial;
var wheelsMaterial;
class Car {
    constructor (scene) {
        this.obj = new THREE.Object3D();
        this.rotate = 0;
        this.scene = scene;
        
        this.materialPrev = 1;
        this.materialType = 0;
        this.materials = [
            {
                body: new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors}),
                chassis: new THREE.MeshBasicMaterial({color: 0x707070}),
                wheels: new THREE.MeshBasicMaterial({color: 0x202020})
            },
            {
                body: new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors}),
                chassis: new THREE.MeshLambertMaterial({color: 0x707070}),
                wheels: new THREE.MeshLambertMaterial({color: 0x202020 })
            },
            {
                body: new THREE.MeshPhongMaterial({vertexColors: THREE.FaceColors, specular:0x111111, shininess: 30 }),
                chassis: new THREE.MeshPhongMaterial({color: 0x707070, specular:0x111111, shininess: 30 }),
                wheels: new THREE.MeshPhongMaterial({color: 0x202020, specular:0x111111, shininess: 30 })
            },

        ];
        
        this.materials[2].body.needsUpdate = true;
        this.materials[2].chassis.needsUpdate = true;
        this.materials[2].wheels.needsUpdate = true;

        this.createGeometry()
    }

    createGeometry() {
        let geometry = new THREE.Geometry();

        geometry.vertices = this.createVertices();
        geometry.faces = this.createFaces();

        this.changeColors(geometry, 0, 7, 0x909090);
        
        this.changeColors(geometry, 8, 9, 0xf0f0f0);
       
        this.changeColors(geometry, 10, 11, 0x909090);
        
        this.changeColors(geometry, 12, 13, 0xf0f0f0);
        
        this.changeColors(geometry, 14, 15, 0x404040);
        
        this.changeColors(geometry, 16, 25, 0x909090);
        
        this.changeColors(geometry, 26, 27, 0x404040);
       
        this.changeColors(geometry, 28, 29, 0x909090);
       
        this.changeColors(geometry, 30, 31, 0xe12120);
        
        this.changeColors(geometry, 32, 35, 0x404040);
        
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        let mesh = new THREE.Mesh(geometry, this.materials[this.materialType].body);
        this.obj.add(mesh);
        
        this.addChassis();
        this.addWheel(-42,23,-30.1);
        this.addWheel(48,23,-30.1);
        this.addWheel(-42,23,30.1);
        this.addWheel(48,23,30.1);

        this.scene.add(this.obj)
    }
    

    createVertices() {
        let vertices = [];
        vertices.push(new THREE.Vector3(-77, 35, -25)); //0    Luzes Frente
        vertices.push(new THREE.Vector3(-67, 35, -35)); //1
        vertices.push(new THREE.Vector3(-67, 25, -35)); //2
        vertices.push(new THREE.Vector3(-77, 25, -25)); //3
        vertices.push(new THREE.Vector3(-67, 25, 35)); //4
        vertices.push(new THREE.Vector3(-67, 35, 35)); //5
        vertices.push(new THREE.Vector3(-77, 35, 25)); //6
        vertices.push(new THREE.Vector3(-77, 25, 25)); //7

        vertices.push(new THREE.Vector3(-77, 45, 25)); //8    Capot
        vertices.push(new THREE.Vector3(-67, 48, 35)); //9
        vertices.push(new THREE.Vector3(-67, 48, -35)); //10
        vertices.push(new THREE.Vector3(-77, 45, -25)); //11

        vertices.push(new THREE.Vector3(-47, 50, -35)); //12     Capot-cima
        vertices.push(new THREE.Vector3(-47, 50, 35)); //13
        vertices.push(new THREE.Vector3(3, 70, 28)); //14
        vertices.push(new THREE.Vector3(3, 70, -28)); //15

        vertices.push(new THREE.Vector3(-47, 55, -25)); //16    Vidro Frente
        vertices.push(new THREE.Vector3(-47, 55, 25)); //17
        vertices.push(new THREE.Vector3(-7, 67, 20)); //18
        vertices.push(new THREE.Vector3(-7, 67, -20)); //19

        vertices.push(new THREE.Vector3(76, 55, 35)); //20    Lado Trás
        vertices.push(new THREE.Vector3(76, 55, -35)); //21
        vertices.push(new THREE.Vector3(73, 30, -35)); //22
        vertices.push(new THREE.Vector3(73, 30, 35)); //23

        vertices.push(new THREE.Vector3(23, 66, -25)); //24    Vidro Trás
        vertices.push(new THREE.Vector3(23, 66, 25)); //25
        vertices.push(new THREE.Vector3(63, 58, 28)); //26
        vertices.push(new THREE.Vector3(63, 58, -28)); //27

        vertices.push(new THREE.Vector3(77, 55, 35)); //28    Luzes Trás
        vertices.push(new THREE.Vector3(77, 55, -35)); //29
        vertices.push(new THREE.Vector3(76.5, 52, -30)); //30
        vertices.push(new THREE.Vector3(76.5, 52, 30)); //31

        vertices.push(new THREE.Vector3(36, 60, 35.3)); //32    Vidro Esquerdo
        vertices.push(new THREE.Vector3(-52, 48, 35.3)); //9  33
        vertices.push(new THREE.Vector3(36, 55, 35.3)); //20  34
        vertices.push(new THREE.Vector3(3, 66, 29.5)); //14   35

        vertices.push(new THREE.Vector3(36, 60, -35.3)); //36    Vidro Direito
        vertices.push(new THREE.Vector3(-52, 48, -35.3)); //10   37
        vertices.push(new THREE.Vector3(3, 66, -29.5)); //15    38
        vertices.push(new THREE.Vector3(36, 55, -35.3)); //21   39*

        return vertices;
    }
    
    createFaces() {
        let faces = [];

        faces.push(new THREE.Face3(0, 1, 2)); // 0  Luz Frente Direita
        faces.push(new THREE.Face3(3, 0, 2)); // 1

        faces.push(new THREE.Face3(4, 5, 6)); // 2  Luz Frente Esquerda
        faces.push(new THREE.Face3(7, 4, 6)); // 3

        faces.push(new THREE.Face3(7, 6, 0)); // 4  Unir Luzes Frente
        faces.push(new THREE.Face3(3, 7, 0)); // 5

        faces.push(new THREE.Face3(8, 9, 10)); // 6  Capot
        faces.push(new THREE.Face3(11, 8, 10)); // 7

        faces.push(new THREE.Face3(1, 0, 11)); // 8 Unir Capot Luzes
        faces.push(new THREE.Face3(10, 1, 11)); // 9
        faces.push(new THREE.Face3(0, 7, 8)); // 10
        faces.push(new THREE.Face3(11, 0, 8)); // 11
        faces.push(new THREE.Face3(6, 5, 9)); // 12
        faces.push(new THREE.Face3(8, 6, 9)); // 13

        faces.push(new THREE.Face3(16, 17, 18)); // 14  Vidro Frente
        faces.push(new THREE.Face3(19, 16, 18)); // 15

        faces.push(new THREE.Face3(10, 9, 14)); // 16  Capot2 Unir Cima
        faces.push(new THREE.Face3(15, 10, 14)); // 17

        faces.push(new THREE.Face3(4, 23, 20)); // 18  Lado Esquerdo
        faces.push(new THREE.Face3(9, 4, 20)); // 19

        faces.push(new THREE.Face3(2, 10, 21)); // 20  Lado Direito
        faces.push(new THREE.Face3(22, 2, 21)); // 21

        faces.push(new THREE.Face3(23, 22, 21)); // 22  Trás
        faces.push(new THREE.Face3(20, 23, 21)); // 23

        faces.push(new THREE.Face3(20, 21, 15)); // 24  Cima - Trás
        faces.push(new THREE.Face3(14, 20, 15)); // 25

        faces.push(new THREE.Face3(24, 25, 26)); // 26  Vidro Trás
        faces.push(new THREE.Face3(27, 24, 26)); // 27

        faces.push(new THREE.Face3(9, 20, 14)); // 28  Pre-Janelas Esquerdo
        faces.push(new THREE.Face3(10, 15, 21)); // 29  "     "    Direito


        faces.push(new THREE.Face3(29, 28, 31)); // 30  Luzes Trás
        faces.push(new THREE.Face3(30, 29, 31)); // 31


        faces.push(new THREE.Face3(34, 32, 35)); // 32  Janela Left
        faces.push(new THREE.Face3(33, 34, 35)); // 33

        faces.push(new THREE.Face3(36, 39, 37)); // 34  Janela Right
        faces.push(new THREE.Face3(38, 36, 37)); // 35
        return faces;
    }

    changeColors(geometry, i, j, color) {
        for (i; i<=j; i++) {
            geometry.faces[i].color.setHex(color);
        }
    }

    addChassis() {
        chassisMaterial = this.materials[this.materialType].chassis
        let geom = new THREE.CubeGeometry(140, 5, 70.1);
        let mesh = new THREE.Mesh(geom, chassisMaterial);

        mesh.position.set(3, 27.5, 0);
        this.obj.add(mesh);
    }

    addWheel(x, y, z) {
        wheelsMaterial = this.materials[this.materialType].wheels
        let geom = new THREE.CylinderGeometry(13, 13, 10, 20);
        let mesh = new THREE.Mesh(geom, wheelsMaterial);
        mesh.rotation.x += Math.PI / 2;

        mesh.position.set(x, y, z);
        this.obj.add(mesh);
    }
}
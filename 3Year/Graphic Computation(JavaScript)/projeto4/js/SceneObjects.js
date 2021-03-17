'use strict'

const ROTATE_SPEED = 1

class SceneObjects{
    constructor(x,y,z,scene){
        
        this.reset = false;
        this.paused = false;
        this.materialType = 1;

        // SkyBox
        this.addSkyBox();

        // Grass
        this.floor = new THREE.Object3D();
        this.floorMaterials = [ new THREE.MeshBasicMaterial({color: 0x00ff00 , wireframe: false}),
                                new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false, shininess: 15 }) ];

        this.addFloor();
        this.floor.position.set(x, y, z);
        scene.add(this.floor);

        // Golf Ball
        this.ball = new THREE.Object3D();

        this.ball.userData = {
            moving: false,
            step: 0,
        }

        this.ballMaterials = [ new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false }),
                            new THREE.MeshPhongMaterial({color: 0xffffff, specular:0xffffff,  wireframe: false, shininess: 300 }) ];

        this.addBall();
        this.ball.position.set(x, y+3.1, z);
        scene.add(this.ball);


        // Golf Flag

        this.golfFlag = new THREE.Object3D();
        
        this.golfFlag.userData = {
            rotate: ROTATE_SPEED,
        }

        this.supportMaterials = [ new THREE.MeshBasicMaterial({color: 0x00ffaa , wireframe: false}),
                            new THREE.MeshPhongMaterial({color: 0x00ffaa, wireframe: false, shininess: 15 }) ];

        this.flagMaterials = [ new THREE.MeshBasicMaterial({color: 0xff0000 , wireframe: false}),
                            new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: false, shininess: 15 }) ];

        this.addFlag();
        this.golfFlag.position.set(x+30,y,z);
        scene.add(this.golfFlag);

        this.registerEvents();

    }

    addSkyBox(){
        let textureCube = new THREE.CubeTextureLoader().load([
            'js/cubemap/pz.png',// done
            'js/cubemap/py.png',

            'js/cubemap/ny.png', // cima

            'js/cubemap/nz.png', // baixo

            'js/cubemap/nx.png',

            'js/cubemap/px.png', // done
        ]);
        scene.background = textureCube;
    }

    addFloor() {
        let geometry = new THREE.BoxGeometry(80,0.1,80,50,2,50);

        let texture = new THREE.TextureLoader().load("js/cubemap/grass.png" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 8, 8 );

        let bmap = new THREE.TextureLoader().load("js/cubemap/grass1-bump.jpg" );
        bmap.wrapS = THREE.RepeatWrapping;
        bmap.wrapT = THREE.RepeatWrapping;
        bmap.repeat.set( 4, 4 );
        

        // Basic Material
        this.floorMaterials[0].map= texture;
        
        // Phong
        this.floorMaterials[1].map= texture;
        this.floorMaterials[1].bumpMap= bmap;
        this.floorMaterials[1].bumpScale= 0.4;
        
        
        let mesh =new THREE.Mesh(geometry,this.floorMaterials[1]);
        mesh.position.set(0,0,0);
        this.floor.add(mesh);
    }

    addBall(){
        let geometry = new THREE.SphereGeometry( 3, 20, 20 );

        let texture = new THREE.TextureLoader().load("js/cubemap/golf.jpg" );
        let bmap =  new THREE.TextureLoader().load("js/cubemap/golf.jpg" );
        
        // Basic
        this.ballMaterials[0].map= texture;

        // Phong 
        this.ballMaterials[1].map= texture;
        this.ballMaterials[1].bumpMap= bmap;
        this.ballMaterials[1].bumpScale= 1;

        let mesh = new THREE.Mesh( geometry, this.ballMaterials[1] );
        mesh.position.set(0,0,0);
        this.ball.add(mesh);

    }

    addFlag(){
        let geometry = new THREE.CylinderGeometry(1,1,20,5);

        let mesh = new THREE.Mesh( geometry, this.supportMaterials[1] );
        mesh.position.set(0,10,0);
        this.golfFlag.add(mesh);

        geometry = new THREE.CubeGeometry(7,5,2);

        mesh = new THREE.Mesh( geometry, this.flagMaterials[1] );
        mesh.position.set(2,17,0);
        this.golfFlag.add(mesh);

    }

    toggleReset(){
        this.reset = true;
    }

    togglePaused(){
        this.paused = !this.paused;
    }

    registerEvents(){
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 66) {
                // b
                if(!this.paused){
                    this.ball.userData.moving = !this.ball.userData.moving
                }
            }

            if (e.keyCode == 87){
                // w
                if(!this.paused){
                    for (let i = 0 ; i < 2 ; i++){
                        this.ballMaterials[i].wireframe = !this.ballMaterials[i].wireframe
                        this.floorMaterials[i].wireframe = !this.floorMaterials[i].wireframe
                        this.flagMaterials[i].wireframe = !this.flagMaterials[i].wireframe
                        this.supportMaterials[i].wireframe = !this.supportMaterials[i].wireframe
                    }    
                }
            }   
            
            if (e.keyCode == 73){
                // i
                if (!this.paused){
                    this.materialType = this.materialType == 1 ? 0 : 1;
                }
            }
            
        });
    }

    animate(delta){
        this.paused = paused;

        if (this.reset){
            // Reset Ball
            this.ball.userData.moving = false;
            this.ball.userData.step = 0;     
            this.ball.position.set(0,3.1,0); 

            // Reset Flag
            this.golfFlag.rotation.y = 0;

            // Reset Wireframe

            for (let i = 0 ; i < 2 ; i++){
                this.ballMaterials[i].wireframe = false;
                this.floorMaterials[i].wireframe = false;
                this.flagMaterials[i].wireframe = false;
                this.supportMaterials[i].wireframe = false;
            } 

            // Reset Light Calculation
            this.materialType = 1;

            this.reset = false;
            this.paused = false;
        }
        
        if(!this.paused) {
            this.golfFlag.rotation.y += this.golfFlag.userData.rotate * delta;

            // Change Ligh Calculation ("I")
            this.floor.children[0].material = this.floorMaterials[this.materialType];
            this.ball.children[0].material = this.ballMaterials[this.materialType];
            this.golfFlag.children[0].material = this.supportMaterials[this.materialType];
            this.golfFlag.children[1].material = this.flagMaterials[this.materialType];
        }
        
        if ( !this.paused && this.ball.userData.moving){
            this.ball.userData.step += 1 * delta;
            this.ball.position.x = 13 + -13* (Math.cos(this.ball.userData.step));
            this.ball.position.y= 3 + Math.abs(10*(Math.sin(this.ball.userData.step)));
        }

    }

}
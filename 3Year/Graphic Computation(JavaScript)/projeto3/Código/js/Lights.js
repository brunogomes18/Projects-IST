'use strict';

class Lights {

    constructor(scene, objects) {
        this.scene = scene;
        this.lightTarget = objects.getTarget();

        // Directional light
        // DirectionalLight( color : Integer, intensity : Float )
        this.dlight = new THREE.DirectionalLight( 0xffffff, 0.7);
        this.addDirectionalLight(150, 150, 150, this.lightTarget);

        // Spot Lights
        // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )

        this.slight1 = new THREE.SpotLight ( 0xffffff, 0.7, 0,  Math.PI/4);
        this.addSpotLight(0,120,150, this.slight1, this.lightTarget);

        this.slight2 = new THREE.SpotLight ( 0xffffff, 0.7, 0,  Math.PI/4);
        this.addSpotLight(-150, 120, -150, this.slight2, this.lightTarget);

        this.slight3 = new THREE.SpotLight ( 0xffffff, 0.7, 0,  Math.PI/4);
        this.addSpotLight(150, 120, -150, this.slight3, this.lightTarget);

        this.registerEvents();
    }

    addDirectionalLight(x, y, z, car){
        
        this.dlight.position.set( x, y, z );

        this.dlight.target.position.x = car.obj.position.x
        this.dlight.target.position.y = car.obj.position.y
        this.dlight.target.position.z = car.obj.position.z
        this.dlight.target.updateMatrixWorld();

        this.scene.add(this.dlight)

    }

    addSpotLight( x, y, z, slight, car){
        
        slight.position.set( x, y, z );

        slight.target.position.x = car.obj.position.x
        slight.target.position.y = car.obj.position.y
        slight.target.position.z = car.obj.position.z
        slight.target.updateMatrixWorld();

        this.scene.add(slight);
    }

    registerEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 81) {
                // q
                this.dlight.visible = !this.dlight.visible
            }
            if (e.keyCode == 49) {
                // 1
                this.slight1.visible = !this.slight1.visible
            }
            if (e.keyCode == 50) {
                // 2
                this.slight2.visible = !this.slight2.visible
            }
            if (e.keyCode == 51) {
                // 3
                this.slight3.visible = !this.slight3.visible
            }
        });
    }
}
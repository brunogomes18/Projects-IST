'use strict';

class Lights {

    constructor(scene) {
        this.scene = scene;
        this.reset = false;
        this.paused = false;

        // Directional light
        // DirectionalLight( color : Integer, intensity : Float )
        this.dlight = new THREE.DirectionalLight( 0xffffff, 0.7);
        this.addDirectionalLight(150, 150, 150);

        // Spot Lights
        // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )

        this.slight1 = new THREE.SpotLight ( 0xffffff, 0.5, 0,  Math.PI/4);
        this.addSpotLight(5,20,40, this.slight1);

        // Helper SpotLight
        
        /*const spotLightHelper = new THREE.SpotLightHelper( this.slight1  );
        scene.add( spotLightHelper ); */

        this.registerEvents();
    }

    addDirectionalLight(x, y, z){
        
        this.dlight.position.set( x, y, z );

        this.scene.add(this.dlight)

    }

    addSpotLight( x, y, z, slight){
        
        slight.position.set( x, y, z );

        this.scene.add(slight);
    }

    toggleReset(){
        this.reset = true;
    }

    togglePaused(){
        this.paused = !this.paused;
    }

    registerEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 81) {
                // q
                if(!this.paused){
                    this.dlight.visible = !this.dlight.visible
                }
            }
            if (e.keyCode == 80) {
                // p
                if (!this.paused){
                    this.slight1.visible = !this.slight1.visible
                }
            }
        });
    }

    animate(){
        if (this.reset){
            this.dlight.visible = true;
            this.slight1.visible = true;
            this.reset = false;
            this.paused = false ;
        }

    }
}
"use strict";

const ROTATE_SPEED = 1.5
const DEGREAS_90 = Math.PI/2

class CueManager {
    constructor(scene, ballManager) {
		this.scene = scene;
		this.obj = new THREE.Object3D();
        this.ballManager = ballManager;
		this.cues = [];
        this.selectedCue = 0;
        this.notSelectedCue = 0;

		this.pressLeft = false;
        this.pressRight = false;
        this.shotBall = false;
        
        // x,y,z,rotate, x_mesh, y_mesh, z_mesh
        this.addCue(3, 5, 30, + 2* DEGREAS_90, ballManager, -28, 0, 0);
		this.addCue(30, 5, 57, -DEGREAS_90, ballManager, 0, 0, 28); 
		this.addCue(70, 5, 57, -DEGREAS_90, ballManager, 0, 0, 28);
        this.addCue(97, 5, 30, +0, ballManager, 28, 0, 0);
        this.addCue(70, 5, 3, +DEGREAS_90, ballManager, 0, 0, -28);
        this.addCue(30, 5, 3, +DEGREAS_90, ballManager, 0, 0, -28);
        
        this.addToScene(this.scene)

		this.events()
    }

    addCue(x,y,z,rotate,ballManager, x_mesh, y_mesh, z_mesh){
        let cue = new Cue(x, y, z, rotate, ballManager, x_mesh, y_mesh, z_mesh);

        this.cues.push(cue);
        this.obj.add(cue.obj);

    }

    addToScene(scene) {      
        this.cues.forEach( cue => {
            cue.addToScene(scene);     
        });
    }
    
    events() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 52) { // 4
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 0
                this.cues[this.selectedCue].selectCue();
            } 
            if (e.keyCode == 53) { // 5
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 1
                this.cues[this.selectedCue].selectCue();
            } 
            if (e.keyCode == 54) { // 6
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 2
                this.cues[this.selectedCue].selectCue();
            }
            if (e.keyCode == 55) { // 7
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 3
                this.cues[this.selectedCue].selectCue();
            }
             if (e.keyCode == 56) { // 8
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 4
                this.cues[this.selectedCue].selectCue();
            }
            if (e.keyCode == 57) { // 9
                this.notSelectedCue = this.selectedCue;
                this.cues[this.notSelectedCue].dontSelectCue();

                this.selectedCue = 5
                this.cues[this.selectedCue].selectCue();
            } 

            if(e.keyCode == 37) { // left arrow
                if(this.selectedCue == 4 || this.selectedCue == 5 ){
                    this.cues[this.selectedCue].obj.userData.rotate = ROTATE_SPEED;
                } else{
                    this.cues[this.selectedCue].obj.userData.rotate = -ROTATE_SPEED;
                }
                
				this.pressLeft = true;
			}

			if(e.keyCode == 39) { // right arrow
				if(this.selectedCue == 4 || this.selectedCue == 5 ){
                    this.cues[this.selectedCue].obj.userData.rotate = -ROTATE_SPEED;
                } else{
                    this.cues[this.selectedCue].obj.userData.rotate = +ROTATE_SPEED;
                }
				this.pressRight = true;
                
            }
            
            if (e.keyCode == 32) { // space
                if (!this.cues[this.selectedCue].obj.userData.fired) {
                    let angle = 0;
                    if (this.selectedCue == 0) {
                        angle = this.cues[this.selectedCue].getCueAngle();

                    } else if (this.selectedCue == 1 || this.selectedCue == 2) {
                        angle = this.cues[this.selectedCue].getCueAngle() + Math.PI / 2;
                        
                    } else if (this.selectedCue == 3) {
                        angle = this.cues[this.selectedCue].getCueAngle() + Math.PI;
                        
                    } else if (this.selectedCue == 4 || this.selectedCue == 5) {
                        angle = this.cues[this.selectedCue].getCueAngle() - Math.PI / 2;
                    }
                    this.ballManager.strike(this.selectedCue, 50, angle);
                    this.cues[this.selectedCue].obj.userData.fired = true;
                }
            }
            if (e.keyCode == 87) { // w
                this.toggleWireframe();
            }
        });

        window.addEventListener("keyup", (e) => {
            if(e.keyCode == 37) { // left arrow
				this.cues[this.selectedCue].obj.userData.rotate = 0;
				this.pressLeft = false;
			}

			if(e.keyCode == 39) { // right arrow
				this.cues[this.selectedCue].obj.userData.rotate = 0;
				this.pressRight = false;
                
            }

            if (e.keyCode == 32) {
                // space
                this.shotBall = false;
            }
        });
    }

    animate(deltaTime){
        this.cues[this.notSelectedCue].animate(deltaTime);
        this.cues[this.selectedCue].animate(deltaTime);
    }

    toggleWireframe(){
        this.cues.forEach(cue => {
            cue.toggleWireframe();
        });
    }
}

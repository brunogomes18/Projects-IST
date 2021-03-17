"use strict";

class Cue {

    constructor(x, y, z, rotate, ballManager, x_mesh, y_mesh, z_mesh) {
        this.ballManager = ballManager;
        
        this.obj = new THREE.Object3D();
        this.materialCue = new THREE.MeshBasicMaterial({color: 0x964B00, wireframe: false});
        
        this.obj.userData = {
            rotate: 0,
            selected: false,
            fired: false
        }

        this.addCue( rotate, x_mesh, y_mesh, z_mesh);

  
        this.obj.position.set(x, y, z);
       
    
    }

    addCue( rotate, x_mesh, y_mesh, z_mesh) {
        let geometry = new THREE.CylinderGeometry(1, 2, 40,40); 
        let mesh = new THREE.Mesh(geometry, this.materialCue);  
        
        mesh.rotation.z += Math.PI / 2;
        mesh.rotation.y += rotate;
        mesh.position.set(x_mesh, y_mesh, z_mesh );
       
        this.obj.add(mesh);

    }

    addToScene(scene) {
        scene.add(this.obj)
    }

    selectCue(){
        this.obj.userData.selected = true;
    }

    dontSelectCue(){
        this.obj.userData.selected = false;
    }

    rotateCue(rotate_speed){
        if( this.obj.rotation.y + rotate_speed > Math.PI / 4  || this.obj.rotation.y + rotate_speed < -Math.PI / 4)
            return
        
        this.obj.rotation.y += rotate_speed;
    }

    
    getCueAngle() {
        return this.obj.rotation.y;
    }
    
    toggleWireframe(){
        this.materialCue.wireframe = !this.materialCue.wireframe;
    }

    animate(deltaTime){
        if (this.obj.userData.selected == true){
            this.materialCue.color.setHex(0xff0000);
            this.rotateCue(this.obj.userData.rotate * deltaTime);
        } else{
            this.materialCue.color.setHex(0x964B00);
        }
        
    }
}

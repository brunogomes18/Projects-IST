'use strict'

const FRICTION = 0.9995
 
class Ball {
    constructor(x, y, z, initialSpeedX, initialSpeedZ, collision, moving) {
        this.obj = new THREE.Object3D();
        this.positionX = x
        this.positionZ = z
        this.positionY = y

        this.axesHelper = new THREE.AxesHelper(15);
        this.axesHelper.visible = false;
        this.obj.add(this.axesHelper);

        this.obj.userData = {
            radius : 2.4,
            speedX : initialSpeedX, 
            speedY : 0, 
            speedZ : initialSpeedZ, 
            collision : collision,
            moving : moving,
            falling : false
        }

        this.material = new THREE.MeshBasicMaterial({color: 0xe12120, wireframe: false});
        this.materialCueBalls = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});
        this.addBall()


        this.obj.position.set(x, y, z);
    }

    addBall(){
        this.geometry = new THREE.SphereGeometry(this.obj.userData.radius, 10, 10);
        if(this.obj.userData.collision){
            this.ball = new THREE.Mesh(this.geometry, this.material);
        } else{
            this.ball = new THREE.Mesh(this.geometry, this.materialCueBalls);
        }
        this.obj.add(this.ball);
    }

    rotateBall(delta) {
        let ballSpeed = new THREE.Vector3(this.obj.userData.speedX * delta, 0, this.obj.userData.speedZ * delta);
        let axisVector = new THREE.Vector3();
        let ballSpeedDist = ballSpeed.length();
        let rotationAmount = ballSpeedDist * ((Math.PI * 2) / (Math.PI * 2 * this.obj.userData.radius));
        axisVector.set(0,1,0).cross(ballSpeed).normalize();
        this.ball.rotateOnWorldAxis(axisVector, rotationAmount);
    }

    getDistance(x1, z1, x2, z2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));
    }

  
    computePosition(delta) {
        return new THREE.Vector3(this.obj.position.x + this.obj.userData.speedX * delta,
                                 this.obj.position.y, 
                                 this.obj.position.z + this.obj.userData.speedZ * delta); 
    }

    checkLimits(delta) {
        let tentativePos = this.computePosition(delta);
        
        this.checkHoleLimits(tentativePos);
        this.checkWallLimits(tentativePos);
    }

  
    checkHoleLimits(tentativePos) {
        if (this.getDistance(tentativePos.x, tentativePos.z, 3, 3) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;

        } else if (this.getDistance(tentativePos.x, tentativePos.z, 50, 3) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;

        } else if (this.getDistance(tentativePos.x, tentativePos.z, 97, 3) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;

        } else if (this.getDistance(tentativePos.x, tentativePos.z, 3 ,57) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;

        } else if (this.getDistance(tentativePos.x, tentativePos.z, 50, 57) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;

        } else if (this.getDistance(tentativePos.x, tentativePos.z, 97, 57) < this.obj.userData.radius && !this.obj.userData.falling) {
            this.obj.userData.speedY = -4;
            this.obj.userData.speedX = 0;
            this.obj.userData.speedZ = 0;
            this.obj.userData.falling = true;
        }
    }

    checkWallLimits(tentativePos) {
        if (tentativePos.x - this.obj.userData.radius <= 0 || tentativePos.x + this.obj.userData.radius >= 100) {
            this.obj.userData.speedX = this.obj.userData.speedX * -1 * 0.5;
        } else if (tentativePos.z - this.obj.userData.radius <= 0 || tentativePos.z + this.obj.userData.radius >= 60) {
            this.obj.userData.speedZ = this.obj.userData.speedZ * -1 * 0.5;
        }
    }
    

    

    // função para dar a tacada na bola -> usar o angle somehow
    strike(speed, angle) {
        this.obj.userData.speedX = speed * Math.cos(angle);
        this.obj.userData.speedZ = speed * -Math.sin(angle);        
        this.obj.userData.moving = true;
        
    }

    
    addToScene(scene) {
        scene.add(this.obj);
    }
    
    removeFromScene(scene) {
        scene.remove(this.obj);
    }
    
    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
        this.materialCueBalls.wireframe = !this.materialCueBalls.wireframe;
    }

    
    
    toggleAxesHelper() {
        this.axesHelper.visible = !this.axesHelper.visible;
    }

    animate(delta) {
        if (this.obj.userData.moving == true) {
            this.checkLimits(delta);
            this.rotateBall(delta);
            this.obj.position.x += (this.obj.userData.speedX) * delta;
            this.obj.position.y += (this.obj.userData.speedY) * delta;
            this.obj.position.z += (this.obj.userData.speedZ) * delta;
            this.obj.userData.speedX = this.obj.userData.speedX * FRICTION;
            this.obj.userData.speedZ = this.obj.userData.speedZ * FRICTION;
        }
    }
}
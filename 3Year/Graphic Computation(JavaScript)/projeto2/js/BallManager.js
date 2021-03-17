'use strict'
 
class BallManager {

    constructor(scene, quantity) {
        this.scene = scene;
        this.obj = new THREE.Object3D();
        this.quantity = quantity;

        this.balls = [];
        this.cueBalls = [];
        this.lastStrikedBall = -1;
        for (let i = 0; i < quantity; i++) {
            this.addBall();
        }
        this.addCueBalls();
        this.registerEvents();
    }

    registerEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 65) {
                // a
                this.toggleAxesHelper();
            }
            if (e.keyCode == 87) {
                // w
                this.toggleWireframe();
            }
        });
    }
    
    // Adicionar as 6 bolas
    addCueBalls() {
        let ball = new Ball(3, 2.4, 30, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        ball = new Ball(30, 2.4, 57, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        ball = new Ball(70, 2.4, 57, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        ball = new Ball(97, 2.4, 30, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        ball = new Ball(70, 2.4, 3, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        ball = new Ball(30, 2.4, 3, 0, 0, false, false);
        this.cueBalls.push(ball);
        
        for (let i = 0; i < 6; i++) {
            this.obj.add(this.cueBalls[i].obj);
            this.cueBalls[i].addToScene(this.scene)
        }
    }
    strike (b, speed, angle) {
        this.cueBalls[b].strike(speed, angle);
        this.lastStrikedBall = this.cueBalls[b];
    }
    
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    generateCoordinates() {
        let pos = new THREE.Vector3();
        pos.x = this.randomFloat(2, 98 );
        pos.y = 2.4; // raio da bola
        pos.z = this.randomFloat(2, 58);
        return pos;
    }
    
    generateSpeed() {
        let speed = new THREE.Vector3();
        speed.x = this.randomFloat(-5, 5) * 10;
        speed.z = this.randomFloat(-5, 5) * 10;
        speed.y = 0;
        return speed;
    }
    
    addBall() {
        let speed = this.generateSpeed();
        let pos = this.generateCoordinates();
        
        for (let i=0; i < this.balls.length; i++){
            
            let b1 = this.balls[i]
            let d = b1.getDistance(b1.obj.position.x, b1.obj.position.z, pos.x, pos.z)
            
            if( b1.obj.userData.radius*2 > d){ // colidem
                pos = this.generateCoordinates();
                i = -1;
                continue;
            } 
            
        }
        let ball = new Ball(pos.x, pos.y, pos.z, speed.x, speed.z, true, true);
        this.balls.push(ball);
        this.obj.add(ball.obj);
        ball.addToScene(this.scene);
    }
    
    removeBall(pos) {
        let ball = this.balls[pos];
        ball.removeFromScene(this.scene)
    
    }
    
    removeCueBall(pos) {
        let cueBall = this.cueBalls[pos];
        cueBall.removeFromScene(this.scene)
        
    }
    
    toggleAxesHelper() {
        this.balls.forEach(ball => {
            ball.toggleAxesHelper();
        });
        this.cueBalls.forEach(ball => {
            ball.toggleAxesHelper();
        });
    }
    
    toggleWireframe() {
        this.balls.forEach(ball => {
            ball.toggleWireframe();
        });
        this.cueBalls.forEach(ball => {
            ball.toggleWireframe();
        });
    }
    
    animate(delta) {
        let allBalls = this.balls.concat(this.cueBalls);
        
        for ( let i = 0; i < allBalls.length; i++) {
            let b1 = allBalls[i];
            
            for (let j = i+1; j < allBalls.length; j++) {
                
                let b2 = allBalls[j];
                
                // tentative position
                let pos1 = b1.computePosition(delta);
                let pos2 = b2.computePosition(delta);
                
                // Ver se tentative position colide
                let d = b1.getDistance(pos1.x, pos1.z, pos2.x, pos2.z)
                
                let xDist = b2.obj.position.x - b1.obj.position.x
                let zDist = b2.obj.position.z - b1.obj.position.z
                
                if (b1.obj.userData.radius + b1.obj.userData.radius >= d){
                    // Nao colidir com as bolas dos tacos e com bolas a cair
                    if( b1.obj.userData.moving == true && b2.obj.userData.moving == true && b1.obj.userData.falling == false && b2.obj.userData.falling == false){

                        // Calculamos o angulo de colisao entre as duas bolas
                        let angle = -Math.atan2(zDist, xDist);

                        // Colocamos os vetores da velocidade x e y no eixo X
                        let u1 = this.rotateByAngle(new THREE.Vector2(b1.obj.userData.speedX, b1.obj.userData.speedZ), angle)
                        let u2 = this.rotateByAngle(new THREE.Vector2(b2.obj.userData.speedX, b2.obj.userData.speedZ), angle)
                            
                        // Trocar movimentos das bolas
                        let x = u1.x
                        u1.x = u2.x
                        u2.x = x
                            
                        // Colocar os vetores de volta no X e Y
                        u1 = this.rotateByAngle(u1, -angle)
                        u2 = this.rotateByAngle(u2, -angle)
                            
                            
                        b1.obj.userData.speedX = u1.x
                        b1.obj.userData.speedZ = u1.y
                        b2.obj.userData.speedX = u2.x
                        b2.obj.userData.speedZ = u2.y
                    }
                }
            }
            b1.animate(delta);
            if (b1.obj.position.y < -100) {
                if (this.quantity>i) {
                    this.removeBall(i);
                } else {
                    this.removeCueBall(i - this.quantity);
                }
            }
        }
    }

    rotateByAngle(speed, angle) {
        return new THREE.Vector2(speed.x * Math.cos(angle) - speed.y * Math.sin(angle), 
        speed.x * Math.sin(angle) + speed.y * Math.cos(angle))
    }
}
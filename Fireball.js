Fireball = function(texture){
    texture.repeat.set(4, 4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    var ballMat = new THREE.MeshPhongMaterial({color: 0xFF8300, ambient: 0xFF8300, map: texture});
    var ballGeo = new THREE.SphereGeometry(4, 10, 10);
    var ball = new THREE.Mesh(ballGeo, ballMat);
    var ballGroup = new THREE.Group();
    ballGroup.add(ball);
    return ballGroup;
};

Fireball.prototype = Object.create (THREE.Object3D.prototype);
Fireball.prototype.constructor = Fireball;
